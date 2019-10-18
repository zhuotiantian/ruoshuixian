<template>
  <div class="container">
    <CardTitle :showType="true" :showGameLevel="true" ref="title" :pannelContent="pannelContent" @group="group" :type="type" @finishMemary="finishMemary"></CardTitle>
    <div class="list">
      <template v-if="pocker.length==0">
        <image class="pocker-bg" v-for="(item,index) in bgCounts" :key="index" :style="{'left':item+'rpx'}" :src="'/static/images/firstPage/pockerbg.png'" />
      </template>
      <template v-else>
        <em class="arrow arrow-left" @click="prevGroup"></em>
        <div :style="{width:(pockerNumber-1)*40+124+'rpx',height:'196px','white-space':'nowrap','position':'relative'}">
          <image class="pocker" ref="pocker" v-for="(item,index) in pocker[currentGroupIndex]" :style="{left:index*40+'rpx','z-index':index}" :key="index" :src="'/static/images/pocker/'+(item.index)+'-'+item.color+'.png'" />
        </div>
        <em class="arrow arrow-right" @click="nextGroup"></em>
      </template>
    </div>
  </div>
</template>
<script>
import CardTitle from "@/components/gameTitle";
export default {
  components: {
    CardTitle
  },
  data () {
    return {
      pannelContent: ["1", "2", "4", "8"],
      pockerCount: 0,
      bg: 23,
      left: 100,
      pocker: [],

      type: null,
      level: "primary",
      list: [],
      currentGroupIndex: 0,
      rule: {},
      pockerNumber: 0,
    };
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data())
    let level = this.$store.state.level;
    this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
      return e.game_level == level
    })[0];
    this.pockerNumber = this.$store.state.pockerNumber;
    this.list = this.rule.list;
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
      let list = JSON.parse(JSON.stringify(this.list));
      this.pockerNumber = data;
      this.pocker = [];
      for (var i = 0; i < list.length; i + data) {
        this.pocker.push(list.splice(i, i + data));
      }
      this.type = "记忆完成";
    },
    this.currentGroupIndex=0;
    finishMemary: function () {
      wx.reLaunch({
        url: "../recall/main"
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
</style>