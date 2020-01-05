<template>
  <div class="container">
    <div class="fog" v-if="showFog"></div>
    <alertBox :text="text" v-if="showFog" @hideFog="hideFog" @confirm="confirm"></alertBox>
    <GameTitle :showIntervalTime='true' :showFinishAnwserBtn="true" @finishAnwser="finishAnwser"></GameTitle>
    <div class="list">
      <p class="list-title">
        <span>序号</span>
        <span>时间</span>
        <span style="flex:5;">事件</span>
      </p>
      <p v-for="(item,index) in numberList" :key="index">
        <span>{{index+1}}</span>
        <span @click="focus(index)" :class="{input:true,active:activeIndex==index}">{{item.date}}</span><span style="flex:5;">{{item.event}}</span>
      </p>
    </div>
    <Keybord :showKeybord="showKeybord" @selectNumber="selectNumber" @deleteNumber="deleteNumber"></Keybord>
  </div>
</template>
<script>
import GameTitle from "@/components/gameTitle_new"
import Keybord from "@/components/Keybord"
import alertBox from "@/components/alertBox"
export default {
  components: {
    GameTitle,
    Keybord,
    alertBox
  },
  onLoad (option) {
    Object.assign(this.$data, this.$options.data())
    this.init();
  },
  data () {
    return {
      showFog: false,
      text: "确定结束作答吗？",
      rule: {},
      numberList: [],
      activeIndex: null,
      showKeybord: false,
    }
  },
  methods: {
    init: function () {
      let level = this.$store.state.level;
      let rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == level
      })[0];
      let list = this.$store.state.ruleList.list;
      this.numberList = list.date.map((e, index) => {
        return {
          date: "",
          event: list.event[index]
        }
      });
      this.startTime = new Date().getTime();

    },
    focus: function (index) {
      this.activeIndex = index;
      this.showKeybord = true;
    },
    finishAnwser: function (index) {
      this.showFog = true;
    },
    hideFog: function () {
      this.showFog = false;
    },
    confirm: function () {
      let token = this.$store.state.userInfo.token, game_records_id = this.$store.state.ruleList.game_records_id, endTime = new Date().getTime(), date = [], event = [];
      this.numberList.forEach(e => {
        date.push(e.date);
        event.push(e.event);
      });
      this.$http.post({
        url: "/api/wxapp.game/submitTheGame",
        data: {
          game_records_id,
          game_time: (endTime - this.startTime) / 1000,
          content: JSON.stringify({
            date: date,
            event: event
          })
        },
        header: {
          token
        }
      }).then(result => {
        if (result.code == 1) {
          this.$store.commit("setResult", result.data);
          wx.reLaunch({
            url: "../result/main"
          })
        } else {
          wx.showToast({
            title: result.msg,
            icon: "none"
          });
        }
      })
    },
    selectNumber: function (data) {
      let date = this.numberList[this.activeIndex].date;
      if (date.length < 4) {
        this.$set(this.numberList[this.activeIndex], "date", date + data);
      }
    },
    deleteNumber: function () {
      let date = this.numberList[this.activeIndex].date.split("");
      date.pop();
      this.$set(this.numberList[this.activeIndex], "date", date.join(""));
    }
  }
};
</script>
<style lang="scss" scoped>
page {
  height: calc(100% - 150rpx) !important;
}

.container {
  background: $deep-blue;
  color: white;
  height: calc(100% - 150rpx);
}

.list {
  height: calc(100% - 150rpx);
  margin: tovmin(150) tovmin(30) auto tovmin(30);
}

.list p {
  display: flex;
  align-items: center;
  text-align: center;
  height: tovmin(86);
}

.list p span {
  flex: 1;
  text-align: center;
}

.list-title {
  color: $yellow;
}

.input {
  width: tovmin(164);
  height: tovmin(66);
  border: tovmin(2) solid $blue-border;
  border-radius: tovmin(8);
  margin: 0 auto;
  display: inline-block;
  line-height: tovmin(66);
}

.active {
  border: 1px solid red;
  margin-right: tovmin(-1);
  position: relative;
  z-index: 10;
}
</style>
