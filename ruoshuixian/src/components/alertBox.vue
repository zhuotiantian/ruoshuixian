<template>
  <div class="alertBox">
    <p>{{text}}</p>
    <p>
      <span @click="confirm">确认</span>
      <span class="red" @click="cancle">取消</span>
    </p>
  </div>
</template>
<script>
  export default {
    props: ["text"],
    data() {
      return {
        text: ""
      }
    },
    methods: {
      cancle: function () {
        this.$emit("hideFog");
      },
      confirm: function () {
        this.$emit("confirm");
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
    position: absolute;
    top: 50%;
    margin-top: tovmin(-149);
    left: 50%;
    margin-left: tovmin(-271);
    z-index: 1002;
    color: $black;
  }

  .alertBox p:first-child {
    height: tovmin(220);
    line-height: tovmin(220);
    border-bottom: tovmin(2) solid $border;
  }

  .alertBox p {
    text-align: center;
  }

  .alertBox p:last-child {
    display: flex;
    height: calc(100% - 106rpx);
    align-items: center;
  }

  .alertBox p:last-child span {
    flex: 1;
    height: 100%;
    line-height: tovmin(70);

  }

  .alertBox p:last-child span:first-child {
    border-right: tovmin(2) solid $border;
  }

  .red {

    color: $red;
  }

</style>
