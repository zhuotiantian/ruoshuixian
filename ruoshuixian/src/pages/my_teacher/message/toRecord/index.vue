<template>
  <div class="container">
    <div class="item">
      <p class="title"><span>作业名称</span><span class="remind active">提醒打卡</span></p>
      <p style="margin-bottom:15px"><span class="work-item">随机词语</span><span class="work-item">抽象图形</span><span
          class="work-item">人名头像</span></p>
      <textarea name="" id="" cols="30" rows="10" placeholder="备注文案"></textarea>
    </div>
    <div class="item">
      <p class="title"><span>作业名称</span><span class="remind">已提醒</span></p>
      <p style="margin-bottom:15px"><span class="work-item">随机词语</span><span class="work-item">抽象图形</span><span
          class="work-item">人名头像</span></p>
      <textarea name="" id="" cols="30" rows="10" placeholder="备注文案"></textarea>
    </div>
  </div>
</template>
<script>
  export default {

  }

</script>
<style lang="scss" scoped>
  .container {
    position: absolute;
    height: 100%;
    width: 100%;
    background: $grey-background;
  }

  .item {
    padding: tovmin(30);
    box-sizing: content-box;
    background: white;
    border-radius: tovmin(6);
    margin: tovmin(30) tovmin(40);
    height: tovmin(396);
  }

  .title {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: tovmin(20);
  }

  .remind {
    font-size: tovmin(24);
    display: inline-block;
    height: tovmin(48);
    width: tovmin(108);
    line-height: tovmin(48);
    text-align: center;
    border-radius: tovmin(6);
    position: absolute;
    right: tovmin(-30);
    background: #ebebeb;
  }

  .remind.active {
    background: $yellow;
  }

  .work-item {
    font-size: tovmin(26);
    color: white;
    background: $middle-blue;
    display: inline-block;
    padding: tovmin(4) tovmin(18);
    border-radius: tovmin(44);
    margin-right: tovmin(20);
  }

  textarea {
    border: tovmin(2) solid #F6F6F6;
    background: $grey-background;
    border-radius: tovmin(12);
    width: 100%;
    padding: tovmin(10) tovmin(18);
    box-sizing: border-box;
    font-size: tovmin(26);
  }

</style>
