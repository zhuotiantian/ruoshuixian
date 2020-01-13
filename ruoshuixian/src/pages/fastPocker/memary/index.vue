<template>
  <div class="container">
    <GameTitle :showShowType="true" :showIntervalTime='true' ref="title" @group="group" :showFinishMemoryBtn="true" @finishMemary="finishMemary"></GameTitle>
    <div class="list">
      <template v-if="pocker.length==0">
        <image class="pocker-bg" v-for="(item,index) in bgCounts" :key="index" :style="{'left':item+'rpx'}" :src="'/static/images/firstPage/pockerbg.png'" />
      </template>
      <template v-else>
        <em class="arrow arrow-left" @click="prevGroup" v-if="pockerNumber<52"></em>
        <scroll-view :style="{width:'78%','height':'100%','white-space':'nowrap','margin':'0 auto','flex':'10'}" scroll-x="true">
          <div class="pocker-wrapper" :style="{width:pockerNumber<16?((pockerNumber-1)*20+103+'px'):'97%'}">
            <image class="pocker" ref="pocker" v-for="(item,index) in pocker[currentGroupIndex]" :style="{left:index*20+'px','z-index':index}" :key="index" :src="'/static/images/pocker/'+(item.index)+'-'+item.color+'.png'" />
          </div>
        </scroll-view>
        <em class="arrow arrow-right" @click="nextGroup" v-if="pockerNumber<52"></em>
      </template>
    </div>
  </div>
</template>
<script>
import GameTitle from "@/components/gameTitle_new";
export default {
  components: {
    GameTitle
  },
  data () {
    return {
      pannelContent: ["1", "2", "4", "8"],
      pockerCount: 0,
      bg: 23,
      left: 100,
      pocker: [],
      list: [],
      currentGroupIndex: 0,
      pockerNumber: 0,
    };
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data())
    this.pockerNumber = this.$store.state.pockerNumber;
    this.list = this.$store.state.ruleList.list;
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
  mounted: function () {
    this.group(this.pockerNumber);
    this.$refs.title.selectType = this.pockerNumber;
  },
  methods: {
    group: function (data) {
      let list = this.list.concat();
      this.pockerNumber = (data === 'All' ? 52 : data);
      this.pocker = [];
      if (this.pockerNumber === 52) {
        this.pocker = [list]
      } else {
        for (var i = 0; i < list.length; i + data) {
          this.pocker.push(list.splice(i, i + data));
        }
      }
      this.currentGroupIndex = 0;
    },

    finishMemary: function () {
      wx.reLaunch({
        url: "/pages/recall/main"
      });
    },
    prevGroup: function () {
      if (this.currentGroupIndex > 0) {
        this.currentGroupIndex--;
      }
    },
    nextGroup: function () {
      if (this.currentGroupIndex < this.pocker.length - 1) {
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
  transform: rotate(-180deg);
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
</style>
