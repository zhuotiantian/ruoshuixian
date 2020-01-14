<template>
  <div class="container">
    <GameTitle :isResult="true" :showCorrectAnswerBtn="showCorrectBtn" :showMyAnswer="showMyAnswer" @showCorrectAnswer="showCorrectAnswer" @showMyAnswerHandler="showMyAnswerHandler"></GameTitle>
    <div class="list" v-if="isShowCorrectAnswer">
      <scroll-view :style="{width:'78%','height':'100%','white-space':'nowrap','margin':'0 auto','flex':'10'}" scroll-x="true">
        <div class="pocker-wrapper" style="width:97%">
          <image class="pocker" ref="pocker" v-for="(item,index) in showCorrectResult" :style="{left:index*20+'px','z-index':index}" :key="index" :src="'/static/images/pocker/'+(item.index)+'-'+item.color+'.png'" />
        </div>
      </scroll-view>
    </div>
    <div class="list" v-else>
      <scroll-view :style="{width:'78%','height':'100%','white-space':'nowrap','margin':'0 auto','flex':'10'}" scroll-x="true">
        <div class="pocker-wrapper" :style="{width:(pocker.length<52?((pocker.length-1)*20+124+'px'):'97%'),'max-width':'97%'}">
          <image :class="{pocker:true,trueResult:item.trueResult,wrong:!item.trueResult}" ref="pocker" v-for="(item,index) in pocker" :style="{left:index*20+'px','z-index':index}" :key="index" :src="'/static/images/pocker/'+(item.index)+'-'+item.color+'.png'" />
        </div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
import GameTitle from "@/components/gameTitle_new";
export default {
  components: {
    GameTitle
  },
  data() {
    return {
      pockerCount: 23,
      left: 100,
      userid: null,
      pocker: [],
      isShowCorrectAnswer: false,
      correct_result: [],
      showCorrectResult: [],
      showCorrectBtn: true,
      showMyAnswer: false
    };
  },
  onLoad() {
    let userInfo = this.$store.state.userInfo;
    this.userid = userInfo.id;
    this.correct_result = this.$store.state.result.correct_result;
    let user_result = this.$store.state.result.right_and_wrong_results;
    user_result.forEach((e, _index) => {
      e.trueResult = false;
      if (
        e.index === this.correct_result[_index].index &&
        e.color === this.correct_result[_index].color
      ) {
        e.trueResult = true;
      }
    });
    this.pocker = user_result;
    this.showCorrectResult = this.correct_result;
    this.isShowCorrectAnswer = false;
  },
  onShareAppMessage: function(res) {
    return {
      path: "pages/firstPage/main?id=" + this.userid,
      title: "快速扑克牌，一起来玩吧！",
      success: function() {
        console.log("分享成功");
      },
      error: function() {
        console.log("分享失败");
      }
    };
  },
  methods: {
    prevGroup: function() {
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
    nextGroup: function() {
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
    showCorrectAnswer: function() {
      this.showMyAnswer = true;
      this.showCorrectBtn = false;
      this.isShowCorrectAnswer = true;
    },
    showMyAnswerHandler: function() {
      this.showMyAnswer = false;
      this.showCorrectBtn = true;
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
  height: 58vmin;
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
.pocker-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 196px;
  white-space: "nowrap";
}
</style>
