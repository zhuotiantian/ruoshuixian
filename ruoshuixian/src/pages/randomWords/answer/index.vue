<template>
  <div class="container">
    <div class="fog" v-if="showFog"></div>
    <alertBox :text="text" v-if="showFog" @hideFog="hideFog" @confirm="confirm"></alertBox>
    <CardTitle :type="type" seconds="1800" @finish="finish" @nextPage="nextPage" @prevPage="prevPage"></CardTitle>
    <div class="list">
      <div class="item-list" v-for="(columns,index) in list[pageIndex]" :key="index+1">
        <span v-for="(item,_index) in columns" :key="_index+1"><span>{{item.index+1}}</span>&nbsp;&nbsp;&nbsp;<input type="text" class="input" v-model="item.text"></span>
      </div>
    </div>
  </div>
</template>

<script>
import CardTitle from "@/components/gameTitle"
import alertBox from "@/components/alertBox"
export default {
  components: {
    CardTitle,
    alertBox
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data())
    this.level = this.$store.state.level;
    this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
      return e.game_level == this.level
    })[0];
    this.token = this.$store.state.userInfo.token;
    this.startTime = new Date().getTime();
    this.game_records_id = this.rule.game_records_id;
    this.spliceList();
  },
  data () {
    return {
      list: [],
      showFog: false,
      text: "确定结束作答吗？",
      type: "下一页",
      pageIndex: 0
    }
  },
  methods: {
    spliceList: function (start, end) {
      let per = this.rule.number_per_group;
      let total = this.rule.number;
      let list = [];
      let wordsList = this.rule.list.map((e, index) => {
        return {
          text: "",
          index: index
        }
      });
      for (var i = 0; i < total; i += per) {
        list.push(wordsList.slice(i, i + per));
      }
      this.list = [list.slice(0, 5), list.slice(5, 10)];
      this.per = per;
    },
    nextPage: function () {
      this.pageIndex = 1;
      this.type = "作答完成"
    },
    prevPage: function () {
      this.pageIndex = 0;
      this.type = "下一页";
    },
    finish: function () {
      this.showFog = true;
    },
    hideFog: function () {

      this.showFog = false;
    },
    confirm: function () {
      this.endTime = new Date().getTime();
      let result = [];
      let list = this.list[0].concat(this.list[1]);
      list.forEach(e => {
        e.forEach(m => {
          result.push(m.text);
        })
      });
      this.$http.post({
        url: "/api/wxapp.game/submitTheGame",
        data: {
          game_records_id: this.game_records_id,
          game_time: (this.endTime - this.startTime) / 1000,
          content: JSON.stringify(result)
        },
        header: {
          token: this.token
        }
      }).then(result => {
        if (result.code == 1) {
          this.$store.commit("setResult", result.data);
          wx.reLaunch({
            url: "../result/main"
          })
        } else {
          wx.showToast({
            title: result.msg,
            icon: "none"
          });
        }
      })
    }
  }
}
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
  margin: tovmin(200) tovmin(30) tovmin(30) tovmin(30);
}

.list {
  display: grid;
  grid-template-columns: tovmin(250) tovmin(250) tovmin(250) tovmin(250) tovmin(
      200
    );
  grid-gap: tovmin(20);
  font-size: tovmin(26);
  justify-content: center;
  align-items: center;
  color: $grey-text;
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