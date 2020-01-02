<template>
  <div class="container">
    <GameTitle :isResult="true" :showCorrectAnswerBtn="true" @showCorrectAnswer="showCorrectAnswer" @showMyAnswerHandler="showMyAnswerHandler"></GameTitle>
    <div class="list" v-if="isShowCorrectAnswer">
      <scroll-view :style="{width:'78%','height':'100%','white-space':'nowrap','margin':'0 auto','flex':'10'}" scroll-x="true">
        <div class="pocker-wrapper" style="width:97%">
          <image class="pocker" ref="pocker" v-for="(item,index) in perPocker" :style="{left:index*40+'rpx','z-index':index}" :key="index" :src="'/static/images/pocker/'+(item.index)+'-'+item.color+'.png'" />
        </div>
      </scroll-view>
    </div>
    <div class="list" v-else>
      <scroll-view :style="{width:'78%','height':'100%','white-space':'nowrap','margin':'0 auto','flex':'10'}" scroll-x="true">
        <div class="pocker-wrapper" :style="{width:(pocker.length<52?((pocker.length-1)*40+124+'rpx'):'97%'),'max-width':'97%'}">
          <image :class="{pocker:true,trueResult:item.trueResult,wrong:!item.trueResult}" ref="pocker" v-for="(item,index) in perPocker" :style="{left:index*40+'rpx','z-index':index}" :key="index" :src="'/static/images/pocker/'+(item.index)+'-'+item.color+'.png'" />
        </div>
      </scroll-view>
    </div>
    <div class="pageFoot">
      <span class="pageBtn" @click="prevPage">上一页</span>
      <div class="btn-group">
        <span :class="{item:true, active:item.active}" @click="selectHandler(index,item)" v-for="(item,index) in groupPage[currentPage]" :key="index">{{item.number}}副</span>
      </div>
      <span class="pageBtn" @click="nextPage">下一页</span>
    </div>
  </div>
</template>
<script>
import GameTitle from "@/components/gameTitle_new";
export default {
  components: {
    GameTitle
  },
  onLoad () {
    let userInfo = this.$store.state.userInfo;
    this.userid = userInfo.id;
    this.correct_result = this.$store.state.result.correct_result;
    this.user_result = this.$store.state.result.right_and_wrong_results;
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
    this.group2();
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
      perPocker: [],
      isShowCorrectAnswer: false,
    };
  },
  methods: {
    group: function () {
      let currentIndex = this.groupPage[this.currentPage].filter(e => {
        return e.active
      })[0].number - 1;
      let list = JSON.parse(JSON.stringify(this.correct_result[currentIndex]));
      this.perPocker = list;
    },
    group2: function () {
      let currentIndex = this.groupPage[this.currentPage].filter(e => {
        return e.active
      })[0].number - 1;
      this.user_result[currentIndex].forEach((e, _index) => {
        e.trueResult = false;
        if (e.index === this.correct_result[_index].index && e.color === this.correct_result[_index].color) {
          e.trueResult = true;
        }
      })
      let list = JSON.parse(JSON.stringify(this.user_result[currentIndex]));
      this.perPocker = list;
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
    showCorrectAnswer: function () {
      this.group();
      this.currentPage = 0;
      this.isShowCorrectAnswer = true;
    },
    showMyAnswerHandler: function () {
      this.group2();
      this.isShowCorrectAnswer = false;
      this.currentPage = 0;

    }
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

.pageBtn .item {
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

.pageBtn .item.active {
  color: white;
  background: $middle-blue;
  border: none;
}
.pocker-wrapper{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 196px;
  white-space: "nowrap";
}
</style>
