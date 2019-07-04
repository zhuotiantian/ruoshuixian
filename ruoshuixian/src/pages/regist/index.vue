<template>
  <div class="container">
    <div class="login-form">
      <div class="input-wrapper">
        <input type="text" class="input" placeholder="请输入手机号" />
        <i class="icon" style="background-image:url('../../../static/style/phone.svg')"></i>
      </div>
      <div class="input-wrapper">
        <input type="text" class="input" placeholder="验证码" />
        <i class="icon" style="background-image:url('../../../static/style/key.svg')"></i>
        <span class="getCode" @click="getCode" v-if="!clickGetCode">获取验证码</span>
        <span class="getCode" style="color:#c0c4cc" v-else>{{seconds}}s后重新获取</span>
      </div>
      <div class="input-wrapper">
        <input type="text" class="input" placeholder="密码" />
        <i class="icon" style="background-image:url('../../../static/style/password.svg')"></i>
      </div>
      <div class="input-wrapper">
        <input type="text" class="input" placeholder="确认密码" />
        <i class="icon" style="background-image:url('../../../static/style/password.svg')"></i>
      </div>
      <button class="btn">
        <h3>注 册</h3>
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        clickGetCode: false,
        seconds: 60,
      }
    },
    methods: {
      // 获取验证码
      getCode: function () {
        this.clickGetCode = true;
        this.timer = setInterval(() => {
          this.seconds--;
          if (this.seconds == 0) {
            clearInterval(this.timer);
            this.clickGetCode = false;
          }
        }, 1000);
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
  }

  .btn {
    border-radius: 30px;
    margin-top: 40px;
    background-color: #f8b551;
    font-size: 18px;
  }

  .icon {
    display: inline-block;
    height: 50rpx;
    width: 50rpx;
    background-size: 100%;
    position: absolute;
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
