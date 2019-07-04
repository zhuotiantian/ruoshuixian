<template>
  <div class="container">
    <div class="header">
      <image class="image" src="/static/images/my_image1.png"></image>
      <span style="flex:7">注册/登录</span>
    </div>
    <div class="content">
      <ul>
        <li @click="toRanking">
          <image class="item" src="/static/images/my_icon1.png"></image>
          <span>排行榜</span>
        </li>
        <li>
          <image class="item" src="/static/images/my_icon2.png"> </image>
          <span>分享邀请</span>
        </li>
        <li @click="toHongbao">
          <image class="item" src="/static/images/my_icon3.png"></image>
          <span>红包</span>
        </li>
        <li @click="toRecord">
          <image class="item" src="/static/images/my_icon4.png"></image>
          <span>我的记录</span>
        </li>
        <li @click="toMessage">
          <image class="item" src="/static/images/my_icon5.png"></image>
          <span class="last">我的消息</span>
        </li>
      </ul>
    </div>
    <CardFooter></CardFooter>
  </div>
</template>
<script>
  import CardFooter from "../../components/footer"
  export default {
    components: {
      CardFooter
    },
    methods: {
      toRanking: function () {
        let url = "../my/ranking_not/main";
        this.to(url)
      },
      toHongbao: function () {
        let url = "../my/hongbao/main";
        this.to(url)
      },
      toRecord: function () {
        let url = "../my/record/main";
        this.to(url)
      },
      toMessage: function () {
        let url = "../my/message/main";
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
  .header {
    height: 90px;
    background: #173771;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }

  .image {
    height: 90px;
    width: 90px;
    flex: 2;
  }

  .content {
    padding: 15px;
  }

  .content ul li {
    display: flex;
    justify-content: center;
    height: 60px;
    font-size: 16px;
    align-items: center;
    line-height: 60px;

  }

  .item {
    flex: 1;
    height: 40px;
    width: 30px;
  }

  .content ul li span {
    flex: 7;
    border-bottom: 1px solid #E4E7ED;
  }

  .last {
    border-bottom: none !important;
  }

</style>
