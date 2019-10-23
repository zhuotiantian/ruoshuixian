<template>
  <div class="container">
    <CardTitle :showType="false" :pannelContent="pannelContent" @group="group" :isShowTime="false" :type="type" @finishMemary="finishMemary">
    </CardTitle>
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
    <div class="interval" v-if="showInterval">{{number}}秒</div>
  </div>
</template>
<script>
import CardTitle from "@/components/gameTitle"
export default {
  components: {
    CardTitle
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data())
    let level = this.$store.state.level;
    this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
      return e.game_level == level
    })[0];
    let memoryTime = this.$store.state.memoryTime;
    this.list = this.rule.list;
    this.time_long = memoryTime * 1000;
    this.pockerNumber = this.$store.state.pockerNumber;
    let interval = setInterval(() => {
      this.number--;
      if (!this.number > 0) {
        this.group();
        this.showInterval = false;
      }
    }, 1000);
  },
  data () {
    return {
      pannelContent: ["1", "2", "4", "8"],
      pockerCount: 0,
      bg: 23,
      left: 100,
      pocker: [],

      rule: {},
      type: null,
      level: "primary",
      list: [],
      currentGroupIndex: 0,
      time_long: 0,
      pockerNumber: 0,
      showInterval: true,
      number: 3,
    }
  },
  computed: {
    bgCounts: function () {
      let bgCounts = [];
      let left0 = this.pockerCount == 23 ? 100 : (290 - 10 * this.bg);
      for (let i = 0; i < this.bg; i++) {
        let left = left0 + 20 * i;
        bgCounts.push(left)
      };
      return bgCounts;
    },
  },
  methods: {
    group: function () {
      let list = JSON.parse(JSON.stringify(this.list));
      this.pocker = [];
      for (var i = 0; i < list.length; i + this.pockerNumber) {
        this.pocker.push(list.splice(i, i + this.pockerNumber));
      }
      this.type = "记忆完成";
      this.currentGroupIndex = 0;
      if (this.time_long) {
        setTimeout(() => {
          this.finishMemary();
        }, this.time_long);
      }
    },
    finishMemary: function () {
      wx.reLaunch({
        url: "../recall/main"
      })
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
}
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
.interval {
  position: fixed;
  width: tovmin(200);
  height: tovmin(200);
  line-height: tovmin(200);
  background: rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: tovmin(200);
  text-align: center;
  font-size: tovmin(40);
}
</style>