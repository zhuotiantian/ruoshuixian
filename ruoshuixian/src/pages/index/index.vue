<template>
  <div class="container">
    <div class="btn-group">
      <button class="btn primary" @click="weChetLogin">微信授权登陆</button>
      <button class="btn default" @click="toLogin">账号登陆</button>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {

    },
    methods: {
      weChetLogin: function () {
        this.getLocation();
      },
      getLocation: function (fn) {
        const self = this;
        wx.getLocation({
          type: 'wgs84',
          success(res) {
            const latitude = res.latitude
            const longitude = res.longitude
            const speed = res.speed
            const accuracy = res.accuracy;
            self.getUserInfo();
          }
        })
      },
      getUserInfo: function () {
        const self = this;
        wx.getUserInfo({
          withCredentials: true,
          success: function (res) {
            let {
              userInfo,
              nickName,
              avatarUrl,
              gender,
              province,
              city,
              country
            } = res;
          },
          fail(err) {
            console.log('自动wx.getUserInfo失败:', err);
            // 显示主动授权的button
            self.buttonVisible = true;
          }
        })
      },
      toLogin: function () {
        let url = "../login/main";
        wx.navigateTo({
          url
        })
      }
    }
  }

</script>

<style scoped>
  .container {
    color: #303133;
    font-size: 14px;
    display: flex;
    justify-content: center;
  }

  .btn-group {
    display: flex;
    justify-content: space-between;
    width: 80%;
    position: absolute;
    bottom: 30px;
  }

  .primary {
    background-color: #169bd5;
    color: white;
    font-size: 14px;
  }

  .default {
    padding: 0 15px;
    box-sizing: border-box;
    margin-left: 20px;
    font-size: 14px;
  }

  .btn {
    flex: 1;
  }

</style>
