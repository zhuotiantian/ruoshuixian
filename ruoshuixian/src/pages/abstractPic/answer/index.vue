<template>
  <div class="container">
    <div class="fog" v-if="showFog"></div>
    <alertBox :text="text" v-if="showFog" @hideFog="hideFog" @confirm="confirm"></alertBox>
    <GameTitle :showIntervalTime='true' :showFinishAnwserBtn="true" @finishAnwser="finishAnwser"></GameTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in number" :key="_index">
        <div class="image_div" v-for="(item,index) in rows" :key="index">
          <image class="image" :src="domain+item.image" lazy-load="true"></image>
          <span :class="{input:true,active:item.selected}" @click="focus(_index,index)">{{item.text}}</span>
        </div>
        <span style="margin-left:25px">row&nbsp;&nbsp;{{_index+1}}</span>
      </div>
    </div>
    <Keybord :showKeybord="showKeybord" counts="5" @selectNumber="selectNumber" @deleteNumber="deleteNumber"></Keybord>
  </div>
</template>
<script>
import GameTitle from "@/components/gameTitle_new";
import Keybord from "@/components/Keybord";
import alertBox from "@/components/alertBox";
export default {
  components: {
    GameTitle,
    Keybord,
    alertBox
  },
  onLoad(option) {
    Object.assign(this.$data, this.$options.data());
    this.init(option);
  },
  data() {
    let array = new Array(5);
    let rows = new Array(3);
    return {
      text: "确定结束作答吗？",
      number: [],
      counts: 0,
      showFog: false,
      showKeybord: false,
      total: 0,
      per: 0,
      domain: this.$http.domain,
      numberList: []
    };
  },
  methods: {
    init: function(option) {
      let list = JSON.parse(option.list);
      let level = this.$store.state.level;
      this.token = this.$store.state.userInfo.token;
      let rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == level;
      })[0];
      let beforeSort = [],
        afterSort = [];
      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list[i].length; j++) {
          beforeSort.push({
            image: list[i][j].img,
            text: "",
            index: list[i][j].index,
            selected: false
          });
        }
      }
      this.beforeSort = beforeSort;
      let total = rule.number;
      let per = rule.number_per_group;
      for (var i = 0; i < total; i += per) {
        let arr = beforeSort.slice(i, i + per);
        arr.sort(e => {
          return Math.random() > 0.5 ? 1 : -1;
        });
        afterSort.push(arr);
      }
      this.number = afterSort.filter(e => {
        return e.length > 0;
      });
      this.afterSort = afterSort.concat().reduce((total, next) => {
        next.forEach(e => {
          total.push(e.index + 1);
        });
        return total;
      }, []);
      this.startTime = new Date().getTime();
      this.game_records_id = this.$store.state.ruleList.game_records_id;
    },
    finishAnwser: function() {
      this.showFog = true;
    },
    hideFog: function() {
      this.showFog = false;
    },
    focus: function(_index, index) {
      this.showKeybord = true;
      this._index = _index;
      this.index = index;
      this.number.forEach((e, i) => {
        e.forEach((m, j) => {
          if (i === _index && j === index) {
            m.selected = true;
          } else {
            m.selected = false;
          }
        });
      });
    },
    confirm: function() {
      this.endTime = new Date().getTime();
      let new_game_list = [];
      this.number.forEach(e => {
        e.forEach(m => {
          new_game_list.push(m.text);
        });
      });
      this.$http
        .post({
          url: "/api/wxapp.game/submitTheGame?",
          data: {
            game_records_id: this.game_records_id,
            game_time: (this.endTime - this.startTime) / 1000,
            content: JSON.stringify({
              new_game_list,
              game_list: this.afterSort.map(e => {
                return e;
              })
            })
          },
          header: {
            token: this.token
          }
        })
        .then(result => {
          if (result.code == 1) {
            this.$store.commit("setResult", result.data);
            wx.redirectTo({
              url: "../result/main?list=" + JSON.stringify(this.number)
            });
          } else {
            wx.showToast({
              title: result.msg,
              icon: "none"
            });
          }
        });
    },
    selectNumber: function(data) {
      let item = this.number[this._index][this.index];
      item.text = data;
      this.$set(this.number[this._index], this.index, item);
    },
    deleteNumber: function() {
      let item = this.number[this._index][this.index];
      item.text = "";
      this.$set([this._index], this.index, item);
    }
  }
};
</script>
<style lang="scss" scoped>
page {
  height: calc(100% - 75px) !important;
}

.container {
  background: $deep-blue;
  color: white;
  height: calc(100% - 75px);
}

.list {
  margin-top: tovmin(200);
  margin-left: tovmin(180);
  margin-top: tovmin(180);
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
  margin-right: tovmin(60);
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
  display: block;
}
.input.active {
  border-bottom: tovmin(2) solid $green;
}
</style>
