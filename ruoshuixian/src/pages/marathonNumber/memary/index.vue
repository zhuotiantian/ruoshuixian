<template>
  <div class="container">
    <GameTitle :showIntervalTime='true' ref="title" :showFinishMemoryBtn="true" @finishMemary="finishMemary"></GameTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in number" :key="_index">
        <span class="item" v-for="(item,index) in rows" :key="index">{{item}}</span>
        <span style="width:50px">row&nbsp;&nbsp;{{_index+1}}</span>
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
  onLoad(option) {
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  data() {
    return {
      number: []
    };
  },
  onReachBottom: function(e) {
    if (this.lastIndex < this.allNumber.length) {
      // 获取滚动条当前位置
      this.number = this.number.concat(
        this.allNumber.slice(this.lastIndex, this.lastIndex + 10)
      );
      this.lastIndex += 10;
    }
  },
  methods: {
    init: function() {
      let level = this.$store.state.level;
      let rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == level;
      })[0];
      let numberList = this.$store.state.ruleList.list,
        total = rule.number,
        per = rule.number_per_group,
        number = [];
      for (var i = 0; i < total; i += per) {
        number.push(numberList.slice(i, i + per));
      }
      this.allNumber = number;
      this.number = number.slice(0, 10);
      this.lastIndex = 10;
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
  height: calc(100% - 150px) !important;
}

.container {
  background: $deep-blue;
  color: white;
  height: calc(100% - 150px);
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
