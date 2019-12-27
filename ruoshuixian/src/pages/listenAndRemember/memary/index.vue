<template>
  <div class="contanier">
    <GameTitle :showIntervalTime='true' ref="title" :showFinishMemoryBtn="true" @finishMemary="finishMemary"></GameTitle>
    <div class="content">
      <image class="play" v-if="isPlay" :src="'/static/images/firstPage/play.png'" @click="pause"></image>
      <image class="play" v-else :src="'/static/images/firstPage/pause.png'" @click="play"></image>
      <image class="slider" :src="'/static/images/firstPage/slider.png'"></image>
      <em></em>
    </div>
    <p class="text" v-if="isPlay">正在播放录音&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;</p>
    <p class="text" v-else>播放暂停</p>
    <div class="interval" v-if="showInterval">{{number}}秒</div>
  </div>
</template>
<script>
import GameTitle from "@/components/gameTitle_new";
export default {
  components: {
    GameTitle
  },
  onUnload () {
    this.innerAudioContext.destroy();
    clearInterval(this.interval);
  },
  onReady () {
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError(function (res) {
      console.log(res);
      wx.showToast({
        title: '语音播放失败',
        icon: 'none',
      })
    })
  },
  data () {
    return {
      innerAudioContext: null,
      level: "primary",
      isPlay: true,
      showInterval: true,
      number: 3,
      numberList: []
    };
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data());
  },
  mounted () {
    this.getGameData();
    //记忆前的倒计时
    this.interval = setInterval(() => {
      this.number--;
      if (this.number <= 0) {
        this.showInterval = false;
        this.toYuyin()
        clearInterval(interval);
      }
    }, 1000);
  },
  methods: {
    // 获取数据
    getGameData: function () {
      this.level = this.$store.state.level;
      this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == this.level
      })[0];
      let eng = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
      this.numberList = this.rule.list.map(e => {
        return eng[e]
      });
    },
    toYuyin: function () {
      let plugin = requirePlugin("WechatSI");
      let that = this;
      plugin.textToSpeech({
        lang: "en_US",
        tts: true,
        content: this.numberList.join(","),
        success: function (res) {
          console.log("succ tts", res.filename);
          that.innerAudioContext.src = res.filename
          that.innerAudioContext.play();
        },
        fail: function (res) {
          console.log("fail tts", res)
        }
      })
    },
    finishMemary: function () {
      this.innerAudioContext && this.innerAudioContext.destroy();
      setTimeout(() => {
        wx.reLaunch({
          url: "/pages/numberAnswer/main"
        });
      }, 200)
    },
    pause: function () {
      this.innerAudioContext.pause();
      this.isPlay = false;
    },
    play: function () {
      this.innerAudioContext.play();
      this.isPlay = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.contanier {
  color: white;
  text-align: center;
}

.content {
  width: tovmin(692);
  height: tovmin(138);
  text-align: center;
  margin: 0 auto;
  margin-top: tovmin(250);
  display: flex;
  align-items: center;
  justify-content: center;
}

.play {
  height: tovmin(64);
  width: tovmin(64);
}

.slider {
  height: tovmin(24);
  width: tovmin(24);
  position: absolute;
}

em {
  height: tovmin(4);
  width: tovmin(538);
  background: $middle-blue;
  margin-left: tovmin(10);
}

.text {
  margin-top: tovmin(100);
}
.interval {
  position: fixed;
  width: tovmin(200);
  height: tovmin(200);
  line-height: tovmin(200);
  background: rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: tovmin(200);
  text-align: center;
  font-size: tovmin(40);
}
</style>
