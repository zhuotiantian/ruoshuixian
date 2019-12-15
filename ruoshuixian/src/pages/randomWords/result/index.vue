<template>
  <div class="container">
    <GameTitle ref="title" :isResult="true" :showChangePageBtn="true" @nextPage="nextPage" @prevPage="prevPage"></GameTitle>
    <div class="list">
      <div class="item-list" v-for="(columns,index) in list" :key="index+1">
        <span :class="{item:true, wrong:item.result==1}" v-for="(item,_index) in columns" :key="_index+1"><span>{{item.index+1}}</span>&nbsp;&nbsp;&nbsp;<span>{{item.words}}</span></span>
      </div>
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
    this.result = this.$store.state.result;

    let userInfo = this.$store.state.userInfo;
    this.userid = userInfo.id;
    this.sliceList(0, 100);
  },
  data () {
    return {
      list: [],
      userid: null,
      type: "下一页",
      showPrevPageBtn: false
    }
  },
  onShareAppMessage: function (res) {
    return {
      path: "pages/firstPage/main?id=" + this.userid,
      title: "随机词语，一起来玩吧！",
      success: function () {
        console.log("分享成功");
      },
      error: function () {
        console.log("分享失败");
      }
    }
  },
  methods: {
    sliceList: function (start, end) {
      let level = this.$store.state.level;
      this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == level
      })[0];
      let per = this.rule.number_per_group;
      let total = this.rule.number;
      this.list = this.result.right_and_wrong_results;
      let list = [];
      let wordsList = this.list.map((e, index) => {
        return {
          words: this.result.correct_result[index],
          result: e.result,
          index: index
        }
      }).slice(start, end);
      for (var i = 0; i < total; i += per) {
        list.push(wordsList.slice(i, i + per));
      }
      this.list = list;
      console.log(list);

      this.per = per;
    },
    nextPage: function () {
      this.sliceList(100, 200);
      this.showPrevPageBtn = true;
    },
    prevPage: function () {
      this.sliceList(0, 100);
      this.showPrevPageBtn = false;
    },
  }
}
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

.list {
  margin: tovmin(150) tovmin(30) tovmin(30) tovmin(30);
}

.list {
  display: grid;
  grid-template-columns: tovmin(250) tovmin(250) tovmin(250) tovmin(250) tovmin(
      250
    );
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
