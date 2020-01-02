<template>
  <div>
    <div class="title">
      <div class="left">
        <!-- 非结果 -->
        <template v-if="!isResult">
          <div>
            <span class="btn default-btn helpBtn" @click="toHelp">帮助</span>
            <span class="btn default-btn" v-if="showTips" @click="showTipsHandler">操作提示</span>
            <span class="btn default-btn type arrow " v-if="showShowType&&gameName!=='二进制数字'" style="margin-left:30rpx" @click="showShowTypePannel=true">{{pockerNumber===52?'All':pockerNumber}}</span>
            <span class="btn default-btn type arrow" v-if="showShowType&&gameName==='二进制数字'" style="margin-left:30rpx" @click="showShowTypePannel=true">{{showType}}</span>
          </div>
        </template>
        <!-- 结果 -->
        <template v-else>
          <div class="result_title">
            <span v-if="showCostTime">用时：{{getPayedTime}}</span>
            <span>得分：{{result.fraction||0}}分</span>
            <span class="btn default-btn" @click="toHistory">历史记录</span>
            <span class="btn default-btn" v-if="showCorrectAnswerBtn&&!showMyAnswer" @click="showCorrectAnswer">正确答案</span>
            <span class="btn default-btn" v-if="showMyAnswer" @click="showMyAnswerHandler">我的提交</span>
          </div>
        </template>
      </div>
      <div class="center">
        <p v-if="showIntervalTime">
          {{computedTime.hour<10?('0'+computedTime.hour):''}}：
          {{(computedTime.minutes<10?'0':'')+computedTime.minutes}}：
          {{(computedTime.seconds<10?'0':'')+computedTime.seconds}}
        </p>
        <p v-else-if="startAnwserText" style="font-size:24rpx">开始作答</p>
      </div>
      <div class="right">
        <!-- 非结果 -->
        <template v-if="!isResult">
          <div>
            <span v-if="showGameLevel">{{returnCurrentGameLevel}}</span>
            <span class="btn primary-btn" v-if="showChangePageBtn&&!showPrevPage" @click="nextPage">下一页</span>
            <span class="btn primary-btn" v-if="showChangePageBtn&&showPrevPage" @click="prevPage">上一页</span>
            <span class="btn submit-btn" v-if="showFinishMemoryBtn" @click="finishMemary">记忆完成</span>
            <span class="btn submit-btn" v-if="showFinishAnwserBtn" @click="finishAnwser">作答完成</span>
          </div>
        </template>
        <!-- 结果 -->
        <template v-else>
          <div>
            <span class="btn primary-btn" v-if="showChangePageBtn&&!showPrevPage" @click="nextPage">下一页</span>
            <span class="btn primary-btn" v-if="showChangePageBtn&&showPrevPage" @click="prevPage">上一页</span>
            <span class="btn primary-btn" @click="playAgain">再次训练</span>
            <button class="shareBtn" open-type="share">
              <image class="share" :src="'/static/images/firstPage/share.gif'" />
            </button>
          </div>
        </template>
      </div>
    </div>
    <template v-if="showShowTypePannel">
      <div>
        <div class="fog" @click="showShowTypePannel=false"></div>
        <div :class="{pannel:true,down:showShowTypePannel,up:!showShowTypePannel}">
          <p class="pannel-title">显示方式</p>
          <template v-if="showShowType&&gameName!=='二进制数字'">
            <div>
              <p v-for="(item,index) in pannelContent" :key="index" @click.stop="group(item,index)" :class="{active:item==(pockerNumber===52?'All':pockerNumber)}">{{item}}</p>
            </div>
          </template>
          <template v-else>
            <div>
              <p v-for="(item,index) in pannelContent" :key="index" @click.stop="group(item,index)" :class="{active:item==showType}">{{item}}</p>
            </div>
          </template>
        </div>
      </div>
    </template>
    <template v-if="shouwOperationTips">
      <div>
        <div class="fog" @click="shouwOperationTips=false"></div>
        <div class="tips">
          <p style="margin-bottom:30rpx">你可以通过以下两种方式对扑克牌的顺序进行修改</p>
          <p>方式一、点击屏幕上半区的任意一张扑克，点击“退回”将这张扑克牌退回原位。</p>
          <p>方式二、点击屏幕上半区的任意一张扑克，点击“替换/从左插入/从右面插入”后点击下半区的任意一张扑克进行“替换/从左插入/从右面插入”操作。</p>
          <p>
            <span class="btn default-btn" @click="shouwOperationTips=false">我知道了</span>
          </p>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    //是否显示倒计时
    showIntervalTime: {
      type: Boolean,
      default: false
    },
    //是否显示操作提示按钮
    showTips: {
      type: Boolean,
      default: false
    },
    //是否显示记忆完成按钮
    showFinishMemoryBtn: {
      type: Boolean,
      default: false
    },
    //是否显示开始作答字样
    startAnwserText: {
      type: Boolean,
      default: false
    },
    //是否显示结束作答页面
    showFinishAnwserBtn: {
      type: Boolean,
      default: false
    },
    //是否是结果页面
    isResult: {
      type: Boolean,
      default: false
    },
    //是否显示显示方式
    showShowType: {
      type: Boolean,
      default: false
    },
    //是否是回忆页面
    isRecall: {
      type: Boolean,
      default: false
    },
    //是否显示消耗时长
    showCostTime: {
      type: Boolean,
      default: false
    },
    //是否显示翻页按钮
    showChangePageBtn: {
      type: Boolean,
      default: false
    },
    //是否显示查看正确答案按钮
    showCorrectAnswerBtn: {
      type: Boolean,
      default: false
    }
  },
  onUnload: function () {
    clearInterval(this.timer);
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data());
    this.level = this.$store.state.level;
    this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
      return e.game_level == this.level
    })[0];
    this.result = this.$store.state.result;
    this.gameid = this.$store.state.gameid;
    this.pockerNumber = this.$store.state.pockerNumber;
    this.gameName = this.$getGameInfo("name");
    if (this.gameName === '二进制数字') {
      this.pannelContent = ["不划线", "三个一组", "六个一组"];
    } else {
      this.pannelContent = ['1', '2', '4', '8', 'All'];
    }
    this.showGameLevel = this.gameName !== '闪视扑克牌' && this.showFinishMemoryBtn
    if ((this.showFinishMemoryBtn || this.isRecall || this.showFinishAnwserBtn) && this.showIntervalTime) {
      clearInterval(this.timer);
      this.interval();
    }
  },
  computed: {
    //返回所耗时长
    getPayedTime: function () {
      return this.result && Math.round(this.result.game_time / 60) + '分' + Math.floor(this.result.game_time % 60) + "秒"
    },
    // 返回当前游戏等级文本
    returnCurrentGameLevel: function () {
      return (this.level === 'primary' ? '初级' : '高级') + this.gameName
    }
  },
  data () {
    return {
      gameid: null,
      rule: {},
      result: {},
      showShowTypePannel: false,
      pockerNumber: 0,
      pannelContent: [],
      computedTime: {
        hour: 0,
        minutes: 0,
        seconds: 0
      },
      showGameLevel: false,
      shouwOperationTips: false,
      showType: '显示方式',
      gameName: "",
      showPrevPage: false,
      showMyAnswer: false
    }
  },
  methods: {
    //倒计时定时器
    interval: function () {
      var time;
      if (this.showFinishMemoryBtn) {//记忆时间
        time = parseInt(this.rule.memory_time);
      } else if (this.isRecall) {//回忆时间
        time = parseInt(this.rule.recollect_time)
      } else if (this.showFinishAnwserBtn) {
        time = this.$getGameInfo("answerTime");
      }
      this.getTime(time);
      this.timer = setInterval(() => {
        console.log("interval...");
        time--;
        if (time === 0) {
          clearInterval(this.interval);
          if (this.showFinishMemoryBtn) {
            this.finishMemary();
          } else if (this.showFinishAnwserBtn) {
            this.finishAnwser();
          }
        } else {
          this.getTime(time);
        }
      }, 1000)
    },
    getTime: function (time) {
      let hour = Math.floor(time / 3600);
      let minutes = Math.floor((time - hour * 3600) / 60);
      let seconds = (time - hour * 3600 - minutes * 60);
      this.computedTime = { hour, minutes, seconds };
      console.log(this.computedTime);
    },
    //跳转到游戏帮助页面
    toHelp: function () {
      wx.navigateTo({
        url: "/pages/help/main"
      })
    },
    //跳转到游戏历史记录页面
    toHistory: function () {
      wx.navigateTo({
        url: "/pages/history/main"
      })
    },
    //显示操作提示
    showTipsHandler: function () {
      this.shouwOperationTips = true;
    },
    //点击记忆完成
    finishMemary: function () {
      this.$emit("finishMemary");
    },
    //作答完成
    finishAnwser: function () {
      this.$emit("finishAnwser");
    },
    //再次训练
    playAgain: function () {
      this.$toGame(this.gameid, "", () => {
        wx.reLaunch({
          url: "/pages/gameIndex/main?type=playAgain"
        });
      });
    },
    //选择显示方式
    group: function (item) {
      if (this.gameName !== '二进制数字') {
        this.pockerNumber = item;
        this.$store.commit("setPockerNumber", item);
      } else {
        this.showType = item;
      }
      this.showShowTypePannel = false;
      this.$emit("group", item);
    },
    //点击下一页
    nextPage: function () {
      this.showPrevPage = true;
      this.$emit("nextPage");
    },
    prevPage: function () {
      this.showPrevPage = false;
      this.$emit("prevPage");
    },
    //查看正确答案
    showCorrectAnswer: function () {
      this.showMyAnswer = true;
      this.$emit("showCorrectAnswer");
    },
    //查看我提交的答案
    showMyAnswerHandler: function () {
      this.showMyAnswer = false;
      this.$emit("showMyAnswerHandler");
    }
  },
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 4vmin;
  display: flex;
  justify-content: space-between;
  padding: 0 4vmin 0 4vmin;
  position: fixed;
  top: 0;
  width: calc(100% - 30rpx);
  background: #173771;
  color: white;
  z-index: 999;
  height: 14vmin;
  line-height: 14vmin;
}
.title .left {
  flex: 4;
  text-align: left;
}
.title .center {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content:center;
}
.title .right {
  flex: 4;
  text-align: right;
}
.title span:not(:first-child) {
  margin-left: tovmin(30);
}
.helpBtn {
  background: $red;
  color: white;
}
p {
  text-align: center;
}
.pannel-title {
  background: $light-blue;
  font-size: tovmin(34);
  font-weight: bold;
}
.pannel p {
  font-size: tovmin(26);
}
.share {
  width: tovmin(100);
  height: tovmin(100);
  top: tovmin(6);
  vertical-align: middle;
}
.shareBtn {
  background: transparent;
  height: tovmin(150);
  width: tovmin(150);
  float: right;
  position: relative;
  top: tovmin(-5);
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
  background: #f5f5f5;
}

.arrow-left::after {
  top: 0.2vmin;
  left: -0.2vmin;
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
.result_title {
  font-size: tovmin(36);
}
</style>
