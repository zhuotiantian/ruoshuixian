<template>
  <div class="contanier">
    <CardTitle :seconds="seconds" :minutes="minutes" type="记忆完成" @finishMemary="finishMemary"></CardTitle>
    <div v-if="ratio" class="content">
      <image class="play" :src="'/static/images/firstPage/play@'+ratio+'x.png'"></image>
      <image class="slider" :src="'/static/images/firstPage/slider@'+ratio+'x.png'"></image>

      <em></em>
    </div>
    <p class="text">正在播放录音&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;</p>
  </div>
</template>
<script>
  import CardTitle from "@/components/gameTitle"
  export default {
    components: {
      CardTitle
    },
    mounted() {
      this.ratio = this.globalData.ratio;
    },
    data() {
      return {
        seconds: 0,
        minutes: 15,
        ratio: 1,
      }
    },
    methods: {
      finishMemary: function () {
        wx.navigateTo({
          url: "../answer/main"
        });
      }
    }
  }

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
    margin-left: tovmin(10)
  }

  .text {
    margin-top: tovmin(100)
  }

</style>
