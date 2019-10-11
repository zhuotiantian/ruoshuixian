<template>
  <div class="container">
    <div class="fog" v-if="showDropdown"></div>
    <div class="header">
      <span :class="{active:active=='我的学生'}" @click="rankingType('我的学生')">我的学生</span>
      <span :class="{active:active=='学生成绩'}" @click="rankingType('学生成绩',6)">学生成绩</span>
    </div>
    <div class="content">
      <div>
        <p class="header-btn" v-if="active=='学生成绩'">
          <span :class="{active:activeBtn=='组别'}" @click="switchType('组别',6)">组别</span>
          <span :class="{active:activeBtn=='全校'}" @click="switchType('全校',7)">全校</span>
        </p>
      </div>
      <ul class="list" v-if="active=='学生成绩'">
        <li v-for="(item,index) in list" :key="index" @click="toComment(item.id)">
          <span style="flex:1">
            <image class="image" :src="domain+item.avatar"></image>
          </span>
          <span style="flex:6">{{item.nickname}}</span>
          <span style="flex:1">
            <image class="icon" v-if="index==0" :src="'/static/images/ranking/ranking1.png'"></image>
            <image class="icon" v-if="index==1" :src="'/static/images/ranking/ranking2.png'"></image>
            <image class="icon" v-if="index==2" :src="'/static/images/ranking/ranking3.png'"></image>
          </span>
        </li>
      </ul>
      <ul class="students" v-else>
        <li v-for="(item,index) in stu_list" :key="index" @click="hide(index)">
          <span class="arrow" v-if="item.show">&nbsp;&nbsp;&nbsp;</span>
          <span class="arrow arrow-right" v-else>&nbsp;&nbsp;&nbsp;</span>
          <span>{{item.name}}</span>
          <ul class="student-list" v-show="item.show">
            <li v-for="(stu,_index) in item.user" :key="_index">
              <span style="flex:1">
                <image class="image" :src="domain+stu.avatar"></image>
              </span>
              <span style="flex:6">{{stu.nickname}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: "我的学生",
      activeBtn: "组别",

      stu_list: [],
      domain: this.$http.domain,
      list: [],
    }
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data());
    this.token = this.$store.state.userInfo.token;
    this.getStudents();
  },
  methods: {
    rankingType: function (type, index) {
      this.active = type;
      if (type == '学生成绩') {
        this.switchType("组别", 6);
      } else {
        this.getStudents(index);
      }
    },
    toComment: function () {
      wx.navigateTo({
        url: "./comment/main?aid="
      })
    },
    switchType: function (type, index) {
      this.activeBtn = type;
      this.getList(index);
    },
    getList: function (type) {
      this.$http.get({
        url: "/api/wxapp.game/rankingList",
        data: {
          ranking_type: type
        },
        header: {
          token: this.token
        }
      }).then(result => {
        this.list = result.data;
        this.list.forEach((e, index) => {
          if (e.nickname == this.currentUser) {
            this.index = index;
          }
        })
      });
    },
    getStudents: function () {
      this.$http.get({
        url: "/api/wxapp.student/myStudents",
        header: {
          token: this.token
        }
      }).then(result => {
        result.data.forEach(e => {
          e.show = true;
        });
        this.stu_list = result.data;
      });
    },
    hide: function (index) {
      this.$set(this.stu_list[index], "show", !this.stu_list[index]["show"]);
    }
  },
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
  height: calc(100% - 170rpx);
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
  height: calc(100% - 130rpx);
}

.students li {
  font-size: tovmin(34);
  // height: tovmin(80);
  line-height: tovmin(80);
}

.student-list li {
  // height: tovmin(80);
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
  border: tovmin(2) solid #c6c6c6;
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