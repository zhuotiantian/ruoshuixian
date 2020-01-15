<template>
  <div class="container">
    <GameTitle :showIntervalTime='true' ref="title" :showFinishMemoryBtn="true" @finishMemary="finishMemary"></GameTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in number" :key="_index">
        <div class="image" v-for="(item,index) in rows" :key="index">
          <image class="image" :src="domain+item.avatar" lazy-load="true" />
          <span class="name">{{item.xing_name}}<span style="position:relative;font-size:20px;font-weight:bold">·</span>{{item.ming_name}}</span>
        </div>
        <span class="rowName">row&nbsp;&nbsp;{{_index+1}}</span>
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
      number: [],
      domain: this.$http.domain
    };
  },
  methods: {
    init: function() {
      let level = this.$store.state.level,
        list = this.$store.state.ruleList.list;
      let rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == level;
      })[0];
      let numberList = list.xing_name.map((e, index) => {
        return {
          xing_name: e,
          ming_name: list.ming_name[index],
          avatar: list.avatar[index]
        };
      });
      let total = rule.number,
        per = rule.number_per_group,
        number = [];
      for (var i = 0; i < total; i += per) {
        number.push(numberList.slice(i, i + per));
      }
      this.number = number.filter(e => {
        return e.length > 0;
      });
    },
    finishMemary: function() {
      wx.reLaunch({
        url: "../answer/main"
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
  margin-left: tovmin(200);
}

.row {
  display: flex;
  width: 80%;
  margin: 0 auto;
  height: tovmin(200);
  color: $grey-text;
  margin-bottom: tovmin(44);
  text-align: center;
}

.rowName {
  height: tovmin(140);
  line-height: tovmin(140);
}

.image {
  height: tovmin(140);
  width: tovmin(140);
  background: white;
  margin-right: tovmin(40);
}

.name {
  height: tovmin(40);
  line-height: tovmin(40) !important;
  color: white;
}
</style>
