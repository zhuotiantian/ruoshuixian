<template>
  <div>
    <div class="content">
      <h3>红包领取规则</h3>
      <p>该项活动暂时还未启动，具体的领取规则淘宝也并没有公布。借鉴以往的活动经验，可以猜想12月12日当天的整点，平台和店铺会限量派发红包优惠券，需要大家拼手气和网速争抢获取</p>
      <image class="image" src="/static/images/money_image1.png" @click="getMoney"></image>
      <image class="image" src="/static/images/money_image2.png"></image>
    </div>
    <div class="fog" v-if="showFog"></div>
    <image class="image1" src="/static/images/money_image3.png" v-if="showFog"></image>
    <image class="image2" src="/static/images/money_image4.png" v-if="showFog" @click="hideFog"></image>
    <CardFooter></CardFooter>
  </div>
</template>
<script>
  import CardFooter from "../../components/footer"
  export default {
    data() {
      return {
        showFog: false
      }
    },
    components: {
      CardFooter
    },
    methods: {
      getMoney: function () {
        this.showFog = true;
      },
      hideFog: function () {
        this.showFog = false;
      }
    }
  }

</script>
<style scoped>
  .content {
    padding: 15px;
  }

  p {
    margin-top: 10px;
    color: #909399
  }

  .image {
    width: 100%;
    height: 120px;
  }

  .fog {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #636363;
    opacity: 0.8;
    z-index: 1000;
  }

  .image1 {
    position: absolute;
    z-index: 1001;
    width: 200px;
    height: 226px;
    margin-top: -113px;
    top: 30%;
    margin-left: -100px;
    left: 50%;
  }

  .image2 {
    position: absolute;
    z-index: 1001;
    width: 30px;
    height: 30px;
    margin-top: -15px;
    top: 55%;
    margin-left: -15px;
    left: 50%;
  }

</style>
