<template>
  <div class="game-container">
    <GameTitle />
    <div v-if="show" class="fog"></div>
    <AlertBoxNoBth v-if="show" :rule="rule" @closeAlertBox="closeAlertBox" />
    <!-- 扑克牌游戏首页 -->
    <div v-if="gameType==='pocker'" class="content">
      <template v-if="page==='first'">
        <div>
          <p>本轮记忆时间：{{returnHourAndMinutes}}</p>
          <p style="margin-top:40rpx">
            <span :class="{radio:true,active:level=='primary'}" @click="selLevel('primary')">初级玩家</span>
            <span :class="{radio:true,active:level=='senior'}" @click="selLevel('senior')">高级玩家</span>
          </p>
        </div>
      </template>
      <template v-else>
        <div>
          <div v-if="currentPage==='flashPocker'">
            <span class="label">请选择闪视时间：</span>
            <div class="btn-group">
              <span v-for="(item,index) in memoryTime" :class="{active:activeTime==item}" @click="activeTime=item" :key="index">{{item}}秒</span>
            </div>
          </div>
          <div>
            <span class="label">请选择显示方式：</span>
            <div class="btn-group">
              <span v-for="(item,index) in pockerNum" :class="{active:activeNum==item}" @click="activeNum=item" :key="index">{{item}}张</span>
              <span v-if="currentPage==='fastPocker'||currentPage==='marathonPocker'" :class="{active:activeNum=='All'}" @click="activeNum='All'">All</span>
            </div>
          </div>
        </div>
      </template>
      <div class="btn submit-btn" v-if="page==='first'" @click="confirm">确定</div>
      <div class="btn submit-btn" v-else @click="startGame">开始游戏</div>
    </div>
    <!-- 其他游戏首页 -->
    <div v-else class="content">
      <div>
        <p>本轮记忆时间：{{returnHourAndMinutes}}</p>
        <p style="margin-top:40rpx">
          <span :class="{radio:true,active:level=='primary'}" @click="selLevel('primary')">初级玩家</span>
          <span :class="{radio:true,active:level=='senior'}" @click="selLevel('senior')">高级玩家</span>
        </p>
      </div>
      <div class="btn submit-btn" @click="startGame">开始作答</div>
    </div>
  </div>
</template>
<script>
import GameTitle from "@/components/gameTitle_new";
import AlertBoxNoBth from "@/components/alertBox_noBtn"
export default {
  components: {
    GameTitle,
    AlertBoxNoBth
  },
  onLoad () {
    this.currentPage = this.$store.state.gamePages[this.$store.state.gameName].path;
    this.rule = this.$store.state.gamePages[this.$store.state.gameName].rule;
    this.show = this.$store.state.isNew;
    this.page = (this.currentPage !== 'flashPocker' ? "first" : "second");
    if (this.currentPage === 'flashPocker' || this.currentPage === 'fastPocker' || this.currentPage === 'marathonPocker') {
      this.gameType = 'pocker';
    } else {
      this.gameType = 'other';
    }
  },
  data () {
    return {
      rule: [],
      show: false,
      memoryTime: [],
      pockerNum: ["1", "2", "4", "8"],
      activeTime: "",
      activeNum: "4",
      currentPage: "",
      page: "first",
      level: "",
      gameType: 'pocker'
    }
  },
  computed: {
    returnHourAndMinutes: function () {
      let hour = Math.floor(this.memoryTime / 3600);
      let minutes = Math.floor((this.memoryTime - hour * 3600) / 60);
      let seconds = (this.memoryTime - hour * 3600 - minutes * 60);
      return (hour !== 0 ? hour + '小时' : '') + (minutes !== 0 ? minutes + '分钟' : '') + (seconds !== 0 ? seconds + '秒' : '')
    }
  },
  mounted () {
    this.level = this.$store.state.level;
    let rule = this.$store.state.rule.rules_of_the_game.filter(e => {
      return e.game_level == this.level
    })[0];
    this.memoryTime = rule.memory_time.split(",").reverse();
    this.activeTime = this.memoryTime[0];
    wx.setNavigationBarTitle({
      title: this.$store.state.gameName
    })
  },
  methods: {
    //关闭弹窗
    closeAlertBox: function () {
      this.show = false;
    },
    //开始游戏
    startGame: function () {
      if (this.currentPage === 'flashPocker') {
        this.$store.commit("setMemoryTime", this.activeTime);
        this.$store.commit("setPockerNumber", this.activeNum);
      } else if (this.currentPage === 'marathonPocker' || this.currentPage === 'fastPocker') {
        this.$store.commit("setPockerNumber", this.activeNum === 'All' ? 52 : this.activeNum);
      }
      //跳转到下一个页面
      wx.reLaunch({
        url: "/pages/" + this.currentPage + "/memary/main"
      })
    },
    //选择等级
    selLevel: function (level) {
      this.level = level;
      this.$store.commit("setLevel", level);
      let rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == level
      })[0];
      this.memoryTime = rule.memory_time;
      this.$store.commit("setMemoryTime", rule.memory_time);
    },
    //点击确定
    confirm: function () {
      this.page = 'second'
    }
  },
}
</script>
<style lang="scss" scoped>
.game-container {
  background: $deep-blue;
  color: white;
  text-align: center;
}

.content {
  margin: tovmin(240) auto auto auto;
  display: flex;
  flex-direction: column;
  width: 76%;
  text-align: center;
  justify-content: center;
}
.content > div > div {
  display: flex;
  justify-content: center;
}
.label {
  height: tovmin(56);
  line-height: tovmin(56);
  font-weight: bold;
  font-size: tovmin(28);
}

.btn-group span {
  margin-right: tovmin(90);
  width: tovmin(100);
  height: tovmin(56);
  display: inline-block;
  font-size: tovmin(26);
}

.btn-group .active {
  border-radius: tovmin(34);
  background: $middle-blue;
  display: inline-block;
  text-align: center;
  line-height: tovmin(56);
}

.submit-btn {
  height: tovmin(98);
  width: tovmin(220);
  border-radius: tovmin(50);
  text-align: center;
  line-height: tovmin(98);
  font-size: 24rpx;
  font-weight:bold;
  position: absolute;
  bottom: tovmin(140);
  left: 50%;
  transform: translateX(-50%);
}
.content p {
  text-align: center;
  line-height: tovmin(30);
  margin-bottom: tovmin(30);
}

.content p:last-child {
  margin-top: tovmin(118);
}

.content p:last-child span:first-child {
  margin-right: tovmin(170);
}

p.active {
  color: $middle-blue;
}
</style>
