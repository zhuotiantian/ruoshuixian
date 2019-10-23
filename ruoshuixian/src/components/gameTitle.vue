<template>
  <div>
    <div class="fog" v-if="showPannel" @click="showPannel=false"></div>
    <div class="title">
      <!-- <em class="arrow arrow-left" @click="toFirstPage"></em> -->
      <template v-if="isResult">
        <p>
          <span v-if="isPocker">用时：{{getPayedTime}}</span>
          <span style="margin-left:30rpx">得分：{{result.fraction||0}}分</span>
        </p>
        <p style="flex:1;text-align:right">
          <span class="btn primary-btn" style="margin-right:15rpx" v-if="type=='下一页'&&!showPrevPageBtn" @click="nextPage">下一页</span>
          <span class="btn primary-btn" style="margin-right:15rpx" v-if="showPrevPageBtn" @click="prevPage">上一页</span>
          <span class="btn primary-btn" @click="playAgain">再次训练</span>
          <button class="btn default-btn shareBtn" open-type="share">
            <image class="share" :src="'/static/images/redPocket/share.png'" />
            分享
          </button>
        </p>
      </template>
      <template v-else>
        <p style="flex:2;text-align:left">
          <span class="btn default-btn" @click="toHelpPage">帮助</span>
          <span class="btn default-btn" v-if="showTips" @click="showTipsHandler" style="margin-left:30rpx">操作提示</span>
          <span class="btn default-btn type arrow" v-if="showType" style="margin-left:30rpx" @click="showPannel=true">{{selectType}}</span>
        </p>
        <p style="flex:1;text-align:center;r" v-if="showIntervalTime">
          {{hours==0?'00':'0'+hours}}：{{t_minutes<10?'0'+t_minutes:t_minutes}}：{{t_seconds<10?'0'+t_seconds:t_seconds}}</p>
        <div style="flex:2;text-align:right;">
          <span v-if="showGameLevel" style="margin-right:15rpx">{{showGameLevel}}</span>
          <p class="btn primary-btn" v-if="type=='跳过'" @click="toNextPage">跳过</p>
          <p class="btn primary-btn" style="margin-right:15rpx" v-if="type=='下一页'" @click="nextPage">下一页</p>
          <p class="btn primary-btn" style="margin-right:15rpx" v-if="showPrevPage" @click="prevPage">上一页</p>
          <p class="btn primary-btn" v-if="isInsert" style="margin-right:15rpx" @click="insertPocker">插入空牌</p>
          <p class="btn submit-btn" v-if="type=='记忆完成'||showFinishButton" @click="finishMemary">记忆完成</p>
          <p class="btn submit-btn" v-if="type=='作答完成'||showSubmitButton" @click="finish">作答完成</p>
          <p class="btn submit-btn" v-if="type=='开始'" @click="startGame">开始</p>
          <p v-else>&nbsp;</p>
        </div>
      </template>
    </div>
    <div :class="{pannel:true,down:showPannel,up:!showPannel}">
      <p>显示方式</p>
      <p v-for="(item,index) in pannelContent" :key="index" @click.stop="group(item,index)" :class="{active:active==index}">{{item}}</p>
    </div>
    <div class="fog" v-if="showTip" @click="showTip=false"></div>
    <div class="tips" v-if="showTip">
      <p style="margin-bottom:30rpx">你可以通过以下两种方式对扑克牌的顺序进行修改</p>
      <p>方式一、双击屏幕上半区的任意一张扑克，将这张扑克牌退回原位。</p>
      <p>方式二、单击屏幕上半区的任意一张扑克，然后长按下半区的任意一张扑克，进行“替换位置/从前面插入/从后面插入”操作。</p>
      <p>
        <span class="btn default-btn" @click="hideTips">我知道了</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "type",
    "isResult",
    "showType",
    "pannelContent",
    "isPocker",
    "showTime",
    "isInsert",
    "btnType",
    "pageType",
    "isShowTime",
    "seconds",
    "showTips",
    "showGameLevel",
    "noWait",
    'showPrevPageBtn'
  ],
  onLoad () {
    Object.assign(this.$data, this.$options.data());
    this.level = this.$store.state.level;
    this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
      return e.game_level == this.level
    })[0];
    this.result = this.$store.state.result;
    this.gameid = this.$store.state.gameid;
    this.memoryTime = this.$store.state.memoryTime;
    this.resetInterval();
  },
  computed: {
    getPayedTime: function () {
      return this.result && Math.round(this.result.game_time / 60) + '分' + (this.result.game_time % 60).toFixed("2") + "秒"
    }
  },
  data () {
    return {
      t_seconds: null,
      t_minutes: null,
      showPannel: false,
      selectType: "显示方式",
      showTime: this.showTime,
      active: null,
      showIntervalTime: true,
      event: {
        跳过: "toNextPage",
        记忆完成: "finishMemary",
        作答完成: "finish",
        开始: "startGame",
      },
      game: [],
      result: [],
      count: 0,
      time: 0,
      memoryTime: 0,
      recallTime: 0,
      level: "",
      hours: 0,
      isPlayAgain: 0,
      showTip: false,
      showPrevPage: false,
      showFinishButton: false,
      showSubmitButton: false,
    };
  },
  watch: {
    t_seconds: function () {
      if (
        this.t_minutes == 0 &&
        this.t_seconds == 0 &&
        (this.seconds || this.hours == 0)
      ) {
        if (this.btnType == "none") {
          this.toNextPage();
        } else {
          this.type && this[this.event[this.type]]("timeout");
        }
      }
    },
    type: function (newVal, oldVal) {
      if ((newVal == '记忆完成' || newVal == '作答完成') && oldVal == '下一页') {
        this.showPrevPage = true;
      } else {
        this.showPrevPage = false;
      };
      if (newVal == '下一页' || oldVal == "记忆完成") {
        this.showFinishButton = true;
        this.showSubmitButton = false;
      }
      if (newVal == '下一页' || oldVal == "作答完成") {
        this.showSubmitButton = true;
        this.showFinishButton = false;
      }
      if (oldVal !== '下一页') {
        this.changeTime();
      }
    }
  },
  methods: {
    resetInterval: function () {
      this.showIntervalTime = this.isShowTime === undefined;
      if (this.showIntervalTime) {
        this.changeTime();
      }
    },
    changeTime: function () {
      switch (this.type) {
        case "下一页": ;
        case "记忆完成":
          if (!this.memoryTime) {
            this._time = this.rule.memory_time;
          } else {
            this._time = this.memoryTime;
          }

          this.t_seconds = this._time % 60;
          this.t_minutes = Math.floor(this._time / 60);
          break;
        case "开始":
          this._time = this.rule.recollect_time || 60;
          this.t_seconds = this._time % 60;
          this.t_minutes = Math.floor(this._time / 60);
          break;
        case "作答完成":
          if (this.seconds != undefined) {
            this._time = this.seconds;
            if (this.seconds > 3600) {
              this.hours = Math.floor(this._time / 3600);
              this.t_minutes = (this._time % 3600) / 60;
              this.t_seconds = this._time % 60;
            } else if (this.seconds > 60) {
              this.hours = 0;
              this.t_minutes = Math.floor(this._time / 60);
              this.t_seconds = this._time % 60;
            } else {
              this.t_seconds = this.seconds;
              this.t_minutes = 0;
              this.hours = 0;
            }
          } else {
            this.t_seconds = 60;
            this.t_minutes = 15;
          }
          break;
        case "跳过":
          this.t_seconds = 60;
          this.t_minutes = 0;
          break;
      }
      this.timeout && clearInterval(this.timeout);
      this.timer();
    },
    timer: function () {
      if (this.t_minutes > 0 || this.hours > 0) {
        if (this.hours > 0) {
          this.hours--;
          this.t_seconds = 60;
          this.t_minutes = 59;
        } else {
          let seconds = this.t_seconds;
          this.t_seconds = seconds == 0 ? 60 : seconds;
          this.t_minutes = seconds == 0 ? this.t_minutes - 1 : this.t_minutes;
        }
        this.timeout = setInterval(() => {
          if (this.t_seconds == 0) {
            if (this.t_minutes > 0) {
              this.t_minutes--;
              this.t_seconds = 60;
            } else {
              if (this.hours > 0) {
                this.hours--;
                this.t_minutes = 59;
                this.t_seconds = 60;
              } else {
                this.clear();
              }
            }
          } else {
            this.t_seconds--;
          }
        }, 1000);
      } else {
        this.timeout = setInterval(() => {
          this.t_seconds--;
          if (this.t_seconds == 0) {
            this.clear();
          }
        }, 1000);
      }
    },
    finish: function (data) {
      this.clear();
      this.$emit("finish", data);
    },
    nextPage: function () {
      this.$emit("nextPage");
    },
    prevPage: function () {
      this.$emit("prevPage");
    },
    group: function (count, index) {
      this.selectType = count;
      this.active = index;
      this.$emit("group", count);
      this.showPannel = false;
      this.clear();
      this.timer();
    },
    toNextPage: function () {
      if (this.pageType == "countIndex" && this.t_seconds > 3 && !this.noWait) {
        this.t_seconds = 3;
      } else {
        this.t_seconds = 0;
        this.clear();
      }
      this.$emit("toNextPage", this.t_seconds);
    },
    toHelpPage: function () {
      wx.navigateTo({
        url: "/pages/help/main"
      });
    },
    startGame: function () {
      this.clear();
      this.$emit("startGame");
    },
    finishMemary: function () {
      this.clear();
      this.$emit("finishMemary");
    },
    playAgain: function () {
      let pages = getCurrentPages();
      this.$toGame(this.gameid, "", () => {
        wx.reLaunch({
          url: "../main"
        });
      });
    },
    clear: function () {
      clearInterval(this.timeout);
    },
    toFirstPage: function () {
      wx.reLaunch({
        url: "/pages/firstPage/main"
      });
    },
    showTipsHandler: function () {
      this.showTip = true;
    },
    hideTips: function () {
      this.showTip = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  font-size: tovmin(30);
  display: flex;
  justify-content: space-between;
  padding: tovmin(40) tovmin(30) tovmin(30) tovmin(30);
  position: fixed;
  top: 0;
  width: calc(100% - 30rpx);
  background: $deep-blue;
  color: white;
  z-index: 999;
}

.shareBtn {
  background: white;
  color: $black;
  text-align: right;
  width: tovmin(130);
  vertical-align: middle;
  margin-left: tovmin(26);
  padding: 0;
  text-align: center;
}

.share {
  width: tovmin(32);
  height: tovmin(26);
  top: tovmin(6);
  vertical-align: middle;
}

.pannel {
  position: fixed;
  width: 100%;
  background: white;
  color: $black;
  z-index: 10001;
  bottom: tovmin(-1000);
  text-align: center;
  // height: 100%;
}

.pannel p:first-child {
  height: tovmin(150);
  line-height: tovmin(150);
}

.pannel p {
  height: tovmin(120);
  line-height: tovmin(120);
}

.pannel p.active {
  background: $light-blue;
}

.arrow-left::after {
  top: 0.2vmin;
  left: -0.2vmin;
}

.type {
  width: tovmin(170);
  text-align: center;
  position: absolute;
}

.down {
  animation: slide-down 0.5s;
  animation-fill-mode: forwards;
}

.up {
  animation: slide-up 0.5s;
  animation-fill-mode: forwards;
}

@keyframes slide-down {
  from {
    bottom: tovmin(-1000);
  }

  to {
    bottom: 0;
    display: block;
  }
}

@keyframes slide-up {
  from {
    bottom: 0;
  }

  to {
    bottom: tovmin(-1000);
    display: none;
  }
}
.tips {
  position: fixed;
  top: tovmin(150);
  padding: 0 tovmin(100);
  z-index: 1002;
}

.tips p {
  text-align: left;
}

.tips p:last-child {
  text-align: center;
}
</style>