<template>
  <div>
    <div class="fog" v-if="showPannel" @click="showPannel=false"></div>
    <div class="title">
      <template v-if="isResult">
        <p>
          <span v-if="isPocker&&showTime">用时：234S</span>
          <span
            v-else>得分：0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标准分：0</span>
        </p>
        <p style="flex:1;text-align:right">
          <span class="btn default-btn" style="margin-right:15rpx" v-if="isPocker" @click="showTimeHandle">
            <span v-if="showTime">显示得分</span>
            <span v-else>显示用时</span>
          </span>
          <span class="btn primary-btn">再次训练</span>
          <image class="share" :src="'/static/images/redPocket/share@'+ratio+'x.png'" />
          <span class="btn default-btn shareBtn" v-if="ratio">
            <span>分享</span>
          </span>
        </p>
      </template>
      <template v-else>
        <p style="flex:1;text-align:left">
          <span class="btn default-btn" @click="toHelpPage">帮助</span>
          <span class="btn default-btn type arrow" v-if="showType" style="margin-left:30rpx"
            @click="showPannel=true">{{selectType}}</span>
        </p>
        <p style="flex:1;text-align:center" v-if="seconds||minutes">
          00：{{minutes<10?'0'+minutes:minutes}}：{{seconds<10?'0'+seconds:seconds}}</p>
        <div style="flex:1;text-align:right">
          <p class="btn primary-btn" v-if="type=='跳过'" @click="toNextPage">跳过</p>
          <p class="btn primary-btn" v-if="type=='下一页'" @click="nextPage">下一页</p>
          <p class="btn primary-btn" v-if="isInsert" style="margin-right:15rpx">插入空牌</p>
          <p class="btn submit-btn" v-if="type=='记忆完成'" @click="finishMemary">记忆完成</p>
          <p class="btn submit-btn" v-if="type=='作答完成'" @click="finish">作答完成</p>
          <p class="btn submit-btn" v-if="type=='开始'" @click="startGame">开始</p>
          <p v-else>&nbsp;</p>
        </div>
      </template>
    </div>
    <div :class="{pannel:true,down:showPannel,up:!showPannel}">
      <p>显示方式</p>
      <p v-for="(item,index) in pannelContent" :key="index" @click.stop="group(item,index)"
        :class="{active:active==index}">{{item}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: [
      "seconds",
      "minutes",
      "type",
      "isResult",
      "showType",
      "pannelContent",
      "isPocker",
      "showTime",
      "isInsert"
    ],
    mounted() {
      this.timer();
      this.ratio = this.globalData.ratio;
    },
    data() {
      return {
        seconds: this.seconds,
        minutes: this.minutes,
        showPannel: false,
        selectType: "显示方式",
        showTime: this.showTime,
        active: null,
        ratio: 1
      };
    },
    methods: {
      timer: function () {
        if (this.minutes) {
          this.seconds = 60;
          this.minutes = this.minutes - 1;
          this.timeout = setInterval(() => {
            if (this.seconds == 0) {
              if (this.minutes > 0) {
                this.minutes--;
                this.seconds = 60;
              } else {
                clearInterval(this.timeout);
              }
            } else {
              this.seconds--;
            }
          }, 1000);
        } else {
          this.timeout = setInterval(() => {
            this.seconds--;
            if (this.seconds == 0) {
              clearInterval(this.timeout);
            }
          }, 1000);
        }
      },
      finish: function () {
        this.$emit("finish");
      },
      nextPage: function () {
        this.$emit("nextPage");
      },
      group: function (count, index) {
        this.selectType = count;
        this.active = index;
        this.$emit("group", count);
        this.showPannel = false;
      },
      toNextPage: function () {
        this.$emit("toNextPage");
      },
      toHelpPage: function () {
        wx.navigateTo({
          url: "/pages/help/main"
        });
      },
      startGame: function () {
        this.$emit("startGame");
      },
      showTimeHandle: function () {
        this.showTime = !this.showTime;
      },
      finishMemary: function () {
        this.$emit("finishMemary");
      }
    }
  };

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
  }

  .shareBtn {
    background: white;
    color: $black;
    text-align: right;
    width: tovmin(100);
  }

  .share {
    width: tovmin(32);
    height: tovmin(26);
    position: relative;
    left: tovmin(50);
    top: tovmin(6);
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

</style>
