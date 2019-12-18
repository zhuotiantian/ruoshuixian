<template>
  <div class="alertBox">
    <div class="wrapper">
      <image src="/static/images/firstPage/guanbi.png" class="closeBtn" @click="close"></image>
      <h1>游戏规则</h1>
      <p v-for="(item,index) in rule" :key="index">{{index+1}}、{{item}}</p>
      <p class="red">(详情见左上角帮助)</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["rule"],
  data () {
    return {
      show: false,
    }
  },
  methods: {
    close: function () {
      this.$emit("closeAlertBox");
    }
  }
}

</script>
<style lang="scss" scoped>
.alertBox {
  background: $yellow;
  border-radius: 20rpx;
  height: 190rpx;
  width: 340rpx;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  z-index: 1002;
  font-size: 18rpx;
  color: #3e3e3e;
}
.alertBox > .wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}
.alertBox > .wrapper > h1,
.alertBox > .wrapper > p {
  line-height: 40rpx;
}
.closeBtn {
  position: absolute;
  right: -20rpx;
  top: -20rpx;
  height: 18rpx;
  width: 18rpx;
}
.red {
  color: $red;
  font-size: 14rpx;
}
</style>
