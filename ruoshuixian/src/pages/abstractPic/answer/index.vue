<template>
  <div class="container">
    <div class="fog" v-if="showFog"></div>
    <alertBox :text="text" v-if="showFog" @hideFog="hideFog" @confirm="confirm"></alertBox>
    <CardTitle type="作答完成" seconds="1800" @finish="finish"></CardTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in number" :key="_index">
        <div class="image_div" v-for="(item,index) in rows" :key="index">
          <image class="image" :src="domain+item.image"></image>
          <span class="input" @click="focus(_index,index)">{{item.text}}</span>
          <!-- <input type="text" class="input" placeholder="序号" v-model="item.text" @focus="focus" @blur="blur" /> -->
        </div>
        <span style="margin-left:50rpx">row&nbsp;&nbsp;{{_index+1}}</span>
      </div>
    </div>
    <Keybord :showKeybord="showKeybord" counts="5" @selectNumber="selectNumber" @deleteNumber="deleteNumber"></Keybord>
  </div>
</template>
<script>
import CardTitle from "@/components/gameTitle";
import Keybord from "@/components/Keybord";
import alertBox from "@/components/alertBox";
export default {
  components: {
    CardTitle,
    Keybord,
    alertBox
  },
  onLoad (option) {
    Object.assign(this.$data, this.$options.data());
    let list = JSON.parse(option.list);
    this.level = this.$store.state.level;
    this.token = this.$store.state.userInfo.token;
    this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
      return e.game_level == this.level
    })[0];
    let number = [];
    this.numberList = list.map((e, index) => {
      return {
        image: e.img,
        text: "",
        index: e.index
      }
    });
    this.total = this.rule.number;
    this.per = this.rule.number_per_group;
    this.numberList = this.numberList.sort(() => {
      return Math.random() > 0.5 ? -1 : 1
    });
    for (var i = 0; i < this.total; i += this.per) {
      number.push(this.numberList.slice(i, i + this.per));
    }
    this.number = number.filter(e => {
      return e.length > 0;
    });
    this.startTime = new Date().getTime();
    this.game_records_id = this.rule.game_records_id;
  },
  data () {
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
      level: "primary",
      numberList: [],
      rule: {}
    };
  },
  methods: {
    finish: function () {
      this.showFog = true;
    },
    hideFog: function () {
      this.showFog = false;
    },
    focus: function (_index, index) {
      this.showKeybord = true;
      this._index = _index;
      this.index = index;
    },
    confirm: function () {
      this.endTime = new Date().getTime();
      let new_game_list = [];
      let game_list = [];
      this.number.forEach(e => {
        e.forEach(m => {
          new_game_list.push(m.text);
          game_list.push(m.index + 1);
        });
      });
      this.$http
        .post({
          url: "/api/wxapp.game/submitTheGame",
          data: {
            game_records_id: this.game_records_id,
            game_time: (this.endTime - this.startTime) / 1000,
            content: JSON.stringify({
              new_game_list,
              game_list
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
              url: "../result/main"
            });
          } else {
            wx.showToast({
              title: result.msg,
              icon: "none"
            });
          }
        });
    },
    selectNumber: function (data) {
      let item = this.number[this._index][this.index];
      item.text = data;
      this.$set([this._index], this.index, item);
    },
    deleteNumber: function () {
      let number = this.number;
      number.forEach((e, rowIndex) => {
        e.forEach((m, columnIndex) => {
          m.text = ""
        })
      });
      this.number = number;
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
</style>