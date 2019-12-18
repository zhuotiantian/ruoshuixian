<template>
  <div class="container">
    <GameTitle ref="title" :isRecall="true" :showIntervalTime='true'></GameTitle>
    <div class="tips">
      <p>回忆完成点击开始即可作答</p>
    </div>
    <div class="btn submit-btn" @click="startGame">开始</div>
  </div>
</template>
<script>
import GameTitle from "@/components/gameTitle_new"
export default {
  components: {
    GameTitle
  },
  onLoad: function () {
    this.gameName = this.$store.state.gameName;
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: this.gameName
    })
  },
  methods: {
    startGame: function () {
      wx.reLaunch({
        url: "/pages/" + this.$store.state.gamePages[this.gameName].path + "/answer/main"
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding-top: tovmin(300);
  color: white;
  text-align: center;
}

.tips p {
  height: tovmin(60);
  line-height: tovmin(60);
}

.list {
  margin-top: tovmin(400);
}

.pocker {
  width: tovmin(82);
  height: tovmin(130);
  margin-right: tovmin(10);
  margin-bottom: tovmin(10);
}
.submit-btn {
  height: tovmin(98);
  width: tovmin(220);
  border-radius: tovmin(50);
  text-align: center;
  line-height: tovmin(98);
  font-size: 24rpx;
  font-weight:bold;
  position: absolute;
  bottom: tovmin(140);
  left: 50%;
  transform: translateX(-50%);
}
</style>
