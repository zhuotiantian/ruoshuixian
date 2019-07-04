<template>
  <ul class="footer">
    <li @click="toFisrstPage">
      <image class="icon" src="/static/images/icon5.png"></image>
      <span>首页</span>
    </li>
    <li @click="toMoney">
      <image class="icon" src="/static/images/icon6.png"></image><span>红包</span>
    </li>
    <li @click="toRecord">
      <image class="icon" src="/static/images/icon7.png"></image><span>打卡</span>
    </li>
    <li @click="toMy">
      <image class="icon" src="/static/images/icon8.png"></image><span>我的</span>
    </li>
  </ul>
</template>
<script>
  export default {
    methods: {
      toFisrstPage: function () {
        let url = "../firstPage/main";
        this.to(url)
      },
      toMoney: function () {
        let url = "../hongbao/main";
        this.to(url)

      },
      toRecord: function () {
        let url = "../record/main";
        this.to(url)

      },
      toMy: function () {
        let url = "../my/main";
        this.to(url)
      },
      to: function (url) {
        wx.navigateTo({
          url
        })
      }
    }

  }

</script>
<style scoped>
  .footer {
    position: absolute;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: #092657;
  }

  .footer li {
    flex: 1;
    text-align: center;
    height: 50px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .icon {
    height: 25px;
    width: 25px;
  }

</style>
