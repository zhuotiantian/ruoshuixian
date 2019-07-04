<template>
  <div class="container">
    <div class="header">
      <image class="image" src="/static/images/my_image1.png"></image>
      <span style="flex:7">注册/登录</span>
    </div>
    <div class="content">
      <ul>
        <li @click="toStudents">
          <image class="item" src="/static/images/my_icon1.png"></image>
          <span>我的学生</span>
        </li>
        <li @click="work">
          <image class="item" src="/static/images/my_icon2.png"> </image>
          <span>布置作业</span>
        </li>
        <li @click="notice">
          <image class="item" src="/static/images/my_icon3.png"></image>
          <span>发布公告</span>
        </li>
        <li @click="pushMessage">
          <image class="item" src="/static/images/my_icon4.png"></image>
          <span>消息推送</span>
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
      toStudents: function () {
        let url = "../my_teacher/students/main";
        this.to(url)
      },
      work: function () {
        let url = "../my_teacher/work/main";
        this.to(url)
      },
      notice: function () {
        let url = "../my_teacher/notice/main";
        this.to(url)
      },
      pushMessage: function () {
        let url = "../my_teacher/message/main";
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
