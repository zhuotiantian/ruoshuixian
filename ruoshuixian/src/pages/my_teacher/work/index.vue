<template>
  <div class="container">
    <div class="fog" v-if="showDrop" @click="showDrop=false"></div>
    <div class="top">
      <input placeholder-style="color: #AFAFAF;" type="text" placeholder="请输入作业名称">
      <p class="item" @click="showDrop=true">组别</p>
      <p class="item">学生</p>
    </div>
    <div class="middle">
      <p class="title">选择游戏：</p>
      <ul class="gameList">
        <li>
          <em class="checkBox active"></em>
          <span>闪现扑克牌</span>
        </li>
        <li>
          <em class="checkBox"></em>
          <span>快速扑克牌</span>
        </li>
        <li>
          <em class="checkBox"></em>
          <span>二进制数字</span>
        </li>
        <li>
          <em class="checkBox"></em>
          <span>快速数字</span>
        </li>
        <li>
          <em class="checkBox"></em>
          <span>马拉松扑克牌</span>
        </li>
        <li>
          <em class="checkBox"></em>
          <span>马拉松数字</span>
        </li>
        <li>
          <em class="checkBox"></em>
          <span>随机词语</span>
        </li>
        <li>
          <em class="checkBox"></em>
          <span>人名头像</span>
        </li>
        <li>
          <em class="checkBox"></em>
          <span>抽象图形</span>
        </li>
        <li>
          <em class="checkBox"></em>
          <span>听记数字</span>
        </li>
        <li>
          <em class="checkBox"></em>
          <span style="font-size:12px">虚拟事件和日期</span>
        </li>
      </ul>
    </div>
    <textarea name="" id="" cols="30" rows="10" placeholder="备注"></textarea>
    <button class="yellow_btn" @click="sendMessage">发送</button>
    <div :class="{drop_up:true,up:showDrop,down:!showDrop}">
      <p class="title">组别选择</p>
      <scroll-view :style="{'height': '193px'}" scroll-y="true">
        <ul class="list">
          <li>一组</li>
          <li>两组</li>
          <li>三组</li>
          <li>四组</li>
          <li>四组</li>
          <li>四组</li>
        </ul>
      </scroll-view>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showDrop: false,
      }
    }
  }

</script>
<style scoped>
  .top input,
  .top .item {
    border-bottom: 1px solid #F3F3F3;
    height: 40px;
    color: #AFAFAF;
    font-size: 15px;
    line-height: 40px;
  }

  .container {
    padding: 20px;
    height: calc(100% - 80rpx);

  }

  .title {
    color: #333333;
    font-size: 15px;
    font-weight: bold;
  }

  .middle {
    margin-top: 31px;
  }

  .gameList {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    grid-template-rows: 23% 23% 23% 23%;
    grid-gap: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 19px;
    font-size: 13px;
  }

  textarea {
    margin-top: 30px;
  }

  .btn {
    background-color: #ffc400;
    width: 181px;
    height: 44px;
    border-radius: 22px;
    border: 1px solid transparent;
    font-size: 14px;
  }

  .drop_up {
    height: 230px;
    background: white;
    position: absolute;
    z-index: 99;
    margin: 0 -35px;
    padding: 0 15px;
    bottom: 0;
    width: 100%;
  }

  .drop_up .title {
    color: #B4B4B4;
    font-size: 12px;
    line-height: 37px;
    text-indent: 11px;
  }

  .list li {
    height: 44px;
    line-height: 44px;
    padding-left: 29px;
  }

  .list li:nth-child(2n) {
    background: #F8FBFF;
  }

  .down {
    animation: slide-down .5s;
    animation-fill-mode: forwards
  }

  .up {
    animation: slide-up .5s;
    animation-fill-mode: forwards
  }

  @keyframes slide-down {
    from {
      transform: translateY(0px);
    }

    to {
      transform: translateY(500px);
      display: block;
    }
  }

  @keyframes slide-up {
    from {
      transform: translateY(500px);
    }

    to {
      transform: translateY(0px);
      display: none;
    }
  }

</style>
