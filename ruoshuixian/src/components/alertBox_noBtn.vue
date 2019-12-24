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
  border-radius: tovmin(40);
  height: tovmin(380);
  width: tovmin(680);
  margin: 0 auto;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  z-index: 1002;
  font-size: tovmin(38);
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
  line-height: tovmin(80);
}
.closeBtn {
  position: absolute;
  right: tovmin(-40);
  top: tovmin(-40);
  height: tovmin(36);
  width: tovmin(36);
}
.red {
  color: $red;
  font-size: tovmin(28);
}
</style>
