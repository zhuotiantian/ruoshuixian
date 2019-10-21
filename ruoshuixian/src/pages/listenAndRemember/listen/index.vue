<template>
  <div class="contanier">
    <CardTitle type="记忆完成" @finishMemary="finishMemary" :showGameLevel="(level=='primary'?'初级':'高级')+'听记数字'"></CardTitle>
    <div class="content">
      <image class="play" :src="'/static/images/firstPage/play.png'"></image>
      <image class="slider" :src="'/static/images/firstPage/slider.png'"></image>
      <em></em>
    </div>
    <p class="text">正在播放录音&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;</p>
  </div>
</template>
<script>
import CardTitle from "@/components/gameTitle";
export default {
  components: {
    CardTitle
  },
  onUnload () {
    this.innerAudioContext.stop();
  },
  data () {
    return {
      innerAudioContext: null,
      level:"primary"
    };
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data());
    let level = this.$store.state.level;
    this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
      return e.game_level == level
    })[0];
    let numberList = ['A','B','C'].concat(this.rule.list);
    // let numberList = ['A','B','C'].concat(eng);
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
        let tex = encodeURI(numberList);
        wx.login({
          success: function (res) {
            let cuid = res.code;
            var url = `http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=${cuid}&tok=${token}&tex=${tex}&vol=9&per=0&spd=1&pit=5&aue=3`;
            wx.downloadFile({
              url: url,
              success: function (result) {
                let innerAudioContext = wx.createInnerAudioContext();
                innerAudioContext.src = result.tempFilePath;
                innerAudioContext.play();
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
  data () {
    return {
      isPaly: true
    };
  },
  methods: {
    finishMemary: function () {
      this.innerAudioContext && this.innerAudioContext.stop();
      setTimeout(() => {
        wx.reLaunch({
          url: "../answer/main"
        });
      }, 200)
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