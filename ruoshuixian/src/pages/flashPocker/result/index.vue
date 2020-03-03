<template>
  <div class="container">
    <GameTitle :isResult="true" :showCorrectAnswerBtn="showCorrectBtn" :showMyAnswer="showMyAnswer" @showCorrectAnswer="showCorrectAnswer" @showMyAnswerHandler="showMyAnswerHandler"></GameTitle>
    <div class="list" v-if="isShowCorrectAnswer">
      <scroll-view :style="{width:'78%','height':'100%','white-space':'nowrap','margin':'0 auto','flex':'10'}" scroll-x="true">
        <div class="pocker-wrapper" :style="{width:(pocker.length<52?((pocker.length-1)*20+124+'px'):'97%'),'max-width':'97%'}">
          <image class="pocker" ref="pocker" v-for="(item, index) in correct_result" :style="{ left: index * 20 + 'px', 'z-index': index }" :key="index" :src="'/static/images/pocker/' + item.index + '-' + item.color + '.png'" />
        </div>
      </scroll-view>
    </div>
    <div class="list" v-else>
      <scroll-view :style="{width:'78%','height':'100%','white-space':'nowrap','margin':'0 auto','flex':'10'}" scroll-x="true">
        <div class="pocker-wrapper" :style="{width:(pocker.length<52?((pocker.length-1)*20+124+'px'):'97%'),'max-width':'97%'}">
          <image class="pocker" :class="{ trueResult: item.trueResult, wrong: !item.trueResult }" ref="pocker" v-for="(item, index) in pocker" :style="{ left: index * 20 + 'px', 'z-index': index }" :key="index" :src="'/static/images/pocker/' + item.index + '-' + item.color + '.png'" />
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
      pockerNumber: 0,
      isShowCorrectAnswer: false,
      correct_result: [],
      showCorrectBtn: true,
      showMyAnswer: false
    };
  },
  onLoad() {
    let userInfo = this.$store.state.userInfo;
    this.userid = userInfo.id;
    this.pockerNumber = this.$store.state.pockerNumber;
    this.correct_result = this.$store.state.result.correct_result.slice(
      0,
      this.pockerNumber
    );
    let user_result = this.$store.state.result.right_and_wrong_results;
    this.pocker = user_result;
    this.isShowCorrectAnswer = false;
    this.pocker.forEach((e, _index) => {
      e.trueResult = false;
      if (
        e.index === this.correct_result[_index].index &&
        e.color === this.correct_result[_index].color
      ) {
        e.trueResult = true;
      }
    });
  },
  onShareAppMessage: function(res) {
    return {
      path: "pages/firstPage/main?id=" + this.userid,
      title: "闪视扑克牌，一起来玩吧！",
      success: function() {
        console.log("分享成功");
      },
      error: function() {
        console.log("分享失败");
      }
    };
  },
  methods: {
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
  height: 60vmin;
  display: flex;
  justify-content: center;
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
.pocker-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  height: tovmin(392);
}
.wrong {
  border: tovmin(4) solid $red;
}
.trueResult {
  border: tovmin(4) solid $green;
}
</style>
