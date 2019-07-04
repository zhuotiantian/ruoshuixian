<template>
  <div class="container">
    <div class="header">
      <span :class="{active:active=='打卡时间'}" @click="active='打卡时间'">打卡时间</span>
      <span :class="{active:active=='成绩'}" @click="active='成绩'">成绩</span>
    </div>
    <div class="content">
      <div>
        <p class="header-btn" v-if="active=='成绩'">
          <span :class="{active:activeBtn=='全校'}" @click="activeBtn='全校'">全校</span>
          <span :class="{active:activeBtn=='班级'}" @click="activeBtn='班级'">班级</span>
          <span :class="{active:activeBtn=='单项排名'}" @click="showDropdownFunc">单项排名</span>
        </p>
        <div :class="{'drop-down':true,'down':showDropdown,'up':!showDropdown}">
          <ul>
            <li>闪现扑克牌</li>
            <li>快速扑克牌</li>
            <li>二进制数字</li>
            <li>快速数字</li>
            <li>马拉松数字</li>
            <li>单项排名</li>
            <li>随机词语</li>
            <li>人名头像</li>
            <li>抽象图形</li>
            <li>听记数字</li>
            <li>虚拟事件和日期</li>
          </ul>
        </div>
      </div>
      <p class="list-item">
        <span style="flex:1">
          <image class="image" src="/static/images/ranking_image6.png"></image>
        </span>
        <span style="flex:6">我</span>
        <span style="flex:1">04</span>
      </p>

      <ul class="list">
        <li>
          <span style="flex:1">
            <image class="image" src="/static/images/ranking_image3.png"></image>
          </span>
          <span style="flex:6">小明</span>
          <span style="flex:1">
            <image class="icon" src="/static/images/ranking_image2.png"></image>
          </span>
        </li>
        <li>
          <span style="flex:1">
            <image class="image" src="/static/images/ranking_image3.png"></image>
          </span>
          <span style="flex:6">小明</span>
          <span style="flex:1">
            <image class="icon" src="/static/images/ranking_image4.png"></image>
          </span>
        </li>
        <li>
          <span style="flex:1">
            <image class="image" src="/static/images/ranking_image3.png"></image>
          </span>
          <span style="flex:6">小明</span>
          <span style="flex:1">
            <image class="icon" src="/static/images/ranking_image5.png"></image>
          </span>
        </li>
        <li>
          <span style="flex:1">
            <image class="image" src="/static/images/ranking_image3.png"></image>
          </span>
          <span style="flex:6">小明</span>
          <span style="flex:1">
            <span class="number">04</span>
          </span>
        </li>
        <li>
          <span style="flex:1">
            <image class="image" src="/static/images/ranking_image3.png"></image>
          </span>
          <span style="flex:6">小明</span>
          <span style="flex:1">
            <span class="number">05</span>
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
        active: "成绩",
        activeBtn: "全校",
        showDropdown: false,
      }
    },
    methods: {
      showDropdownFunc: function () {
        this.activeBtn = "单项排名";
        this.showDropdown = !this.showDropdown;
      }
    }
  }

</script>
<style scoped>
  .container {
    height: 100%;
  }

  .content {
    background: #f7f7f7;
    height: calc(100% - 60px);
  }

  .header {
    height: 60px;
    background: #173771;
    display: flex;
    justify-content: center;
    color: white;
    align-items: center;
    position: relative;
    z-index: 11;
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

  .list-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
  }

  .image {
    width: 45px;
    height: 45px;
  }

  .icon {
    height: 30px;
    width: 30px
  }

  .list {
    background: white;
    margin: 15px 15px 10px 15px;
    /* height: calc(100% - 120px); */
  }

  .list li {
    display: flex;
    align-items: center;
    height: 60px;
  }

  .list li:nth-child(2n),
  .drop-down li:nth-child(2n) {
    background: #f8fbff;
  }

  .header-btn {
    background: white;
    display: flex;
    justify-content: space-around;
    height: 45px;
    align-items: center;
    position: relative;
    z-index: 11;
  }

  .header-btn span {
    display: inline-block;
    height: 20px;
    padding: 5px 10px;
    border: 1px solid #E4E7ED;
    border-radius: 20px;
    line-height: 20px;
    font-size: 14px;
    color: #999999;
  }

  .header-btn span.active {
    color: #24bcff;
    background: #e0f6ff;
    border: 1px solid transparent;
  }

  .drop-down {
    position: absolute;
    width: 100%;
    background: white;
    border-top: 1px solid #E4E7ED;
    text-align: center;
    z-index: 10;
    transform: translateY(1000px);
  }

  .drop-down li {
    height: 40px;
    line-height: 40px;
  }

  .down {
    animation: slide-down .3s;
    animation-fill-mode: forwards
  }

  .up {
    animation: slide-up .6s;
    animation-fill-mode: forwards
  }

  @keyframes slide-down {
    from {
      transform: translateY(-1000px);
    }

    to {
      transform: translateY(0px);
      display: block;
    }
  }

  @keyframes slide-up {
    from {
      transform: translateY(0px);
    }

    to {
      transform: translateY(-1000px);
      display: none;
    }
  }

</style>
