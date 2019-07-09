<template>
  <div class="container">
    <div class="fog" v-if="showDropdown"></div>
    <div class="header">
      <span :class="{active:active=='打卡时间'}" @click="active='打卡时间'">打卡时间</span>
      <span :class="{active:active=='成绩'}" @click="active='成绩'">成绩</span>
    </div>
    <div class="content" v-if="ratio">
      <div>
        <p class="header-btn" v-if="active=='成绩'">
          <span :class="{active:activeBtn=='全校'}" @click="activeBtn='全校'">全校</span>
          <span :class="{active:activeBtn=='班级'}" @click="activeBtn='班级'">班级</span>
          <span :class="{active:activeBtn=='单项排名',arrow:true}" @click="showDropdownFunc">单项排名</span>
        </p>
        <div :class="{'drop-down':true,'down':showDropdown,'up':!showDropdown}">
          <ul>
            <li v-for="(item,index) in games" :key="index">
              {{item.name}}
              <image class="icon_check" :src="'/static/images/my/select.png'" />
            </li>
          </ul>
        </div>
      </div>
      <p class="list-item">
        <span style="flex:1">
          <image class="image" :src="'/static/images/ranking/people@'+ratio+'x.png'" />
        </span>
        <span style="flex:6">我</span>
        <span style="flex:1">04</span>
      </p>
      <ul class="list">
        <li>
          <span style="flex:1">
            <image class="image" :src="'/static/images/ranking/people@'+ratio+'x.png'" />
          </span>
          <span style="flex:6">小明</span>
          <span style="flex:1">
            <image class="icon" :src="'/static/images/ranking/ranking1@'+ratio+'x.png'" />
          </span>
        </li>
        <li>
          <span style="flex:1">
            <image class="image" :src="'/static/images/ranking/people@'+ratio+'x.png'" />
          </span>
          <span style="flex:6">小明</span>
          <span style="flex:1">
            <image class="icon" :src="'/static/images/ranking/ranking2@'+ratio+'x.png'" />
          </span>
        </li>
        <li>
          <span style="flex:1">
            <image class="image" :src="'/static/images/ranking/people@'+ratio+'x.png'" />
          </span>
          <span style="flex:6">小明</span>
          <span style="flex:1">
            <image class="icon" :src="'/static/images/ranking/ranking3@'+ratio+'x.png'" />
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
      ratio: 1,
      games: [],
    }
  },
  methods: {
    showDropdownFunc: function () {
      this.activeBtn = "单项排名";
      this.showDropdown = !this.showDropdown;
    }
  },
  mounted() {
    this.ratio = this.globalData.ratio;
    this.games = this.globalData.games;
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
  height: calc(100% - 132rpx);
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
  top: tovmin(50);
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
  height: tovmin(50);
  width: tovmin(38);
}

.icon_check {
  height: tovmin(20);
  width: tovmin(24);
  margin-left: tovmin(6);
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
  padding-right: tovmin(10);
}

.arrow::after {
  content: "";
  border: tovmin(2) solid #ccc;
  border-top-color: transparent;
  border-right-color: transparent;
  margin-left: tovmin(20);
  position: absolute;
  top: tovmin(20);
  right: tovmin(10);
  height: tovmin(10);
  width: tovmin(10);
}

.list-item {
  height: tovmin(108);
}

.drop-down {
  position: absolute;
  width: 100%;
  background: white;
  border-top: tovmin(2) solid #e4e7ed;
  text-align: center;
  z-index: 1000;
  font-size: tovmin(28);
}

.drop-down li {
  height: 40px;
  line-height: 40px;
}

.drop-down li:nth-child(2n) {
  background: #f8fbff;
}

.down {
  animation: slide-down 0.3s;
  animation-fill-mode: forwards;
}

.up {
  animation: slide-up 0.6s;
  animation-fill-mode: forwards;
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
