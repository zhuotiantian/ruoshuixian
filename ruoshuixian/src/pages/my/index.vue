<template>
  <div class="container">
    <div class="header">
      <div class="userImage">
        <image class="image" :src="userInfo.avatar"></image>
      </div>
      <div>
        <p v-if="userInfo.nickname == null">未登录</p>
        <template v-else>
          <p>{{ userInfo.nickname }}</p>
          <p>{{ userInfo.mobile }}</p>
        </template>
      </div>
    </div>
    <div class="content">
      <ul>
        <li @click="toRanking">
          <image class="item" style="height:22px;width:21px;" :src="'/static/images/my/my_icon2.png'"> </image>
          <span>排行榜</span>
        </li>
        <button open-type="share">
          <li>
            <image class="item" style="height:20px;width:23px;" :src="'/static/images/my/my_icon3.png'"> </image>
            <span>分享邀请</span>
          </li>
        </button>
        <li @click="toRecord">
          <image class="item" style="height:24px;width:19px;" :src="'/static/images/my/my_icon4.png'"> </image>
          <span>我的记录</span>
        </li>
        <li @click="toMessage">
          <image class="item" style="height:22px;width:23px;" :src="'/static/images/my/my_icon5.png'"> 、</image>
          <span class="last">我的消息</span>
        </li>
      </ul>
    </div>
    <CardFooter :index="4"></CardFooter>
  </div>
</template>
<script>
import CardFooter from "@/components/footer";
export default {
  components: {
    CardFooter
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data());
    let userInfo = this.$store.state.userInfo;
    if (userInfo) {
      this.userInfo = userInfo;
      this.token = userInfo.token;
      this.userid = userInfo.id;
    } else {
      let that = this;
      wx.login({
        success: function(res) {
          that.$http
            .post({
              url: "/api/wxapp.user/login",
              data: {
                code: res.code,
                type: "user"
              }
            })
            .then(result => {
              if (typeof result.data.userInfo !== "object" || !result.data) {
                wx.showToast({
                  title: result.msg,
                  icon: "none"
                });
                wx.navigateTo({
                  url: "/pages/auth/main?inviterid=" + that.inviter_id
                });
              } else {
                that.$store.commit("setUserInfo", result.data.userInfo);
                that.userInfo = result.data.userInfo;
              }
            });
        }
      });
    }
  },
  data() {
    return {
      userInfo: {},
      domain: this.$http.domain,
      icon: "",
      mobile: "",
      userid: null,
      code: null
    };
  },
  onShareAppMessage: function(res) {
    let path = "pages/firstPage/main?id=" + this.userid;
    return {
      title: "11种脑力游戏，一起来玩吧！",
      path: path,
      success: function() {
        console.log("分享成功");
      },
      error: function() {
        console.log("分享失败");
      }
    };
  },
  onShow() {
    wx.hideTabBar();
  },
  methods: {
    getData: function() {
      this.$http
        .get({
          url: "/api/wxapp.user/index",
          header: {
            token: this.token
          }
        })
        .then(result => {
          if (result.code == 1) {
            this.mobile = result.data.mobile;
          }
        });
    },
    toRanking: function() {
      let url = "./ranking/main";
      this.to(url);
    },
    toHongbao: function() {
      let url = "./hongbao/main";
      this.to(url);
    },
    toRecord: function() {
      let url = "./record/main";
      this.to(url);
    },
    toMessage: function() {
      let url = "./message/main";
      this.to(url);
    },
    to: function(url) {
      wx.navigateTo({
        url
      });
    }
  }
};
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
  // height: tovmin(44);
  // width: tovmin(42);
  margin-right: tovmin(38);
}

.content ul li span {
  flex: 7;
  border-bottom: tovmin(2) solid #e4e7ed;
}

.last {
  border-bottom: none !important;
}

button::after {
  border: none;
}

button {
  background-color: transparent;
  font-size: tovmin(28);
  padding: 0;
  text-align: left;
  color: black;
}

button image {
  margin-bottom: 0;
}
</style>
