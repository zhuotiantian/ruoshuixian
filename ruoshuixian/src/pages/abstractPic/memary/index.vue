<template>
  <div class="container">
    <GameTitle :showIntervalTime='true' ref="title" :showFinishMemoryBtn="true" @finishMemary="finishMemary"></GameTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in number" :key="_index">
        <div class="image" v-for="(item,index) in rows" :key="index">
          <image class="image" :src="domain+item.img" lazy-load="true" />
        </div>
        <span style="margin-left:60rpx">row&nbsp;&nbsp;{{_index+1}}</span>
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
  data () {
    return {
      numberList: [],
      number: [],
      counts: 0,

      total: 0,
      per: 0,
      domain: this.$http.domain,
      level: "primary",
      numberList: []
    }
  },
  onLoad (option) {
    Object.assign(this.$data, this.$options.data())
    this.level = this.$store.state.level;
    this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
      return e.game_level == this.level
    })[0];
    this.numberList = this.rule.list.map((e, index) => {
      return {
        img: e,
        index: index
      }
    });
    this.total = this.rule.number;
    this.per = this.rule.number_per_group;
    let number = [];
    for (var i = 0; i < this.total; i += this.per) {
      let arr = this.numberList.slice(i, i + this.per);
      arr.sort(() => {
        return Math.random() > 0.5 ? -1 : 1
      })
      number.push(arr);
    };
    this.number = number.filter(e => {
      return e.length > 0
    });
  },
  methods: {
    finishMemary: function () {
      let sort = this.number.reduce((current, next) => {
        return current.concat(next.map(e => {
          return e.index
        }));
      }, [])
      wx.reLaunch({
        url: "../answer/main?list=" + JSON.stringify(this.numberList) + "&sort=" + JSON.stringify(sort)
      });
    }
  }
}
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
  margin-top: tovmin(160);
  margin-left: tovmin(230);
  margin-top: tovmin(180);
}

.row {
  display: flex;
  width: 80%;
  margin: 0 auto;
  height: tovmin(140);
  line-height: tovmin(140);
  color: $grey-text;
  margin-bottom: tovmin(44);
}

.image {
  height: tovmin(140);
  width: tovmin(140);
  background: white;
  margin-right: tovmin(50);
}
</style>
