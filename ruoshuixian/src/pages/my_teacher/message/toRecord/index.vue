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
<style scoped>
  .item {
    padding: 15px;
    width: calc(100% - 30px);
    background: white;
    border-radius: 4px;
    margin-bottom: 15px;
  }

  .title {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 10px;
  }

  .remind {
    font-size: 12px;
    display: inline-block;
    height: 23px;
    width: 60px;
    line-height: 23px;
    text-align: center;
    border-radius: 3px;
    position: absolute;
    right: -15px;
    background: #ebebeb;
    color: #606266;
  }

  .remind.active {
    background: #ffc400;

  }

  .work-item {
    font-size: 12px;
    color: white;
    background: #24bcff;
    display: inline-block;
    padding: 3px 6px;
    border-radius: 15px;
    margin-right: 12px;
  }

  textarea {
    border: 1px solid #E4E7ED;
    background: #fcfcfc;
    border-radius: 4px;
    width: 100%;
    padding: 5px 8px;
    box-sizing: border-box;
  }

</style>
