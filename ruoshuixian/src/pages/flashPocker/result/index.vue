<template>
  <div class="container">
    <GameTitle :isResult="true"></GameTitle>
    <div class="list">
      <div class="pocker-wrapper" :style="{width:(pockerNumber-1)*40+124+'rpx'}">
        <image class="pocker" ref="pocker" v-for="(item,index) in pocker" :style="{left:index*40+'rpx','z-index':index}" :key="index" :src="'/static/images/pocker/'+(item.index)+'-'+item.color+'.png'" />
      </div>
    </div>
  </div>
</template>
<script>
import GameTitle from "@/components/gameTitle_new";
export default {
  components: {
    GameTitle
  },
  data () {
    return {
      pockerCount: 23,
      left: 100,
      userid: null,
      pocker: [],
      pockerNumber: 0
    };
  },
  onLoad () {
    let userInfo = this.$store.state.userInfo;
    this.userid = userInfo.id;
    let correct_result = this.$store.state.result.correct_result;
    this.pockerNumber = this.$store.state.pockerNumber;
    this.pocker = correct_result.slice(0, this.pockerNumber);
  },
  onShareAppMessage: function (res) {
    return {
      path: "pages/firstPage/main?id=" + this.userid,
      title: "闪视扑克牌，一起来玩吧！",
      success: function () {
        console.log("分享成功");
      },
      error: function () {
        console.log("分享失败");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  text-align: center;
  position: relative;
  height: auto;
  height: tovmin(30);
  display: flex;
  justify-content: space-between;
  margin: 0 15vmin;
}

.container {
  padding-top: tovmin(200);
}

.pocker {
  height: tovmin(382);
  width: tovmin(248);
  position: absolute;
}
.pocker-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  height: 196rpx;
}
</style>
