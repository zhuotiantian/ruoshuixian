<template>
  <div class="container">
    <div class="fog" v-if="showFog"></div>
    <alertBox text="确定结束作答吗？" v-if="showFog" @hideFog="hideFog" @confirm="confirm"></alertBox>
    <GameTitle :showIntervalTime='true' :showFinishAnwserBtn="true" @finishAnwser="finishAnwser"></GameTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in number" :key="_index">
        <div class="image_div" v-for="(item,index) in rows" :key="index">
          <image class="image" :src="domain+item.avatar" lazy-load="true" />
          <input type="text" class="input" placeholder="姓" v-model="item.xing_name" />
          <input type="text" class="input" placeholder="名" v-model="item.ming_name" />
        </div>
        <span class="rowName">row&nbsp;&nbsp;{{_index+1}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import GameTitle from "@/components/gameTitle_new";
import alertBox from "@/components/alertBox";
export default {
  components: {
    GameTitle,
    alertBox
  },
  onLoad (option) {
    Object.assign(this.$data, this.$options.data())
    this.init();
  },
  data () {
    return {
      number: [],
      counts: 0,
      showFog: false,
      domain: this.$http.domain
    }
  },
  methods: {
    init: function () {
      let level = this.$store.state.level;
      let rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == level
      })[0];;
      let list = this.$store.state.ruleList.list;
      let numberList = list.xing_name.map((e, index) => {
        return {
          xing_name: "",
          ming_name: "",
          avatar: list.avatar[index]
        };
      }).sort(e => {
        return Math.random() > 0.5 ? 1 : -1
      });
      let total = rule.number, per = rule.number_per_group, number = [];
      for (var i = 0; i < this.total; i += per) {
        number.push(numberList.slice(i, i + per));
      }
      this.number = number.filter(e => {
        return e.length > 0;
      });
      this.startTime = new Date().getTime();
    },
    finishAnwser: function () {
      this.showFog = true;
    },
    hideFog: function () {
      this.showFog = false;
    },
    confirm: function () {
      let endTime = new Date().getTime(), xing_name = [], ming_name = [], avatar = [], token = this.$store.state.userInfo.token, game_records_id = this.$store.state.ruleList.game_records_id;
      this.number.forEach(e => {
        e.forEach(m => {
          xing_name.push(m.xing_name);
          ming_name.push(m.ming_name);
          avatar.push(m.avatar);
        });
      });
      this.$http
        .post({
          url: "/api/wxapp.game/submitTheGame",
          data: {
            game_records_id,
            game_time: (endTime - this.startTime) / 1000,
            content: JSON.stringify({
              xing_name,
              ming_name,
              avatar
            }),
          },
          header: {
            token
          }
        })
        .then(result => {
          if (result.code == 1) {
            this.$store.commit("setResult", result.data);
            wx.reLaunch({
              url: "../result/main?list=" + JSON.stringify(this.numberList)
            })
          } else {
            wx.showToast({
              title: result.msg,
              icon: "none"
            });
          }
        });
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
  margin-top: tovmin(200);
  margin-left: tovmin(180);
  margin-top: tovmin(230);
}

.row {
  display: flex;
  width: 80%;
  margin: 0 auto;
  height: 30.66667vmin;
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
  width: 40%;
  margin-right: tovmin(10);
}
</style>
