<template>
  <div class="container">
    <div class="fog" v-if="showDropdown"></div>
    <div class="header">
      <span :class="{active:active=='我的学生'}" @click="active='我的学生'">我的学生</span>
      <span :class="{active:active=='学生成绩'}" @click="active='学生成绩'">学生成绩</span>
    </div>
    <div class="content" v-if="ratio">
      <div>
        <p class="header-btn" v-if="active=='学生成绩'">
          <span :class="{active:activeBtn=='组别'}" @click="activeBtn='组别'">组别</span>
          <span :class="{active:activeBtn=='全校'}" @click="activeBtn='全校'">全校</span>
        </p>
      </div>
      <ul class="list" v-if="active=='学生成绩'">
        <li @click="toComment">
          <span style="flex:1">
            <image class="image" :src="'/static/images/ranking/people@'+ratio+'x.png'"></image>
          </span>
          <span style="flex:6">小明</span>
          <span style="flex:1">
            <image class="icon" :src="'/static/images/ranking/ranking1@'+ratio+'x.png'"></image>
          </span>
        </li>
      </ul>
      <ul class="students" v-else>
        <li>
          <span class="arrow">&nbsp;&nbsp;&nbsp;</span>
          <span>一组</span>
          <ul class="student-list">
            <li>
              <span style="flex:1">
                <image class="image" :src="'/static/images/ranking/people@'+ratio+'x.png'"></image>
              </span>
              <span style="flex:6">小明</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: "我的学生",
        activeBtn: "组别",
        showDropdown: false,
        ratio: 1,
      }
    },
    methods: {
      showDropdownFunc: function () {
        this.activeBtn = "组别";
        this.showDropdown = !this.showDropdown;
      },
      toComment: function () {
        wx.navigateTo({
          url: "./comment/main"
        })
      }
    },
    mounted() {
      this.ratio = this.globalData.ratio;
    }
  }

</script>
<style lang="scss" scoped>
  .container {
    height: 100%;
    position: absolute;
    width: 100%;
    background: $grey-background;
  }

  .content {
    height: calc(100% - 162rpx);
  }

  .header {
    height: tovmin(130);
    background: $deep-blue;
    display: flex;
    justify-content: center;
    color: white;
    align-items: center;
    position: relative;
    z-index: 1001;
  }

  .header span {
    flex: 1;
    text-align: center;
  }

  .header span.active {
    color: $middle-blue;
    position: relative;
  }

  .header span.active::after {
    content: "";
    height: 0px;
    width: 0px;
    border-color: transparent transparent white transparent;
    border-style: dashed dashed solid dashed;
    border-width: tovmin(20);
    position: absolute;
    top: tovmin(45);
    right: 45%;
  }

  .list-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 tovmin(60);
  }

  .image {
    height: tovmin(60);
    width: tovmin(60);
    border-radius: tovmin(60);
    vertical-align: middle;
  }

  .icon {
    width: tovmin(38);
    height: tovmin(49);
  }

  .content .list {
    background: white;
    color: $black;
    box-sizing: content-box;
    margin: tovmin(30);
  }

  .list li {
    display: flex;
    padding: tovmin(20) tovmin(30);
    align-items: center;
  }

  .list li:nth-child(2n) {
    background: $light-blue;
  }

  .students {
    margin: tovmin(40);
    padding: tovmin(40);
    background: white;
  }

  .students>ul>li {
    font-size: tovmin(34);
    height: tovmin(80);
    line-height: tovmin(80);
  }

  .student-list li {
    height: tovmin(80);
    line-height: tovmin(80);
    padding-left: tovmin(30);
  }

  .header-btn {
    background: white;
    display: flex;
    justify-content: space-around;
    height: tovmin(98);
    align-items: center;
    position: relative;
    z-index: 11;
    z-index: 1001;
  }

  .header-btn span {
    display: inline-block;
    width: tovmin(154);
    height: tovmin(56);
    border: tovmin(2) solid #ccc;
    border-radius: tovmin(34);
    line-height: tovmin(56);
    color: #999;
    text-align: center;
  }

  .header-btn span.active {
    color: $middle-blue;
    background: $light-blue;
    border: 1px solid transparent;
  }

  .arrow {
    width: tovmin(168) !important;
    position: relative;
  }

  .arrow::after {
    content: "";
    border: tovmin(2) solid #C6C6C6;
    border-top-color: transparent;
    border-right-color: transparent;
    margin-left: tovmin(20);
    position: absolute;
    top: tovmin(15);
    right: tovmin(10);
    height: tovmin(10);
    width: tovmin(10);
    margin-right: tovmin(10);
  }

</style>
