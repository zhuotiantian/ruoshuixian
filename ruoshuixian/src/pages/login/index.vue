<template>
  <div class="container">
    <div class="login-form">
      <div class="input-wrapper">
        <input type="text" class="input" placeholder="请输入手机号" />
        <i class="icon" style="background-image:url('../../../static/style/phone.svg')"></i>
        <template v-if="!codeLogin">
          <span class="getCode" @click="getCode" v-if="!clickGetCode">获取验证码</span>
          <span class="getCode" style="color:#c0c4cc" v-else>{{seconds}}s后重新获取</span>
        </template>
      </div>
      <div class="input-wrapper" v-if="codeLogin">
        <input type="text" class="input" placeholder="密码" />
        <i class="icon" style="background-image:url('../../../static/style/password.svg')"></i>
      </div>
      <div class="input-wrapper" v-else>
        <input type="text" class="input" placeholder="验证码" />
        <i class="icon" style="background-image:url('../../../static/style/key.svg')"></i>
      </div>
      <button class="btn">
        <h3>登 录</h3>
      </button>
      <p class="info">
        <span @click="switchLoginWay">
          <span v-if="!codeLogin">密码登陆</span><span v-else>验证码登陆</span>
        </span>
        <span>忘记密码</span></p>
      <p id="info">还没有若水轩账号？<span style="color:#f8b551" @click="toRegist">立即注册</span></p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        clickGetCode: false,
        seconds: 60,
        codeLogin: false,
      }
    },
    methods: {
      // 跳转到注册页面
      toRegist: function () {
        let url = "../regist/main";
        wx.navigateTo({
          url
        })
      },
      // 获取验证码
      getCode: function () {
        this.clickGetCode = true;
        this.timer = setInterval(() => {
          this.seconds--;
          if (this.seconds == 0) {
            clearInterval(this.timer);
            this.clickGetCode = false;
            this.seconds = 60;
          }
        }, 1000);
      },
      switchLoginWay: function () {
        this.codeLogin = !this.codeLogin;
        clearInterval(this.timer);
        this.clickGetCode = false;
        this.seconds = 60;
      }
    }
  };

</script>
<style scoped>
  .container {
    background-image: url("../../../static/images/1.jpg");
    height: 100%;
    width: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .login-form {
    width: 80%;
    height: 50%;
    position: relative;
    transform: translate(13%, 50%);
  }

  .input-wrapper {
    margin-bottom: 15px;
    position: relative;
  }

  .input {
    color: #c0c4cc;
    background-color: white;
    border-radius: 8px;
    height: 40px;
    padding-left: 40px;
    padding-right: 100px;
  }

  .btn {
    border-radius: 30px;
    margin-top: 40px;
    font-size: 18px;
  }

  .info {
    color: #C0C4CC;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  #info {
    color: #C0C4CC;
    position: absolute;
    bottom: -15px;
    text-align: center;
    width: 100%;
  }

  .icon {
    height: 50rpx;
    width: 50rpx;
    background-size: 100%;
    top: 8px;
    left: 8px;
  }

  .getCode {
    font-size: 12px;
    position: absolute;
    right: 5px;
    top: 13px;
    color: #606266;
  }

</style>
