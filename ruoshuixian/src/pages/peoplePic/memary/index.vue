<template>
  <div class="container">
    <CardTitle :seconds="seconds" :minutes="minutes" type="记忆完成" @finishMemary="finishMemary"></CardTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in number" :key="_index">
        <div class="image" v-for="(item,index) in rows" :key="index">
          <image class="image" :src="domain+item.avatar" />
          <span class="name">{{item.name}}</span>
        </div>
        <span class="rowName">row&nbsp;&nbsp;{{_index+1}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import CardTitle from "@/components/gameTitle"
export default {
  components: {
    CardTitle
  },
  onLoad (option) {
    Object.assign(this.$data, this.$options.data())
    let level = this.$store.state.level;
    this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
      return e.game_level == level
    })[0];
    this.numberList = this.rule.list.xing_name.map((e, index) => {
      return {
        name: e + this.rule.list.ming_name[index],
        avatar: this.rule.list.avatar[index]
      }
    });
    let total = this.rule.number;
    let per = this.rule.number_per_group;
    let number = [];
    for (var i = 0; i < total; i += per) {
      number.push(this.numberList.slice(i, i + per));
    };
    this.number = number.filter(e => {
      return e.length > 0
    });
  },
  data () {
    return {
      number: [],
      numberList: [],
      counts: 0,

      total: 0,
      per: 0,
      domain: this.$http.domain,
      level: "primary"
    }
  },
  methods: {
    finishMemary: function () {
      wx.reLaunch({
        url: "../answer/main"
      })
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
  margin-top: tovmin(200);
  margin-left: tovmin(230);
  margin-top: tovmin(230);
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