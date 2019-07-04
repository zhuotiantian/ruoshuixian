<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <image src="/static/images/top.png" class="top-image"></image>
      </div>
      <div class="middle">
        <ul>
          <li>
            <image class="icon" src="/static/images/icon1.png"></image>
            <span class="flex-span">排行榜</span>

          </li>
          <li>
            <image class="icon" src="/static/images/icon2.png"></image>
            <span class="flex-span">红包</span>
          </li>
          <li>
            <image class="icon" src="/static/images/icon4.png"></image>
            <span class="flex-span">分享</span>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <ul>
          <li @click="toGame1">
            <image class="item" src="/static/images/1.png"></image>
          </li>
          <li>
            <image class="item" src="/static/images/2.png"></image>
          </li>
          <li>
            <image class="item" src="/static/images/3.png"></image>
          </li>
          <li>
            <image class="item" src="/static/images/4.png"></image>
          </li>
          <li>
            <image class="item" src="/static/images/5.png"></image>
          </li>
          <li>
            <image class="item" src="/static/images/6.png"></image>
          </li>
          <li>
            <image class="item" src="/static/images/7.png"></image>
          </li>
          <li>
            <image class="item" src="/static/images/8.png"></image>
          </li>
          <li>
            <image class="item" src="/static/images/9.png"></image>
          </li>
          <li>
            <image class="item" src="/static/images/10.png"></image>
          </li>
          <li @click="toVirtualEvents">
            <image class="item" src="/static/images/11.png"></image>
          </li>
        </ul>
      </div>
    </div>
    <CardFooter></CardFooter>
  </div>
</template>
<script>
  import CardFooter from "../../components/footer"
  export default {
    components: {
      CardFooter,

    },
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      toVirtualEvents: function () {
        let url = "../firstPage/virtualEvents/main";
        this.to(url);
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
  .container {
    height: 100%;
    width: 100%;
    background: #183973;
    padding: 0;
  }

  .content {
    padding: 15px;
    display: grid;
    grid-template-rows: 130px 80px auto;
    grid-template-columns: 100%;
    grid-gap: 15px;
    height: calc(100% - 80px);
  }

  .top-image {
    width: 100%;
    height: 100%;
  }

  .middle ul {
    display: flex;
    width: 100%;
    color: #303133;
    background: white;
    height: 100%;
    border-radius: 8px;
    justify-content: center;
    align-items: center;

  }

  .middle ul li {
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .icon {
    height: 30px;
    width: 30px;
    background-repeat: no-repeat;
  }

  .flex-span {
    flex: 1;
  }

  .item {
    height: 100%;
    width: 100%;
  }

  .bottom {
    color: white;
    width: 100%;
    font-size: 10px;
  }

  .bottom ul {
    display: grid;
    grid-template-columns: 22% 22% 22% 22%;
    grid-template-rows: 30% 30% 30%;
    justify-content: center;
    align-items: center;
    grid-gap: 15px;
    height: 100%;
  }

  .bottom ul li {
    display: flex;
    flex-direction: column;
    background: white;
    color: #303133;
    text-align: center;
    height: 100%;
    border-radius: 4px;
    border: 2px solid #303133
  }

</style>
