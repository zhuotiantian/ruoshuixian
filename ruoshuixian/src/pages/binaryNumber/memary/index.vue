<template>
  <div class="container">
    <GameTitle :showShowType="true" :showIntervalTime='true' ref="title" @group="group" :showFinishMemoryBtn="true" @finishMemary="finishMemary"></GameTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in number" :key="_index">
        <div v-for="(item,index) in rows" :key="index" :class="{item:true,border:counts&&((index+1)%counts==0)&&(index+1)!=rows.length}">
          <span>{{item}}</span>
        </div>
        <span style="width:50rpx">row&nbsp;&nbsp;{{_index+1}}</span>
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
  },
  data() {
    return {
      number: [],
      counts: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      wx.showLoading({
        title: "加载中"
      });
      let level = this.$store.state.level;
      let rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == level;
      })[0];
      let numberList = this.$store.state.ruleList.list;
      let total = rule.number,
        per = rule.number_per_group,
        number = [];
      for (var i = 0; i < total; i += per) {
        number.push(numberList.slice(i, i + per));
      }
      this.allNumber = number;
      this.number = number.slice(0, 10);
      this.lastIndex = 10;
      wx.hideLoading();
    },
    group: function(data) {
      if (data == "三个一组") {
        this.counts = 3;
      } else if (data == "六个一组") {
        this.counts = 6;
      } else {
        this.counts = 0;
      }
    },
    finishMemary: function() {
      wx.reLaunch({
        url: "/pages/numberAnswer/main"
      });
    }
  },
  onReachBottom: function(e) {
    if (this.lastIndex < this.allNumber.length) {
      // 获取滚动条当前位置
      this.number = this.number.concat(
        this.allNumber.slice(this.lastIndex, this.lastIndex + 10)
      );
      this.lastIndex += 10;
    }
  }
};
</script>
<style lang="scss" scoped>
page {
  height: calc(100% - 150rpx) !important;
}

.container {
  background: $deep-blue;
  color: white;
  height: calc(100% - 150rpx);
}

.list {
  margin-top: tovmin(150);
  margin-bottom: tovmin(30);
}

.row {
  display: flex;
  width: 80%;
  margin: 0 auto;
  height: tovmin(60);
  line-height: tovmin(60);
  color: $grey-text;
}

.item {
  flex: 1;
  border-right: none;
  height: tovmin(60);
  line-height: tovmin(60);
  width: tovmin(28);
  text-align: center;
  box-sizing: border-box;
}

.item.border {
  border-right: tovmin(2) solid white;
}

.item:nth-last-child(2) {
  margin-right: tovmin(20);
}

.pannel {
  height: tovmin(510) !important;
  background: red;
}
</style>
