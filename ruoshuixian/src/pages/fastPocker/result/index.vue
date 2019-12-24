<template>
  <div class="container">
    <GameTitle :isResult="true" :showCorrectAnswerBtn="true" @showCorrectAnswer="showCorrectAnswer" @showMyAnswerHandler="showMyAnswerHandler"></GameTitle>
    <div class="list" v-if="isShowCorrectAnswer">
      <em class="arrow arrow-left" @click="prevGroup"></em>
      <div :style="{width:(pockerNumber-1)*40+124+'rpx',height:'196px','white-space':'nowrap','position':'relative'}">
        <image class="pocker" ref="pocker" v-for="(item,index) in showCorrectResult[correctCurrentGroupIndex]" :style="{left:index*40+'rpx','z-index':index}" :key="index" :src="'/static/images/pocker/'+(item.index)+'-'+item.color+'.png'" />
      </div>
      <em class="arrow arrow-right" @click="nextGroup"></em>
    </div>
    <div class="list" v-else>
      <em class="arrow arrow-left" @click="prevGroup"></em>
      <div :style="{width:(pockerNumber-1)*40+124+'rpx',height:'196px','white-space':'nowrap','position':'relative'}">
        <image :class="{pocker:true,trueResult:item.trueResult,wrong:!item.trueResult}" ref="pocker" v-for="(item,index) in pocker[currentGroupIndex]" :style="{left:index*40+'rpx','z-index':index}" :key="index" :src="'/static/images/pocker/'+(item.index)+'-'+item.color+'.png'" />
      </div>
      <em class="arrow arrow-right" @click="nextGroup"></em>
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
      pockerCount: 23,
      left: 100,
      userid: null,
      currentGroupIndex: 0,
      correctCurrentGroupIndex: 0,
      pocker: [],
      pockerNumber: 0,
      isShowCorrectAnswer: false,
      correct_result: [],
      showCorrectResult: [],
    };
  },
  onLoad () {
    let userInfo = this.$store.state.userInfo;
    this.userid = userInfo.id;
    this.pockerNumber = this.$store.state.pockerNumber;
    this.correct_result = this.$store.state.result.correct_result;
    let user_result = this.$store.state.result.right_and_wrong_results;
    user_result.forEach((e, _index) => {
      e.trueResult = false;
      if (e.index === this.correct_result[_index].index && e.color === this.correct_result[_index].color) {
        e.trueResult = true;
      }
    })
    this.pocker = [];
    for (var i = 0; i < user_result.length; i + this.pockerNumber) {
      this.pocker.push(user_result.splice(i, i + this.pockerNumber));
    }
    for (var i = 0; i < this.correct_result.length; i + this.pockerNumber) {
      this.showCorrectResult.push(this.correct_result.splice(i, i + this.pockerNumber));
    }
  },
  onShareAppMessage: function (res) {
    return {
      path: "pages/firstPage/main?id=" + this.userid,
      title: "快速扑克牌，一起来玩吧！",
      success: function () {
        console.log("分享成功");
      },
      error: function () {
        console.log("分享失败");
      }
    }
  },
  methods: {
    prevGroup: function () {
      if (this.isShowCorrectAnswer) {
        if (this.correctCurrentGroupIndex > 0) {
          this.correctCurrentGroupIndex--;
        }
      } else {
        if (this.currentGroupIndex > 0) {
          this.currentGroupIndex--;
        }
      }

    },
    nextGroup: function () {
      if (this.isShowCorrectAnswer) {
        if (this.correctCurrentGroupIndex < this.showCorrectResult.length - 1) {
          this.correctCurrentGroupIndex++;
        }
      } else {
        if (this.currentGroupIndex < this.pocker.length - 1) {
          this.currentGroupIndex++;
        }
      }

    },
    showCorrectAnswer: function () {
      this.isShowCorrectAnswer = true;
    },
    showMyAnswerHandler: function () {
      this.isShowCorrectAnswer = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  text-align: center;
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
.wrong {
  border: tovmin(4) solid $red;
}
.trueResult {
  border: tovmin(4) solid $green;
}
</style>
