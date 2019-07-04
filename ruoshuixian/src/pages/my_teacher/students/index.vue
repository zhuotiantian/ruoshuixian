<template>
  <div class="container">
    <div class="header">
      <span :class="{active:active=='我的学生'}" @click="active='我的学生'">我的学生</span>
      <span :class="{active:active=='学生成绩'}" @click="active='学生成绩'">学生成绩</span>
    </div>
    <div class="content">
      <ul class="parent" v-if="active=='我的学生'">
        <li @click="expend">
          <p><span>></span>一组</p>
          <ul v-if="showPannel">
            <li>
              <image src="/static/images/my_teacher_image6.png" class="image"></image>
              <span>小明</span>
            </li>
            <li>
              <image src="/static/images/my_teacher_image6.png" class="image"></image>
              <span>小明</span>
            </li>
          </ul>
        </li>
        <li><span>></span>二组</li>
        <li><span>></span>三组</li>
      </ul>
      <div v-else style="height:100%">
        <p class="header-btn" v-if="active=='学生成绩'">
          <span :class="{active:activeBtn=='组别'}" @click="activeBtn='组别'">组别</span>
          <span :class="{active:activeBtn=='全校'}" @click="activeBtn='全校'">全校</span>
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
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: "我的学生",
        showPannel: false,
        activeBtn: "组别"
      }
    },
    methods: {
      expend: function () {
        this.showPannel = !this.showPannel;
      }
    }
  }

</script>
<style scoped>
  .content {
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
    margin: -15px -15px 15px -15px;
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
    border-color: transparent transparent #f3f3f3 transparent;
    border-style: dashed dashed solid dashed;
    border-width: 10px;
    position: absolute;
    top: 20px;
    right: 45%;
  }

  .image {
    height: 30px;
    width: 30px;
    vertical-align: middle;

  }

  ul {
    background: white;
  }

  .parent {
    padding: 0 15px;
    position: relative;
    height: calc(100% - 15px)
  }

  .children {
    text-indent: 20px;
  }

  li {
    line-height: 50px;
  }

  .children li {
    height: 50px;
  }

  .icon {
    height: 30px;
    width: 30px
  }

  .list-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
  }

  .list {
    background: white;
    padding: 15px;
    height: calc(100% - 80px);
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
    height: 23px;
    padding: 5px 10px;
    border: 1px solid #E4E7ED;
    border-radius: 20px;
    line-height: 23px;
    font-size: 14px;
    padding: 0 20px;
    color: #999999;
  }

  .header-btn span.active {
    color: #24bcff;
    background: #e0f6ff;
    border: 1px solid transparent;
  }

</style>
