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
  },
  data () {
    return {
      innerAudioContext: null,
      level: "primary",
      isPlay: true,
    };
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data());
    this.level = this.$store.state.level;
    this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
      return e.game_level == this.level
    })[0];
    let eng = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    let numberList = this.rule.list.map(e => {
      return eng[e]
    });
    let that = this;
    wx.request({
      url: "https://openapi.baidu.com/oauth/2.0/token",
      method: "GET",
      data: {
        grant_type: "client_credentials",
        client_id: "Ty51KGGMStzsF2MaXDmaMG0j",
        client_secret: "g4LN0RcXzUGKsyzK8jBscXHcYRiGSQEv"
      },
      success: function (res) {
        wx.hideLoading();
        let token = res.data.access_token;

        let tex = encodeURIComponent(numberList.slice(0, 100));
        wx.login({
          success: function (res) {
            let cuid = res.code;
            var url = `https://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=${cuid}&tok=${token}&tex=${tex}&vol=9&per=0&spd=1&pit=5&aue=3`;
            wx.downloadFile({
              url: url,
              success: function (result) {
                let innerAudioContext = wx.createInnerAudioContext();
                innerAudioContext.src = result.tempFilePath;
                innerAudioContext.play();
                innerAudioContext.loop = true;
                that.innerAudioContext = innerAudioContext;
              }
            });
          }
        })

      },
      fail: function (res) {
        wx.hideLoading();
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  methods: {
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
</style>
