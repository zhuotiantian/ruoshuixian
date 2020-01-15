<template>
  <div class="container">
    <GameTitle ref="title" :isResult="true" :showCorrectAnswerBtn="showCorrectBtn" :showMyAnswer="showMyAnswer" @showCorrectAnswer="showCorrectAnswer" @showMyAnswerHandler="showMyAnswerHandler" :showChangePageBtn="true" @nextPage="nextPage" @prevPage="prevPage"></GameTitle>
    <div class="list">
      <scroll-view :style="{height:'94vmin'}" :scroll-y="true" :scroll-top="scrollTop">
        <div class="list-wrapper" v-if="showMyAnswer">
          <div class="item-list" v-for="(columns,index) in correct_result" :key="index+1">
            <span :class="{item:true}" v-for="(item,_index) in columns" :key="_index+1"><span>{{index+1}}</span>&nbsp;&nbsp;&nbsp;<span>{{item}}</span></span>
          </div>
        </div>
        <div class="list-wrapper" v-else>
          <div class="item-list" v-for="(columns,index) in list" :key="index+1">
            <span :class="{item:true, wrong:item.result==1}" v-for="(item,_index) in columns" :key="_index+1"><span>{{item.index+1}}</span>&nbsp;&nbsp;&nbsp;<span>{{item.number}}</span></span>
          </div>
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
  onLoad() {
    Object.assign(this.$data, this.$options.data());
    this.result = this.$store.state.result;
    this.sliceList(0, 100);
  },
  data() {
    return {
      list: [],
      userid: null,
      showPrevPageBtn: false,
      scrollTop: -1,
      showCorrectBtn: true,
      showMyAnswer: false,
      correct_result: []
    };
  },
  onShareAppMessage: function(res) {
    let userid = this.$store.state.userInfo.id;
    return {
      path: "pages/firstPage/main?id=" + userid,
      title: "随机词语，一起来玩吧！",
      success: function() {
        console.log("分享成功");
      },
      error: function() {
        console.log("分享失败");
      }
    };
  },
  methods: {
    sliceList: function(start, end) {
      let level = this.$store.state.level;
      let rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == level;
      })[0];
      let per = rule.number_per_group,
        total = rule.number,
        right_and_wrong_results = this.result.right_and_wrong_results,
        list = [],
        correct_result = this.result.correct_result,
        list1 = [];
      let wordsList = right_and_wrong_results
        .map((e, index) => {
          return {
            number: e.number,
            result: e.result,
            index: index
          };
        })
        .slice(start, end);
      for (var i = 0; i < total; i += per) {
        list.push(wordsList.slice(i, i + per));
        list1.push(correct_result.slice(i, i + per));
      }
      this.list = list;
      this.correct_result = list1;
    },
    nextPage: function() {
      this.sliceList(100, 200);
      this.scrollTop = -999;
      this.scrollTop = 0;
      this.showPrevPageBtn = true;
    },
    prevPage: function() {
      this.sliceList(0, 100);
      this.scrollTop = -999;
      this.scrollTop = 0;
      this.showPrevPageBtn = false;
    },
    showCorrectAnswer: function() {
      this.showMyAnswer = true;
      this.showCorrectBtn = false;
      this.scrollTop = -999;
      this.scrollTop = 0;
    },
    showMyAnswerHandler: function() {
      this.showMyAnswer = false;
      this.showCorrectBtn = true;
      this.scrollTop = -999;
      this.scrollTop = 0;
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  background: $deep-blue;
  color: white;
}

.title {
  font-size: tovmin(30);
  display: flex;
  justify-content: space-between;
  margin: tovmin(40) tovmin(30) 0 tovmin(30);
}

.list-wrapper {
  display: grid;
  grid-template-columns: tovmin(250) tovmin(250) tovmin(250) tovmin(250) tovmin(
      250
    );
  margin: tovmin(150) tovmin(30) tovmin(30) tovmin(30);
  grid-gap: tovmin(20);
  font-size: tovmin(26);
  justify-content: center;
  align-items: center;
  color: $grey-text;
}
.item-list {
  display: grid;
  grid-template-columns: tovmin(250);
  grid-gap: tovmin(20);
  font-size: tovmin(26);
  justify-content: center;
  align-items: center;
}
.list > span {
  display: flex;
  border: tovmin(2) solid $blue-border;
  text-align: center;
  min-height: tovmin(36);
}
.list > span > span {
  border: tovmin(2) solid $blue-border;
  text-align: center;
}
.wrong {
  color: $grey-text;
  background: $red;
}
</style>
