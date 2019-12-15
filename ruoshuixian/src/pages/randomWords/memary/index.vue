<template>
  <div class="container">
    <GameTitle :showIntervalTime='true' ref="title" :showFinishMemoryBtn="true" @finishMemary="finishMemary" :showChangePageBtn="true" @nextPage="nextPage" @prevPage="prevPage"></GameTitle>
    <div class="list">
      <div class="item-list" v-for="(columns,index) in list" :key="index+1">
        <span v-for="(item,_index) in columns" :key="_index+1"><span>{{item.index+1}}</span>&nbsp;&nbsp;&nbsp;<span>{{item.words}}</span></span>
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
    Object.assign(this.$data, this.$options.data())
    let level = this.$store.state.level;
    this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
      return e.game_level == level
    })[0];
    this.sliceList(0, 100);
  },
  data () {
    return {
      list: [],
      level: "primary",
      per: 0,
      type: "下一页"
    };
  },
  methods: {
    sliceList: function (start, end) {
      let per = this.rule.number_per_group;
      let total = this.rule.number;
      let list = [];
      let wordsList = this.rule.list.map((e, index) => {
        return {
          words: e,
          index: index
        }
      }).slice(start, end);
      for (var i = 0; i < total; i += per) {
        list.push(wordsList.slice(i, i + per));
      }
      this.list = list;
      this.per = per;
    },
    nextPage: function () {
      this.sliceList(100, 200);
      wx.pageScrollTo({
        scrollTop: 0
      })
    },
    prevPage: function () {
      this.sliceList(0, 100);
      wx.pageScrollTo({
        scrollTop: 0
      })
    },
    finishMemary: function () {
      wx.reLaunch({
        url: "../answer/main"
      });
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
  margin: tovmin(180) tovmin(30) tovmin(30) tovmin(30);
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
}
.list > span > span {
  border: tovmin(2) solid $blue-border;
  text-align: center;
}
</style>
