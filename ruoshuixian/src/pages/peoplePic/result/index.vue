<template>
  <div class="container">
    <GameTitle :isResult="true"></GameTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in number" :key="_index">
        <div class="image_div" v-for="(item,index) in rows" :key="index">
          <image class="image" :src="domain+item.avatar" />
          <span class="result_name name">{{item.name}}</span>
          <span :class="{answer:item.result==0,wrong:item.result==1}">{{item.result_name}}</span>
        </div>
        <span>row&nbsp;&nbsp;{{_index+1}}</span>
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
  onLoad (option) {
    Object.assign(this.$data, this.$options.data())
    this.init(option)
  },
  onShareAppMessage: function (res) {
    return {
      path: "pages/firstPage/main?id=" + this.userid,
      title: "人名头像，一起来玩吧！",
      success: function () {
        console.log("分享成功");
      },
      error: function () {
        console.log("分享失败");
      }
    }
  },
  data () {
    return {
      number: [],
      domain: this.$http.domain
    };
  },
  methods: {
    init: function (option) {
      let level = this.$store.state.level;
      this.result = this.$store.state.result.right_and_wrong_results;
      let rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == level
      })[0];
      this.userid = this.$store.state.userInfo.id;
      let list = JSON.parse(option.list);
      let numberList = list.map((e, index) => {
        return {
          name: this.result[index].name,
          result_name: this.result[index].result_name,
          avatar: e.avatar,
          result: this.result[index].result
        }
      });
      let total = rule.number, per = rule.number_per_group, number = [];
      for (var i = 0; i < total; i += per) {
        number.push(numberList.slice(i, i + per));
      };
      this.number = number.filter(e => {
        return e.length > 0
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
  margin-left: tovmin(180);
  margin-top: tovmin(230);
}

.row {
  display: flex;
  width: 80%;
  margin: 0 auto;
  height: tovmin(200);
  color: $grey-text;
  margin-bottom: tovmin(44);
}

.row > span {
  line-height: tovmin(200);
}

.image_div {
  height: tovmin(200);
  width: tovmin(200);
  margin-right: tovmin(40);
  text-align: center;
  position: relative;
}

.image {
  height: tovmin(140);
  width: tovmin(140);
  background: white;
}

.name {
  text-align: center;
  height: tovmin(40);
  line-height: tovmin(40) !important;
  display: block;
}

.result_name {
  color: white;
}

.answer {
  color: $green;
  border-bottom: tovmin(2) solid $green;
}
.wrong {
  color: $red;
  border-bottom: tovmin(2) solid $red;
  min-width: tovmin(40);
  min-height: tovmin(40);
  display: block;
}
</style>
