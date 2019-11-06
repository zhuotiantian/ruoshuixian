<template>
  <div class="container">
    <CardTitle isResult="true" isPocker="true" showTime="false"></CardTitle>
    <div class="list">
      <em class="arrow arrow-left" @click="prevGroup"></em>
      <div :style="{width:(pockerNumber-1)*40+124+'rpx',height:'196px','white-space':'nowrap','position':'relative'}">
        <image class="pocker" ref="pocker" v-for="(item,index) in perPocker[currentGroupIndex]" :style="{left:index*40+'rpx','z-index':index}" :key="index" :src="'/static/images/pocker/'+(item.index)+'-'+item.color+'.png'" />
      </div>
      <em class="arrow arrow-right" @click="nextGroup"></em>
    </div>
    <div class="pageFoot">
      <span class="pageBtn" @click="prevPage">上一页</span>
      <div class="btn-group">
        <span :class="{item:true, active:item.active}" @click="selectHandler(index,item)" v-for="(item,index) in groupPage[currentPage]" :key="index">{{item.number}}幅</span>
      </div>
      <span class="pageBtn" @click="nextPage">下一页</span>
    </div>
  </div>
</template>
<script>
import CardTitle from "@/components/gameTitle";
export default {
  components: {
    CardTitle
  },
  onLoad () {
    let userInfo = this.$store.state.userInfo;
    this.userid = userInfo.id;
    this.correct_result = this.$store.state.result.correct_result;
    this.pockerNumber = this.$store.state.pockerNumber;
    for (var i = 1; i <= this.correct_result.length; i++) {
      this.pages.push({
        number: i,
        active: false
      });
    };
    this.pages[0].active = true;
    let groupPage = [];
    for (var i = 0; i < this.pages.length; i += 10) {
      groupPage.push(this.pages.slice(i, i + 10));
    };
    this.groupPage = groupPage;
    this.group();
  },
  onShareAppMessage: function (res) {
    return {
      path: "pages/firstPage/main?id=" + this.userid,
      title: "马拉松扑克牌，一起来玩吧！",
      success: function () {
        console.log("分享成功");
      },
      error: function () {
        console.log("分享失败");
      }
    }
  },
  data () {
    return {
      pannelContent: ["1", "2", "4", "8"],
      pockerCount: 23,
      pockerNumber: 0,
      left: 100,
      pages: [],
      userid: null,
      inviter_id: null,
      groupPage: [],
      currentPage: 0,
      currentGroupIndex: 0,
      perPocker: []
    };
  },
  computed: {
    pocker: function () {
      let pocker = [];
      let left0 = this.pockerCount == 23 ? 100 : 350 - 10 * this.pockerCount;
      for (let i = 0; i < this.pockerCount; i++) {
        let left = left0 + 20 * i;
        pocker.push(left);
      }
      return pocker;
    }
  },
  methods: {
    group: function () {
      let currentIndex = this.groupPage[this.currentPage].filter(e => {
        return e.active
      })[0].number - 1;
      let list = JSON.parse(JSON.stringify(this.correct_result[currentIndex]));
      this.perPocker = [];
      for (var i = 0; i < list.length; i + this.pockerNumber) {
        this.perPocker.push(list.splice(i, i + this.pockerNumber));
      }
      this.currentGroupIndex = 0;
    },
    nextPage: function () {
      if (this.currentPage < this.groupPage.length - 1) {
        this.currentPage++;
      }
    },
    prevPage: function () {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    prevGroup: function () {
      if (this.currentGroupIndex > 0) {
        this.currentGroupIndex--;
      }
    },
    nextGroup: function () {
      if (this.currentGroupIndex < this.perPocker.length - 1) {
        this.currentGroupIndex++;
      }
    },
    selectHandler: function (index, item) {
      this.$set(this.groupPage, this.currentPage, this.groupPage[this.currentPage].map(e => {
        return {
          number: e.number,
          active: false
        }
      }));
      this.$set(this.groupPage[this.currentPage], index, {
        number: item.number,
        active: true
      });
      this.currentGroupIndex = 0;

      this.pockerNumber && this.group(this.pockerNumber);
    },
  }
};
</script>
<style lang="scss" scoped>
.list {
  text-align: center;
  margin: 0 15vmin;
  position: relative;
  height: auto;
  height: tovmin(30);
  display: flex;
  justify-content: space-between;
}

.container {
  padding-top: tovmin(200);
}

.pocker {
  height: tovmin(382);
  width: tovmin(248);
  position: absolute;
}

.arrow {
  left: tovmin(-20);
}

.arrow::after {
  position: relative;
  top: tovmin(150);
  height: tovmin(30);
  width: tovmin(30);
  margin: 0 tovmin(60);
}

.pageFoot {
  position: fixed;
  width: 100%;
  height: tovmin(120);
  background: white;
  z-index: 999;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 tovmin(60);
  box-sizing: border-box;
  font-size: tovmin(28);
  align-items: center;
}

.pageBtn {
  color: $yellow;
}

.item {
  height: tovmin(80);
  width: tovmin(80);
  display: inline-block;
  border-radius: tovmin(8);
  line-height: tovmin(80);
  text-align: center;
  margin-right: tovmin(24);
  border: tovmin(2) solid #e5e5e5;
  color: $black;
}

.item.active {
  color: white;
  background: $middle-blue;
  border: none;
}
</style>
