<template>
  <div class="container">
    <GameTitle :showFinishMemoryBtn="showFinishMemoryBtn" @finishMemary="finishMemary" />
    <div class="list">
      <template v-if="pocker.length==0">
        <image class="pocker-bg" v-for="(item,index) in bgCounts" :key="index" :style="{'left':item+'px'}" :src="'/static/images/firstPage/pockerbg.png'" />
      </template>
      <template v-else>
        <div class="pocker-wrapper" :style="{width:(pockerNumber-1)*40+124+'px'}">
          <image class="pocker" ref="pocker" v-for="(item,index) in pocker" :style="{left:index*40+'px','z-index':index}" :key="index" :src="'/static/images/pocker/'+(item.index)+'-'+item.color+'.png'" />
        </div>
      </template>
    </div>
    <div class="interval" v-if="showInterval">{{number}}秒</div>
  </div>
</template>
<script>
import GameTitle from "@/components/gameTitle_new";
export default {
  components: {
    GameTitle
  },
  onLoad() {
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  data() {
    return {
      pockerCount: 0,
      bg: 23,
      left: 100,
      pocker: [],
      pockerNumber: 0,
      showInterval: true,
      number: 3,
      showFinishMemoryBtn: false
    };
  },
  computed: {
    bgCounts: function() {
      let bgCounts = [];
      let left0 = this.pockerCount == 23 ? 100 : 290 - 10 * this.bg;
      for (let i = 0; i < this.bg; i++) {
        let left = left0 + 20 * i;
        bgCounts.push(left);
      }
      return bgCounts;
    }
  },
  methods: {
    init: function() {
      //记忆前的倒计时
      let interval = setInterval(() => {
        this.number--;
        if (this.number <= 0) {
          this.showInterval = false;
          this.showFinishMemoryBtn = true;
          this.start();
          clearInterval(interval);
        }
      }, 1000);
    },
    start: function() {
      let list = this.$store.state.ruleList.list,
        time_long = this.$store.state.memoryTime * 1000;
      this.pockerNumber = this.$store.state.pockerNumber;
      this.pocker = list.slice(0, this.pockerNumber);
      this.finishMemary_timer = setTimeout(() => {
        clearTimeout(this.finishMemary_timer);
        this.finishMemary();
      }, time_long);
    },
    finishMemary: function() {
      clearTimeout(this.finishMemary_timer);
      wx.reLaunch({
        url: "../answer/main"
      });
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
  transform: rotate(-180deg);
}

.pocker-bg {
  height: tovmin(382);
  width: tovmin(248);
  position: absolute;
}
.pocker-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 196px;
  white-space: "nowrap";
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
