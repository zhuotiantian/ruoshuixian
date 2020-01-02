<template>
  <div class="container">
    <div class="header">
      <div class="userImage">
        <image class="image" :src="userInfo.avatar"></image>
      </div>
      <div>
        <p v-if="!userInfo.nickname">未登录</p>
        <template v-else>
          <p>{{userInfo.nickname}}</p>
          <p>{{userInfo.mobile}}</p>
        </template>
      </div>
      <span class="toLogin" @click="backLogin">退出登录</span>
    </div>
    <div class="content">
      <ul>
        <li @click="toStudent">
          <image class="item item1" :src="'/static/images/my/my_icon7.png'">
          </image>
          <span>我的学生</span>
        </li>
        <li @click="toWork">
          <image class="item" style="height:42rpx;width:42rpx;" :src="'/static/images/my/my_icon8.png'">
          </image>
          <span>布置作业</span>
        </li>
        <li @click="toNotice">
          <image class="item" style="height:44rpx;width:44rpx;" :src="'/static/images/my/my_icon9.png'">
          </image>
          <span>发布公告</span>
        </li>
        <li @click="toPushMessage">
          <image class="item" style="height:44rpx;width:46rpx;" :src="'/static/images/my/my_icon10.png'">
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
  onLoad () {
    Object.assign(this.$data, this.$options.data());
  },
  onShow () {
    let userInfo = this.$store.state.userInfo;
    if (userInfo) {
      this.token = userInfo.token;
      this.userInfo = userInfo;
      this.getData();
    } else {
      let that = this;
      wx.reLaunch({
        url: "/pages/login/main"
      });
    }
  },
  data () {
    return {

      domain: this.$http.domain,
      userInfo: {},
      mobile: ""
    }
  },
  methods: {
    backLogin: function () {
      wx.redirectTo({
        url: "/pages/login/main"
      });
    },
    getData: function () {
      this.$http.get({
        url: "/api/wxapp.user/index",
        header: {
          token: this.token
        }
      }).then(result => {
        if (result.code == 1) {
          this.mobile = result.data.mobile;

        }
      })
    },
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
.toLogin {
  font-size: tovmin(60);
  position: absolute;
  right: tovmin(60);
}
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
  margin-top: tovmin(-60);
  width: 100%;
  height: 100%;
  border-radius: 50%;
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
  border-bottom: tovmin(2) solid #e4e7ed;
}

.last {
  border-bottom: none !important;
}
</style>
