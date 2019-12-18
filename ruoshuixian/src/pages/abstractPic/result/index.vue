<template>
  <div class="container">
    <GameTitle :isResult="true"></GameTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in number" :key="_index">
        <div class="image_div" v-for="(item,index) in rows" :key="index">
          <image class="image" :src="domain+item.image" />
          <span class="input">{{item.text}}</span>
          <image class="icon" v-if="item.result==0" :src="'/static/images/my/select.png'" />
          <image class="icon" v-else :src="'/static/images/my/wrong.png'" />
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
  onLoad () {
    Object.assign(this.$data, this.$options.data())
    let level = this.$store.state.level;
    let userInfo = this.$store.state.userInfo;
    this.userid = userInfo.id;
    this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
      return e.game_level == level
    })[0];
    this.result = this.$store.state.result.right_and_wrong_results;
    let number = [];
    this.numberList = this.rule.list.map((e, index) => {
      return {
        image: e,
        text: this.result[index].number,
        result: this.result[index].result
      }
    });
    let total = this.rule.number;
    let per = this.rule.number_per_group;
    for (var i = 0; i < total; i += per) {
      number.push(this.numberList.slice(i, i + per));
    }
    this.number = number.filter(e => {
      return e.length > 0;
    });
  },
  onShareAppMessage: function (res) {
    return {
      path: "pages/firstPage/main?id=" + this.userid,
      title: "抽象图形，一起来玩吧！",
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
      domain: this.$http.domain,
      userid: null
    };
  },
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

.row span {
  line-height: tovmin(200);
}

.image_div {
  height: tovmin(200);
  width: tovmin(200);
  margin-right: tovmin(40);
  text-align: center;
}

.index {
  width: tovmin(30);
  height: tovmin(30);
  border-radius: tovmin(30);
  background: $yellow;
  display: inline-block;
  position: relative;
  top: tovmin(-50);
  left: tovmin(98);
  font-size: tovmin(26);
  line-height: tovmin(30) !important;
  color: $black;
  text-align: center;
}

.image {
  height: tovmin(140);
  width: tovmin(140);
  background: white;
}

.input {
  border-bottom: tovmin(2) solid $grey-text;
  color: $grey-text;
  height: tovmin(40);
  line-height: tovmin(40) !important;
  display: inline-block;
  width: tovmin(88);
}

.icon {
  height: tovmin(28);
  width: tovmin(32);
  float: right;
  margin-right: tovmin(30);
  position: absolute;
}
</style>