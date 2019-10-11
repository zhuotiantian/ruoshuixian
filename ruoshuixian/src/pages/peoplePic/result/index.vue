<template>
  <div class="container">
    <CardTitle :isResult="true"></CardTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in number" :key="_index">
        <div class="image_div" v-for="(item,index) in rows" :key="index">
          <image class="image" :src="domain+item.avatar" />
          <span class="result name">{{item.name}}</span>
          <span :class="{answer:item.result==0,wrong:item.result==1, name:true}">{{item.result_name}}</span>
        </div>
        <span>row&nbsp;&nbsp;{{_index+1}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import CardTitle from "@/components/gameTitle";
export default {
  components: {
    CardTitle
  },
  onLoad (option) {
    Object.assign(this.$data, this.$options.data())
    let level = this.$store.state.level;
    this.result = this.$store.state.result.right_and_wrong_results;
    this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
      return e.game_level == level
    })[0];
    let userInfo = this.$store.state.userInfo;
    this.userid = userInfo.id;
    this.numberList = this.rule.list.xing_name.map((e, index) => {
      return {
        name: e + this.rule.list.ming_name[index],
        result_name: this.result[index].result_name,
        avatar: this.rule.list.avatar[index],
        result: this.result[index].result
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

.row > span {
  line-height: tovmin(200);
}

.image_div {
  height: tovmin(200);
  width: tovmin(200);
  margin-right: tovmin(40);
  text-align: center;
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

.result {
  color: white;
}

.answer {
  color: $green;
  border-bottom: tovmin(2) solid $green;
}
.wrong {
  color: $red;
  border-bottom: tovmin(2) solid $red;
}
</style>