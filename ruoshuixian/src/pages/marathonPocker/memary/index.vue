<template>
  <div class="container">
    <GameTitle :showShowType="true" :showIntervalTime="true" ref="title" @group="group" :showFinishMemoryBtn="true" @finishMemary="finishMemary"></GameTitle>
    <div class="list">
      <template v-if="perPocker.length == 0">
        <image class="pocker-bg" v-for="(item, index) in bgCounts" :key="index" :style="{ left: item + 'px' }" :src="'/static/images/firstPage/pockerbg.png'" />
      </template>
      <template v-else>
        <em class="arrow arrow-left" @click="prevGroup" v-if="pockerNumber < 52"></em>
        <scroll-view :style="{width: '78%',height: '100%','white-space': 'nowrap',margin: '0 auto',flex: '10'}" scroll-x="true">
          <div class="pocker-wrapper" :style="{width:pockerNumber<52?((pockerNumber-1)*20+103+'px'):'97%'}">
            <image class="pocker" ref="pocker" v-for="(item, index) in perPocker[currentGroupIndex]" :style="{ left: index * 20 + 'px', 'z-index': index }" :key="index" :src="'/static/images/pocker/' +item.index +'-' +item.color +'.png'" />
          </div>
        </scroll-view>
        <em class="arrow arrow-right" @click="nextGroup" v-if="pockerNumber < 52"></em>
      </template>
    </div>
    <div class="pageFoot">
      <span class="pageBtn" @click="prevPage">上一页</span>
      <div class="btn-group">
        <span :class="{ item: true, active: item.active }" @click="selectHandler(index, item)" v-for="(item, index) in groupPage[currentPage]" :key="index">{{ item.number }}副</span>
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
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  data () {
    return {
      pannelContent: ["1", "2", "4", "8", "All"],
      pockerCount: 0,
      bg: 23,
      left: 100,
      pocker: [],

      type: null,
      level: "primary",
      pages: [],
      perPocker: [],
      currentPage: 0,
      groupPage: [],
      currentGroupIndex: 0,
      pockerNumber: 0
    };
  },
  computed: {
    bgCounts: function () {
      let bgCounts = [];
      let left0 = this.pockerCount == 23 ? 100 : 350 - 10 * this.bg;
      for (let i = 0; i < this.bg; i++) {
        let left = left0 + 20 * i;
        bgCounts.push(left);
      }
      return bgCounts;
    }
  },
  methods: {
    init: function () {
      this.pockerNumber = this.$store.state.pockerNumber;
      let pocker = this.$store.state.ruleList.list;
      let level = this.$store.state.level;
      let rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == level
      })[0];
      this.pocker = pocker;
      // 生成pock的副数
      let pages = [];
      for (var i = 1; i <= pocker.length; i++) {
        pages.push({
          number: i,
          active: false
        });
      }
      this.pages = pages;
      this.pages[0].active = true;
      let groupPage = [];
      for (var i = 0; i < this.pages.length; i += 10) {
        groupPage.push(this.pages.slice(i, i + 10));
      }
      this.groupPage = groupPage;
      this.group(this.pockerNumber);
    },
    group: function (data) {
      let currentIndex =
        this.groupPage[this.currentPage].filter(e => {
          return e.active;
        })[0].number - 1;
      let list = JSON.parse(JSON.stringify(this.pocker[currentIndex]));
      this.pockerNumber = data === "All" ? 52 : data;
      this.perPocker = [];
      if (this.pockerNumber === 52) {
        this.perPocker = [list];
      } else {
        for (var i = 0; i < list.length; i + data) {
          this.perPocker.push(list.splice(i, i + data));
        }
      }
      this.currentGroupIndex = 0;
    },
    finishMemary: function () {
      wx.reLaunch({
        url: "/pages/recall/main"
      });
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
      this.$set(
        this.groupPage,
        this.currentPage,
        this.groupPage[this.currentPage].map(e => {
          return {
            number: e.number,
            active: false
          };
        })
      );
      this.$set(this.groupPage[this.currentPage], index, {
        number: item.number,
        active: true
      });
      this.currentGroupIndex = 0;

      this.pockerNumber && this.group(this.pockerNumber);
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
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  text-align: center;
  margin: 0 auto;
  position: relative;
  height: tovmin(382);
  display: flex;
  justify-content: space-between;
  margin: 0 15vmin;
}

.container {
  padding-top: tovmin(200);
}
.pocker-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 196px;
  white-space: "nowrap";
}
.pocker {
  height: tovmin(382);
  width: tovmin(248);
  margin-right: tovmin(30);
  position: absolute;
}

.pocker-bg {
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

.tips-btn {
  color: $middle-blue;
  border: tovmin(2) solid $middle-blue;
}
</style>
