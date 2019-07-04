<template>
  <div class="container">
    <div class="content">
      <image class="image" src="/static/images/recode_image1.png"></image>
      <p class="p">这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录
      </p>
      <image class="image" src="/static/images/recode_image2.png"></image>
      <p class="p">这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录
      </p>
    </div>
    <CardFooter></CardFooter>
  </div>
</template>
<script>
  import CardFooter from "../../components/footer"
  export default {
    components: {
      CardFooter
    }
  }

</script>

<style scoped>
  .content {
    padding: 15px;
  }

  .image {
    height: 130px;
    width: 100%;
    margin: 15px 0;
  }

  .p {
    color: #909399
  }

</style>
