<template>
  <div class="container">
    <image class="background" :src="'/static/images/firstPage/bg.png'"></image>
    <div class="login-form">
      <div class="input_div">
        <input type="text" class="input" placeholder="请输入手机号" v-model="form.mobile" placeholder-style="color:#ccc" />
        <image :src="'/static/images/my/phone.png'" class="icon" style="height:42rpx;width:34rpx"></image>
      </div>
      <div class="input-div">
        <input type="password" class="input" v-model="form.password" placeholder="密码" placeholder-style="color:#ccc" />
        <image :src="'/static/images/my/password.png'" class="icon" style="height:42rpx;width:34rpx"></image>
      </div>
      <button class="btn submit-btn" @click="login">登 录</button>
      <!-- <span class="info"> -->
      <!-- <span @click="toRepassword">忘记密码</span></span> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      seconds: 60,
      codeLogin: false,
      form: {
        mobile: "",
        password: ""
      },
      code: ""
    };
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data());
  },
  methods: {
    login: function () {
      const {
        mobile,
        password
      } = this.form;
      if (mobile == "") {
        wx.showToast({
          title: "手机号不能为空",
          icon: "none"
        });
        return false;
      }
      if (password == "" && this.codeLogin) {
        wx.showToast({
          title: "密码不能为空",
          icon: "none"
        });
        return false;
      }
      this.$http
        .post({
          url: "/api/wxapp.user/teacherLogin",
          data: {
            mobile,
            password,
          },
          header: {
            token: this.token
          }
        })
        .then(result => {
          if (result.code == 1) {
            this.$store.commit("setUserInfo", result.data.userinfo);
            wx.showToast({
              title: "登陆成功"
            });
            wx.reLaunch({
              url: "/pages/my_teacher/main"
            });
          } else {
            wx.showToast({
              title: result.msg,
              icon: "none"
            });
          }
        });
    },
    toRepassword: function () {
      wx.navigateTo({
        url: "../rePassword/main"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  font-size: tovmin(28);
  position: absolute;
}

.login-form {
  width: 80%;
  height: 50%;
  position: relative;
  transform: translate(13%, 50%);
  text-align: center;
}

.input {
  background-color: white;
  border-radius: tovmin(12);
  height: tovmin(86);
  width: tovmin(530);
  margin-bottom: tovmin(28);
  padding-left: tovmin(70);
  text-align: left;
}

.btn {
  border-radius: tovmin(50);
  margin-top: tovmin(104);
  font-size: tovmin(40);
  height: tovmin(98);
  width: tovmin(530);
  line-height: tovmin(98);
}

.info {
  color: #c0c4cc;
  display: flex;
  justify-content: space-between;
  margin-top: tovmin(24);
}

#info {
  color: $grey-background;
  position: absolute;
  bottom: tovmin(74);
  text-align: center;
  width: 100%;
}

.getCode {
  font-size: 3.46667vmin;
  position: absolute;
  right: 1.33333vmin;
  top: 0;
  color: #ccc;
  z-index: 30;
  height: 47px;
  line-height: 47px;
}

.background {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -6;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.icon {
  position: absolute;
  top: tovmin(20);
  left: tovmin(20);
}

.input-div {
  position: relative;
}

form {
  display: flex;
  justify-content: center;
}
</style>