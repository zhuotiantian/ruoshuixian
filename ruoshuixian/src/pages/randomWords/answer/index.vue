<template>
  <div class="container">
    <div class="fog" v-if="showFog"></div>
    <alertBox :text="text" v-if="showFog" @hideFog="hideFog" @confirm="confirm"></alertBox>
    <GameTitle :showIntervalTime='true' ref="title" :showFinishAnwserBtn="true" @finishAnwser="finishAnwser" :showChangePageBtn="true" @nextPage="nextPage" @prevPage="prevPage"></GameTitle>
    <div class="list">
      <scroll-view :style="{height:'94vmin'}" :scroll-y="true" :scroll-top="scrollTop">
        <div class="list-wrapper">
          <div class="item-list" v-for="(columns,index) in list[pageIndex]" :key="index+1">
            <span v-for="(item,_index) in columns" :key="_index+1"><span>{{item.index+1}}</span>&nbsp;&nbsp;&nbsp;<input type="text" class="input" v-model="item.text"></span>
          </div>
        </div>
      </scroll-view>
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
  onLoad() {
    Object.assign(this.$data, this.$options.data());
    this.init();
  },
  data() {
    return {
      list: [],
      showFog: false,
      text: "确定结束作答吗？",
      pageIndex: 0,
      scrollTop: -1
    };
  },
  methods: {
    init: function() {
      this.startTime = new Date().getTime();
      this.spliceList();
    },
    spliceList: function(start, end) {
      let level = this.$store.state.level;
      let rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == level;
      })[0];
      let per = rule.number_per_group;
      let total = rule.number;
      let list = [];
      let wordsList = this.$store.state.ruleList.list.map((e, index) => {
        return {
          text: "",
          index: index
        };
      });
      for (var i = 0; i < total; i += per) {
        list.push(wordsList.slice(i, i + per));
      }
      this.list = [list.slice(0, 5), list.slice(5, 10)];
      this.per = per;
    },
    nextPage: function() {
      this.scrollTop = -999;
      this.scrollTop = 0;
      this.pageIndex = 1;
    },
    prevPage: function() {
      this.scrollTop = -999;
      this.scrollTop = 0;
      this.pageIndex = 0;
    },
    finishAnwser: function() {
      this.showFog = true;
    },
    hideFog: function() {
      this.showFog = false;
    },
    confirm: function() {
      let endTime = new Date().getTime(),
        token = this.$store.state.userInfo.token,
        game_records_id = this.$store.state.ruleList.game_records_id,
        result = [],
        list = this.list[0].concat(this.list[1]);
      list.forEach(e => {
        e.forEach(m => {
          result.push(m.text);
        });
      });
      this.$http
        .post({
          url: "/api/wxapp.game/submitTheGame",
          data: {
            game_records_id,
            game_time: (endTime - this.startTime) / 1000,
            content: JSON.stringify(result)
          },
          header: {
            token
          }
        })
        .then(result => {
          if (result.code == 1) {
            this.$store.commit("setResult", result.data);
            wx.reLaunch({
              url: "../result/main"
            });
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
.container {
  background: $deep-blue;
  color: white;
}

.title {
  font-size: tovmin(30);
  display: flex;
  justify-content: space-between;
  margin: tovmin(40) tovmin(30) 0 tovmin(30);
}
.list {
  height: calc(100% - 120px);
}
.list-wrapper {
  display: grid;
  grid-template-columns: tovmin(250) tovmin(250) tovmin(250) tovmin(250) tovmin(
      200
    );
  grid-gap: tovmin(20);
  font-size: tovmin(26);
  justify-content: center;
  align-items: center;
  color: $grey-text;
  margin: 16vmin 4vmin 6vmin 4vmin;
  padding-bottom: 15px;
}
.item-list {
  display: grid;
  grid-template-columns: tovmin(250);
  grid-gap: tovmin(20);
  font-size: tovmin(26);
  justify-content: center;
  align-items: center;
}
.list > span {
  border: tovmin(2) solid $blue-border;
  text-align: center;
  display: inline-block;
}
.input {
  border-bottom: tovmin(2) solid $grey-text;
  display: inline-block;
  width: tovmin(134);
  font-size: tovmin(26);
}
</style>
