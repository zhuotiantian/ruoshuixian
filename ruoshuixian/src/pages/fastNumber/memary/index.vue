<template>
  <div class="container">
    <GameTitle :showIntervalTime='true' ref="title" :showFinishMemoryBtn="true" @finishMemary="finishMemary"></GameTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in number" :key="_index">
        <span class="item" v-for="(item,index) in rows" :key="index">{{item}}</span>
        <span style="width:25px">row&nbsp;&nbsp;{{_index+1}}</span>
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
  onLoad() {
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  data() {
    return {
      number: []
    };
  },
  methods: {
    init: function() {
      let level = this.$store.state.level;
      let rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == level;
      })[0];
      let total = rule.number,
        per = rule.number_per_group,
        number = [];
      let numberList = this.$store.state.ruleList.list;
      for (var i = 0; i < total; i += per) {
        number.push(numberList.slice(i, i + per));
      }
      this.number = number;
    },
    finishMemary: function() {
      wx.reLaunch({
        url: "/pages/numberAnswer/main"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
page {
  height: calc(100% - 75px) !important;
}

.container {
  background: $deep-blue;
  color: white;
  height: calc(100% - 75px);
}

.list {
  margin-top: tovmin(200);
}

.row {
  display: flex;
  width: 80%;
  margin: 0 auto;
  margin-bottom: tovmin(30);
  color: $grey-text;
}

.item {
  flex: 1;
  border-right: none;
  height: tovmin(40);
  width: tovmin(28);
  text-align: center;
}

.item:nth-last-child(2) {
  margin-right: tovmin(20);
}
</style>
