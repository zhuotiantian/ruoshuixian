<template>
  <div class="container">
    <div class="header">
      <span :class="{active:active=='打卡记录'}" @click="active='打卡记录'">打卡记录</span>
      <span :class="{active:active=='成绩记录'}" @click="active='成绩记录'">成绩记录</span>
    </div>
    <div class="content">
      <ul class="list" v-if="active=='打卡记录'">
        <li>
          <span>2019.1.25</span>
          <span>打卡成功</span>
        </li>
        <li>
          <span>2019.1.25</span>
          <span>打卡成功</span>
        </li>
        <li>
          <span>2019.1.25</span>
          <span>打卡成功</span>
        </li>
        <li>
          <span>2019.1.25</span>
          <span>打卡成功</span>
        </li>
        <li>
          <span>2019.1.25</span>
          <span>打卡成功</span>
        </li>
        <li>
          <span>2019.1.25</span>
          <span>打卡成功</span>
        </li>
      </ul>
      <ul class="list" v-else>
        <li>
          <span>2019.1.25</span>
          <span>
            <span>66</span>
            <span>
              <image class="image" src="/static/images/share.png"></image>
            </span>
            <span>分享</span>
          </span>
        </li>
        <li>
          <span>2019.1.25</span>
          <span>
            <span>66</span>
            <span>
              <image class="image" src="/static/images/share.png"></image>
            </span>
            <span>分享</span>
          </span>
        </li>
        <li>
          <span>2019.1.25</span>
          <span>
            <span>66</span>
            <span>
              <image class="image" src="/static/images/share.png"></image>
            </span>
            <span>分享</span>
          </span>
        </li>
        <li>
          <span>2019.1.25</span>
          <span>
            <span>66</span>
            <span>
              <image class="image" src="/static/images/share.png"></image>
            </span>
            <span>分享</span>
          </span>
        </li>
        <li>
          <span>2019.1.25</span>
          <span>
            <span>66</span>
            <span>
              <image class="image" src="/static/images/share.png"></image>
            </span>
            <span>分享</span>
          </span>
        </li>
        <li>
          <span>2019.1.25</span>
          <span>
            <span>66</span>
            <span>
              <image class="image" src="/static/images/share.png"></image>
            </span>
            <span>分享</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: "打卡记录"
      }
    }
  }

</script>

<style scoped>
  .container {
    height: 100%;
  }

  .content {
    padding: 15px;
    background: #f7f7f7;
    height: calc(100% - 90px);
  }

  .header {
    height: 60px;
    background: #173771;
    display: flex;
    justify-content: center;
    color: white;
    align-items: center;
  }

  .header span {
    flex: 1;
    text-align: center;
  }

  .header span.active {
    color: #24bcff;
    position: relative;
  }

  .header span.active::after {
    content: "";
    height: 0px;
    width: 0px;
    border-color: transparent transparent white transparent;
    border-style: dashed dashed solid dashed;
    border-width: 10px;
    position: absolute;
    top: 20px;
    right: 45%;
  }

  .list {
    background: white;
    padding: 15px;
    height: calc(100% - 30px);
  }

  .list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #E4E7ED;
  }

  .list li:last-child {
    border-bottom: none;
  }

  .list li>span {
    flex: 6;
  }

  .list li>span:last-child {
    text-align: right;
  }

  .list li>span:last-child span:first-child {
    margin-right: 5px;
  }

  .image {
    width: 22px;
    height: 22px;
    vertical-align: middle;
  }

</style>
