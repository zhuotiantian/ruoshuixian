<template>
  <div class="container" v-if="ratio">
    <div class="header">
      <div class="userImage">
        <image class="image" :src="'/static/images/my/my_icon1@'+ratio+'x.png'"></image>
      </div>
      <span style="flex:7">注册/登录</span>
    </div>
    <div class="content">
      <ul>
        <li @click="toStudent">
          <image class="item item1" :src="'/static/images/my/my_icon7@'+ratio+'x.png'">
          </image>
          <span>我的学生</span>
        </li>
        <li @click="toWork">
          <image class="item" style="height:42rpx;width:42rpx;" :src="'/static/images/my/my_icon8@'+ratio+'x.png'">
          </image>
          <span>布置作业</span>
        </li>
        <li @click="toNotice">
          <image class="item" style="height:44rpx;width:44rpx;" :src="'/static/images/my/my_icon9@'+ratio+'x.png'">
          </image>
          <span>发布公告</span>
        </li>
        <li @click="toPushMessage">
          <image class="item" style="height:44rpx;width:46rpx;" :src="'/static/images/my/my_icon10@'+ratio+'x.png'">
          </image>
          <span class="last">消息推送</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    mounted() {
      this.ratio = this.globalData.ratio;
    },
    data() {
      return {
        ratio: 1
      }
    },
    methods: {
      toStudent: function () {
        let url = "./students/main";
        this.to(url)
      },
      toWork: function () {
        let url = "./work/main";
        this.to(url)
      },
      toNotice: function () {
        let url = "./notice/main";
        this.to(url)
      },
      toPushMessage: function () {
        let url = "./message/main";
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
<style lang="scss" scoped>
  .userImage {
    height: tovmin(120);
    width: tovmin(120);
    background: $grey-background;
    border-radius: tovmin(120);
    text-align: center;
    margin-right: tovmin(22);
  }

  .userImage .image {
    position: relative;
    top: 50%;
    margin-top: tovmin(-40)
  }

  .container {
    background: $grey-background;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .header {
    height: tovmin(250);
    background: $deep-blue;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: tovmin(34);
    padding: 0 tovmin(32);
  }

  .image {
    height: tovmin(84);
    width: tovmin(78);
  }

  .content {
    padding: tovmin(30);
  }

  .content ul li {
    display: flex;
    justify-content: center;
    height: tovmin(120);
    font-size: tovmin(32);
    align-items: center;
    line-height: tovmin(120);

  }

  .item {
    margin-right: tovmin(38);
  }

  .item1 {
    height: tovmin(42);
    width: tovmin(48);
  }

  .content ul li span {
    flex: 7;
    border-bottom: tovmin(2) solid #E4E7ED;
  }

  .last {
    border-bottom: none !important;
  }

</style>
