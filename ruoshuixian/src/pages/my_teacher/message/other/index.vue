<template>
  <div class="container">
    <textarea name="" id="" cols="30" rows="10" placeholder="输入推送消息"></textarea>
    <button class="yellow_btn" @click="sendMessage">发送</button>
    <div class="fog" v-if="showSuccessBox"></div>
    <div class="alertBox" v-if="showSuccessBox">
      <image class="image" src="/static/images/my_teacher_image5.png"></image>
      <span>发送成功</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showSuccessBox: false,
      }
    },
    methods: {
      sendMessage: function () {
        this.showSuccessBox = true;
        setTimeout(() => {
          this.showSuccessBox = false;
        }, 1500);
      }
    }
  }

</script>
<style scoped>
  textarea {
    border: 1px solid #E4E7ED;
    background: #fcfcfc;
    border-radius: 4px;
    width: 100%;
    padding: 5px 8px;
    box-sizing: border-box;
    margin-bottom: 15px;
  }

  .btn {
    background-color: #ffc400;
    width: 40%;
    border-radius: 30px;
    border: 1px solid transparent;
    font-size: 14px;
  }

  .image {
    width: 50px;
    height: 40px;
  }

  .alertBox {
    background: white;
    display: flex;
    flex-direction: column;
    height: 100px;
    width: 100px;
    border-radius: 8px;
    position: relative;
    z-index: 102;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

</style>
