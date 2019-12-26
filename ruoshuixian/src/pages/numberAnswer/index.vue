<template>
  <div class="container">
    <div class="fog" v-if="showFog"></div>
    <alertBox :text="text" v-if="showFog" @hideFog="hideFog" @confirm="confirm"></alertBox>
    <GameTitle :showIntervalTime='true' :showFinishAnwserBtn="true" @finishAnwser="finishAnwser"></GameTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in number" :key="_index">
        <span :class="{item:true,selected:item.selected}" v-for="(item,index) in rows" :key="index" @click="selected(_index,index)">{{item.number}}</span>
        <span style="width:50rpx">row&nbsp;&nbsp;{{_index+1}}</span>
      </div>
    </div>
    <Keybord :showKeybord="showKeybord" :counts="gameName==='二进制数字'?2:10" @selectNumber="selectNumber" @deleteNumber="deleteNumber"></Keybord>
  </div>
</template>
<script>
import GameTitle from "@/components/gameTitle_new"
import Keybord from "@/components/Keybord"
import alertBox from "@/components/alertBox"
export default {
  components: {
    GameTitle,
    Keybord,
    alertBox
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data());
    this.level = this.$store.state.level;
    this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
      return e.game_level == this.level
    })[0];
    this.gameName = this.$getGameInfo("name");
    this.token = this.$store.state.userInfo.token;
    this.numberList = this.rule.list.map(e => {
      return {
        number: "",
        selected: false
      }
    });
    this.total = this.rule.number;
    this.per = this.rule.number_per_group;
    let number = [];
    for (var i = 0; i < this.total; i += this.per) {
      number.push(this.numberList.slice(i, i + this.per));
    };
    this.number = number;
    this.startTime = new Date().getTime();
    this.game_records_id = this.rule.game_records_id;
    this.selected(this.rowIndex, this.columnIndex);
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: this.gameName
    })
  },
  data () {
    return {
      showKeybord: true,
      showFog: false,
      number: [],
      total: 0,
      per: 0,
      game_records_id: 1,
      rule: {},
      level: "primary",
      rowIndex: 0,
      columnIndex: 0,
      gameName: ""
    }
  },
  methods: {
    finishAnwser: function () {
      this.showFog = true;
    },
    hideFog: function () {
      this.showFog = false;
    },
    confirm: function () {
      this.endTime = new Date().getTime();
      let result = [];
      this.number.forEach(e => {
        e.forEach(m => {
          result.push(m.number);
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
            url: "/pages/numberResult/main"
          })
        } else {
          wx.showToast({
            title: result.msg,
            icon: "none"
          });
        }
      })
    },
    //选中格子
    selected: function (row, column) {
      this.rowIndex = row;
      this.columnIndex = column;
      this.cleanActive();
      this.active();
    },
    //选择填写的数字
    selectNumber: function (data) {
      let current = this.number[this.rowIndex][this.columnIndex];
      if (current.selected) {
        current.number = data;
      }
      this.$set(this.number[this.rowIndex], this.columnIndex, current);
      this.$set(this.number[this.rowIndex][this.columnIndex], "selected", false);
      if (this.columnIndex < this.number[this.rowIndex].length - 1) {
        this.columnIndex++;
      } else if (this.rowIndex < this.number.length - 1 && this.columnIndex == this.number[this.rowIndex].length - 1) {
        this.rowIndex++;
        this.columnIndex = 0;
      }
      this.$set(this.number[this.rowIndex][this.columnIndex], "selected", true);
    },
    //删除填写的数字
    deleteNumber: function () {
      let current = this.number[this.rowIndex][this.columnIndex];
      if (current.number !== "") {
        current.number = ""
      }
      this.backSpace();
    },
    // 去掉所有的选中状态
    cleanActive: function () {
      let number = this.number.concat();
      number.forEach(e => {
        e.forEach(m => {
          m.selected = false;
        })
      })
      this.number = number;
    },
    // 为格子添加选中状态
    active: function () {
      let item = this.number[this.rowIndex][this.columnIndex];
      item.selected = true;
      this.$set(this.number[this.rowIndex], this.columnIndex, item);
    },
    // 退格
    backSpace: function () {
      this.$set(this.number[this.rowIndex][this.columnIndex], "selected", false);
      if (this.columnIndex === 0 && this.rowIndex > 0) {
        this.rowIndex--;
        this.columnIndex == this.number[this.rowIndex].length - 1;
      } else if (this.columnIndex > 0) {
        this.columnIndex--;
      }
      this.$set(this.number[this.rowIndex][this.columnIndex], "selected", true);
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
  margin-bottom: tovmin(180);
}

.row {
  display: flex;
  width: 80%;
  margin: 0 auto;
  margin-bottom: tovmin(30);
}

.item {
  flex: 1;
  border: tovmin(2) solid $middle-blue;
  border-right: none;
  height: tovmin(40);
  width: tovmin(28);
  text-align: center;
}

.item:nth-last-child(2) {
  border-right: tovmin(2) solid $middle-blue;
  margin-right: tovmin(20);
}

.selected {
  border: 1px solid red;
  margin-right: tovmin(-1);
  position: relative;
  z-index: 10;
}
</style>
