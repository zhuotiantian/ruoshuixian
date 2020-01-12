<template>
  <div class="game-container">
    <GameTitle />
    <AlertBoxNoBth :rule="rule" />
    <!-- 扑克牌游戏首页 -->
    <div v-if="gameType==='pocker'" class="content">
      <template v-if="page==='first'">
        <div>
          <div style="margin-bottom:30rpx;font-size:20rpx;font-weight:bold">请选择</div>
          <p style="margin-top:40rpx">
            <span @click="selLevel('primary')">
              <image class="radioBtn" src="/static/images/firstPage/circle_active.png" v-if="level=='primary'"></image>
              <image class="radioBtn" src="/static/images/firstPage/circle.png" v-if="level=='senior'"></image>
              <span :class="{active:level=='primary'}" @click="selLevel('primary')">初级玩家</span>
            </span>
            <span @click="selLevel('senior')">
              <image class="radioBtn" src="/static/images/firstPage/circle_active.png" v-if="level=='senior'"></image>
              <image class="radioBtn" src="/static/images/firstPage/circle.png" v-if="level=='primary'"></image>
              <span :class="{active:level=='senior'}">高级玩家</span>
            </span>
          </p>
        </div>
      </template>
      <template v-else>
        <div style="font-size:24rpx">
          <p v-if="currentPage === 'fastPocker' || currentPage === 'marathonPocker'" style="position:absolute;top:5vmin;left:50%;z-index:9999;font-size:16rpx;transform: translateX(-50%);">本轮记忆时间：{{returnHourAndMinutes}}</p>
          <div style="margin-bottom:30rpx">点击选择</div>
          <div v-if="currentPage==='flashPocker'" style="margin-bottom:15rpx">
            <span class="label">闪视时间：</span>
            <div class="btn-group">
              <span v-for="(item,index) in memoryTime" :class="{active:activeTime==item}" @click="activeTime=item" :key="index">{{item}}秒</span>
            </div>
          </div>
          <div>
            <span class="label">显示张数：</span>
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
        <p style="position:absolute;top:5vmin;left:50%;z-index:9999;font-size:16rpx;transform: translateX(-50%);">本轮记忆时间：{{returnHourAndMinutes}}</p>
        <div style="margin-bottom:30rpx">请选择</div>
        <p style="margin-top:40rpx">
          <span @click="selLevel('primary')">
            <image class="radioBtn" src="/static/images/firstPage/circle_active.png" v-if="level=='primary'"></image>
            <image class="radioBtn" src="/static/images/firstPage/circle.png" v-if="level=='senior'"></image>
            <span :class="{active:level=='primary'}" @click="selLevel('primary')">初级玩家</span>
          </span>
          <span @click="selLevel('senior')">
            <image class="radioBtn" src="/static/images/firstPage/circle_active.png" v-if="level=='senior'"></image>
            <image class="radioBtn" src="/static/images/firstPage/circle.png" v-if="level=='primary'"></image>
            <span :class="{active:level=='senior'}">高级玩家</span>
          </span>
        </p>
      </div>
      <div class="btn submit-btn" @click="startGame">开始游戏</div>
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
  onLoad (options) {
    if (options.type === 'playAgain') {
      this.$store.commit("setIsNew", false);
    }
    this.init();
  },
  data () {
    return {
      rule: [],
      show: false,
      memoryTime: [],
      pockerNum: [1, 2, 4, 8],
      activeTime: "",
      activeNum: 4,
      currentPage: "",
      page: "first",
      gameType: 'pocker',
      level: 'primary'
    }
  },
  computed: {
    returnHourAndMinutes: function () {
      let minutes = Math.floor(this.memoryTime / 60);
      let seconds = (this.memoryTime - minutes * 60);
      return (minutes !== 0 ? minutes + '分钟' : '') + (seconds !== 0 ? seconds + '秒' : '')
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: this.$getGameInfo("name")
    })
  },
  methods: {
    init: function () {
      let level = this.$store.state.level;
      let rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == level
      })[0];
      this.memoryTime = rule.memory_time.split(",").reverse();
      this.activeTime = this.memoryTime[0];
      this.currentPage = this.$getGameInfo("wxapp_url").split("/")[2];
      this.rule = this.$getGameInfo("rule");

      this.page = (this.currentPage !== 'flashPocker' ? "first" : "second");
      if (this.currentPage === 'flashPocker' || this.currentPage === 'fastPocker' || this.currentPage === 'marathonPocker') {
        this.gameType = 'pocker';
      } else {
        this.gameType = 'other';
      }
      this.activeNum = 4;
    },
    //开始游戏
    startGame: function () {
      if (this.currentPage === 'flashPocker') {
        this.$store.commit("setMemoryTime", this.activeTime);
        this.$store.commit("setPockerNumber", this.activeNum);
      } else if (this.currentPage === 'marathonPocker' || this.currentPage === 'fastPocker') {
        this.$store.commit("setPockerNumber", this.activeNum === 'All' ? 52 : this.activeNum);
      }
      console.log("ready-page pockernumber", this.activeNum);
      this.getGameList();
    },
    getGameList: function () {
      let game_id = this.$store.state.gameid;
      let game_level = this.level;
      let token = this.$store.state.userInfo.token;
      this.$http.get({
        url: "/api/wxapp.game/getGameContent",
        data: {
          game_id, game_level
        },
        header: {
          token: token
        }
      }).then(result => {
        this.$store.commit("setRuleList", result.data);
        //跳转到下一个页面
        wx.reLaunch({
          url: "/pages/" + this.currentPage + "/memary/main"
        })
      })

    },
    //选择等级
    selLevel: function (level) {
      this.level = level;
      this.$store.commit("setLevel", level);
      let rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == level
      })[0];
      this.memoryTime = parseInt(rule.memory_time);
      this.$store.commit("setMemoryTime", parseInt(rule.memory_time));
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
  margin: tovmin(150) auto tovmin(50) auto;
  display: flex;
  flex-direction: column;
  width: 90%;
  text-align: center;
  justify-content: center;
  font-size: tovmin(36);
}
.content > div > div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.label {
  height: tovmin(56);
  line-height: tovmin(56);
}

.btn-group span {
  margin-right: tovmin(90);
  width: tovmin(100);
  height: tovmin(56);
  display: inline-block;
  font-size: tovmin(36);
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
  font-size: tovmin(48);
  font-weight: bold;
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
.radioBtn {
  width: tovmin(36);
  height: tovmin(36);
  display: inline-block;
  vertical-align: middle;
}
</style>
