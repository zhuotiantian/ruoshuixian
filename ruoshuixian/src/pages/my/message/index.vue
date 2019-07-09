<template>
  <div class="container">
    <div class="item">
      <p class="header">
        <span>公告</span>
        <span>2019-05-07</span>
      </p>
      <span class="text">
        该项活动暂时还未启动，具体的领取规则淘宝也并没有公布。借鉴以往的活动经验，可以猜想12月12日当天的整点，平台和店铺会限量派发红包优惠券，需要大家拼手气和网速争抢获取
      </span>
    </div>
    <div class="item">
      <p class="header">
        <span>点评</span>
        <span>2019-05-07</span>
      </p>
      <span class="text">
        该项活动暂时还未启动，具体的领取规则淘宝也并没有公布。借鉴以往的活动经验，可以猜想12月12日当天的整点，平台和店铺会限量派发红包优惠券，需要大家拼手气和网速争抢获取
      </span>
    </div>
  </div>
</template>
<script>
  export default {

  }

</script>
<style lang="scss" scoped>
  .container {
    padding: tovmin(30);
    background: white;
    position: absolute;
    height: calc(100% - 60rpx);
  }

  .text {
    color: #999999;
    font-size: tovmin(24);
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: tovmin(30);
    font-size: tovmin(26);

  }

  .header>span {
    flex: 1;
  }

  .header>span:last-child {
    text-align: right;
  }

  .item {
    padding: tovmin(30);
    border: 1px solid $border;
    border-radius: tovmin(12);
    margin-bottom: tovmin(30);
  }

</style>
