<template>
  <div>
    <div class="fog" v-if="showPannel" @click="showPannel=false"></div>
    <div class="title">
      <template v-if="isResult">
        <p>得分：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标准分：</p>
        <p>
          <span class="btn primary-btn" style="margin-right:30rpx">再次训练</span>
          <span class="btn default-btn">分享</span>
        </p>
      </template>
      <template v-else>
        <p>
          <span class="btn default-btn" style="margin-right:30rpx">帮助</span>
          <span class="btn default-btn arrow" v-if="showType" @click="showPannel=true">显示方式</span>
        </p>
        <p v-if="type=='jump'">00：00：{{seconds}}</p>
        <p v-else>00：{{minutes}}：{{seconds<10?'0'+seconds:seconds}}</p>
        <p class="btn primary-btn" v-if="type=='跳过'">跳过</p>
        <p class="btn primary-btn" v-if="type=='下一页'" @click="nextPage">下一页</p>
        <p class="btn submit-btn" v-if="type=='记忆完成'">记忆完成</p>
        <p class="btn submit-btn" v-if="type=='作答完成'" @click="finish">作答完成</p>
      </template>
    </div>
    <div :class="{pannel:true,down:showPannel,up:!showPannel}">
      <p>显示方式</p>
      <p @click="group('0')">不划线</p>
      <p @click="group('3')">三个一组</p>
      <p @click="group('6')">六个一组</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["seconds", "minutes", "type", "isResult", "showType"],
    mounted() {
      this.timer();
    },
    data() {
      return {
        seconds: this.seconds,
        minutes: this.minutes,
        showPannel: false,
      }
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
      group: function (count) {
        this.showPannel = false;
        this.$emit("group", count);
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
  }

  .arrow::after {
    content: "";
    height: tovmin(15);
    width: tovmin(15);
    border: tovmin(4) solid white;
    border-top-color: transparent;
    border-right-color: transparent;
    display: inline-block;
    transform: rotate(-45deg);
    margin-left: tovmin(20);
    position: relative;
    top: tovmin(-6);
  }

  .pannel {
    position: fixed;
    height: tovmin(420);
    width: 100%;
    background: white;
    color: $black;
    z-index: 10001;
    bottom: tovmin(-500);
    text-align: center;
  }

  .pannel p {
    height: tovmin(106);
    line-height: tovmin(106);
  }

  .pannel p:first-child {
    background: $light-blue;
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
      bottom: tovmin(-500);
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
      bottom: tovmin(-500);
      display: none;
    }
  }

</style>
