<template>
  <div class="alertBox">
    <image src="/static/images/firstPage/close.png" class="closeBtn" @click="close"></image>
    <h1>游戏规则</h1>
    <p v-for="(item,index) in rule" :key="index">{{index+1}}、{{item}}</p>
    <p class="red">详情见左上角帮助</p>
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
  background: white;
  border-radius: tovmin(14);
  height: tovmin(298);
  width: tovmin(542);
  margin: 0 auto;
  position: fixed;
  top: 50%;
  margin-top: tovmin(-149);
  left: 50%;
  margin-left: tovmin(-271);
  z-index: 1002;
  color: $black;
}
.closeBtn {
  position: absolute;
  right: -35rpx;
  top: -31rpx;
  height: 40rpx;
  width: 40rpx;
}
.red {
  color: $red;
}
</style>
