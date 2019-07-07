<template>
  <div class="container">
    <p @click="toTips"><span>提醒学生作业打卡</span><span>></span></p>
    <p @click="toOther"><span>其他消息推送</span><span>></span></p>
  </div>
</template>
<script>
  export default {
    methods: {
      toTips: function () {
        wx.navigateTo({
          url: "./toRecord/main"
        })
      },
      toOther: function () {
        wx.navigateTo({
          url: "./other/main"
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .container {
    position: absolute;
    height: 100%;
    width: 100%;
    background: $grey-background;

  }

  p {
    display: flex;
    background: white;
    justify-content: space-between;
    height: tovmin(108);
    border-radius: tovmin(6);
    margin-bottom: tovmin(30);
    align-items: center;
    padding: 0 tovmin(30);
    margin: tovmin(40);
    font-size: tovmin(28);
  }

</style>
