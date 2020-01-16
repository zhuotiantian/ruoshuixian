<template>
  <div class="contanier">
    <GameTitle :showIntervalTime="true" ref="title" :showFinishMemoryBtn="true" @finishMemary="finishMemary"></GameTitle>
    <div v-if="!canPlay">
      <p class="info">正在加载音频文件...</p>
    </div>
    <template v-else>
      <div class="content">
        <image class="play" v-if="isPlay" :src="'/static/images/firstPage/play.png'" @click="pause"></image>
        <image class="play" v-else :src="'/static/images/firstPage/pause.png'" @click="play"></image>
        <image class="slider" :src="'/static/images/firstPage/slider.png'"></image>
        <em></em>
      </div>
      <template v-if="!showInterval">
        <div>
          <p class="text" v-if="isPlay">正在播放录音&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;</p>
          <p class="text" v-else>播放暂停</p>
        </div>
      </template>
      <div class="interval" v-else>{{ number }}秒</div>
    </template>
  </div>
</template>
<script>
import GameTitle from "@/components/gameTitle_new";
export default {
  components: {
    GameTitle
  },
  onUnload() {
    this.innerAudioContext.destroy();
    clearInterval(this.interval);
  },
  onReady() {
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError(function(res) {
      console.log(res);
      wx.showToast({
        title: "语音播放失败",
        icon: "none"
      });
    });
  },
  data() {
    return {
      innerAudioContext: null,
      level: "primary",
      isPlay: false,
      showInterval: true,
      number: 3,
      numberList: [],
      canPlay: false
    };
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data());
    this.getGameData();
  },
  methods: {
    // 获取数据
    getGameData: function() {
      let eng = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
      this.numberList = this.$store.state.ruleList.list.map(e => {
        return eng[e];
      });
      this.toYuyin();
    },
    toYuyin: function() {
      let plugin = requirePlugin("WechatSI");
      let that = this;
      plugin.textToSpeech({
        lang: "en_US",
        tts: true,
        content: this.numberList.join(","),
        success: function(res) {
          console.log("succ tts", res.filename);
          that.canPlay = true;
          that.innerAudioContext.src = res.filename;
          //记忆前的倒计时
          that.interval = setInterval(() => {
            that.number--;
            if (that.number <= 0) {
              console.log("1111");
              that.showInterval = false;
              that.isPlay = true;
              that.innerAudioContext.play();
              clearInterval(that.interval);
            }
          }, 1000);
        },
        fail: function(res) {
          console.log("fail tts", res);
        }
      });
    },
    finishMemary: function() {
      this.innerAudioContext && this.innerAudioContext.destroy();
      setTimeout(() => {
        wx.reLaunch({
          url: "/pages/numberAnswer/main"
        });
      }, 200);
    },
    pause: function() {
      this.innerAudioContext.pause();
      this.isPlay = false;
    },
    play: function() {
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
