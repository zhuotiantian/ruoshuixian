<template>
  <div class="container">
    <CardTitle isResult="true" isPocker="true" showTime="false"></CardTitle>
    <div class="list">
      <em class="arrow arrow-left" @click="prevGroup"></em>
      <div :style="{width:(pockerNumber-1)*40+124+'rpx',height:'196px','white-space':'nowrap','position':'relative'}">
        <image class="pocker" ref="pocker" v-for="(item,index) in pocker[currentGroupIndex]" :style="{left:index*40+'rpx','z-index':index}" :key="index" :src="'/static/images/pocker/'+(item.index)+'-'+item.color+'.png'" />
      </div>
      <em class="arrow arrow-right" @click="nextGroup"></em>
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
      pockerCount: 23,
      left: 100,
      userid: null,
      currentGroupIndex: 0,
      pocker: [],
      pockerNumber: 0
    };
  },
  onLoad () {
    let userInfo = this.$store.state.userInfo;
    this.userid = userInfo.id;
    let correct_result = this.$store.state.result.correct_result;
    this.pockerNumber = this.$store.state.pockerNumber;
    this.pocker = [];
    if (correct_result) {
      for (var i = 0; i < correct_result.length; i + this.pockerNumber) {
        this.pocker.push(correct_result.splice(i, i + this.pockerNumber));
      }
    }
  },
  onShareAppMessage: function (res) {
    return {
      path: "pages/firstPage/main?id=" + this.userid,
      title: "闪视扑克牌，一起来玩吧！",
      success: function () {
        console.log("分享成功");
      },
      error: function () {
        console.log("分享失败");
      }
    }
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
  height: auto;
  height: tovmin(30);
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
