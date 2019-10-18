<template>
  <div class="container">
    <div class="fog" v-if="showFog"></div>
    <alertBox :text="text" v-if="showFog&&!showTip" @hideFog="hideFog" @confirm="confirm"></alertBox>
    <CardTitle seconds="300" type="作答完成" @finish="finish" :showTips="true"></CardTitle>
    <div v-if="result.length>0" class="btnGroup" style="position:relative:z-index:998;">
      <div class="btn default-btn" @click.stop="replace">替换</div>
      <div class="btn default-btn" @click="insertBefore">从前插入</div>
      <div class="btn default-btn" @click="insertAfter">从后插入</div>
    </div>
    <div class="result-div">
      <em class="arrow arrow-left" v-if="result.length>0" style="flex:1;"></em>
      <scroll-view :style="{width:'99%','height':'100%','white-space':'nowrap','margin':'0 auto','flex':'10'}" scroll-x="true">
        <div class="result" :style="{width:102+(result.length-1)*20+'rpx'}">
          <image :class="{pocker:true,active:item.active}" @click="backHandler($event,index,item.rowIndex,item.columnIndex)" :style="{right:(result.length-index)*20+'rpx'}" v-for="(item,index) in result" :key="index" :src="item.url" ref="pocker" />
        </div>
      </scroll-view>
      <em class="arrow arrow-right" v-if="result.length>0" style="flex:1;"></em>
    </div>
    <div class="list">
      <div class="row" v-for="(item,index) in pocker" :key="index">
        <image @click="selectPocker($event,index,_index)" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend($event,index,_index)" ref="pocker" :class="{pocker:true,hidden:!_item.show,active:_item.active}" v-for="(_item,_index) in item" :key="_index" :src="'/static/images/pocker/'+(_index/1+1)+'-'+(index/1+1)+'.png'" />
      </div>
    </div>
  </div>
</template>
<script>
import CardTitle from "@/components/gameTitle"
import Keybord from "@/components/Keybord"
import alertBox from "@/components/alertBox"
export default {
  components: {
    CardTitle,
    Keybord,
    alertBox
  },
  data () {
    let pocker = [];
    for (let j = 0; j < 4; j++) {
      let columns = [];
      for (let i = 0; i < 13; i++) {
        columns.push({
          show: true,
          active: false
        });
      };
      pocker.push(columns);
    }
    return {
      pocker: pocker,

      showFog: false,
      showTip: false,
      result: [],
      lastClick: 0,
      showBtnGroup: false,
      game_records_id: 1,
      userInfo: {},
      selectTopPocker: {},
      canAdd: false
    }
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
  },
  methods: {
    finish: function (data) {
      let result = this.result.map(e => {
        return {
          index: e.columnIndex + 1,
          color: e.rowIndex + 1,
        }
      });
      if (data == "timeout") {
        this.confirm();
      } else {
        this.showFog = true;
      }
    },
    hideFog: function () {
      this.showFog = false;
    },
    confirm: function () {
      this.endTime = new Date().getTime();
      let result = this.result.map(e => {
        return {
          index: e.columnIndex + 1,
          color: e.rowIndex + 1
        }
      })
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

    },
    touchstart: function () {
      this.touchstartTime = new Date().getTime();
    },
    touchend: function (e, index, _index) {
      this.touchendTime = new Date().getTime();
      if (this.touchendTime - this.touchstartTime < 500) {

      } else {
        this.longPress(e, index, _index);
        this.canAdd = true;
      }
    },
    longPress: function (e, index, _index) {
      this.showBtnGroup = true;
      //index:行标
      //_index:列标
      this.selectBottomPocker = {
        e,
        index,
        _index
      };
      this.$set(this.pocker[index][_index], "active", !this.pocker[index][_index].active);
    },
    selectPocker: function (e, index, _index) {
      if (this.touchendTime - this.touchstartTime > 500) return false
      this.result.push({
        url: '/static/images/pocker/' + (_index / 1 + 1) + '-' + (index / 1 + 1) + '.png',
        rowIndex: index,
        columnIndex: _index,
        active: false
      });
      let hidden = this.pocker[index];
      hidden[_index].show = false;
      this.$set(this.pocker, "index", hidden);
    },
    backHandler: function (e, index, row, column) {
      let currentTime = new Date().getTime();
      if (currentTime - this.lastClick < 300) {
        this.result.splice(index, 1);
        this.$set(this.pocker[row][column], "show", true);
      } else {
        this.lastClick = new Date().getTime();
        this.$set(this.result[index], "active", !this.result[index].active);
        //index:result中的位置,row:下半区行标,column:下半区列标
        this.selectTopPocker = {
          e,
          index,
          row,
          column
        }
      }
    },
    hidden: function () {
      let hidden = this.pocker[this.selectBottomPocker.index];
      hidden[this.selectBottomPocker._index].show = false;
      this.$set(this.pocker, this.selectBottomPocker.index, hidden);
    },
    removeActive: function () {
      this.result.forEach(e => {
        e.active = false
      });
    },
    show: function () {
      this.$set(this.pocker[this.selectTopPocker.row][this.selectTopPocker.column], "show", true);
    },
    replace: function () {
      this.removeActive();
      this.$set(this.result, this.selectTopPocker.index, {
        url: '/static/images/pocker/' + (this.selectBottomPocker._index / 1 + 1) + '-' + (this.selectBottomPocker.index / 1 + 1) + '.png',
        rowIndex: this.selectBottomPocker.index,
        columnIndex: this.selectBottomPocker._index,
        active: true
      });
      this.hidden();
      this.show();
    },
    insertBefore: function () {
      if (!this.canAdd) return false; this.canAdd = false; this.canAdd = false;
      this.removeActive();
      this.result.splice(this.selectTopPocker.index + 1, 0, {
        url: '/static/images/pocker/' + (this.selectBottomPocker._index / 1 + 1) + '-' + (this.selectBottomPocker.index / 1 + 1) + '.png',
        rowIndex: this.selectBottomPocker.index,
        columnIndex: this.selectBottomPocker._index,
        active: true,
        index: this.selectTopPocker.index + 1
      });
      this.$set(this.selectTopPocker, "index", this.selectTopPocker.index + 1);
      this.$set(this.selectTopPocker, "row", this.selectBottomPocker.index);
      this.$set(this.selectTopPocker, "column", this.selectBottomPocker._index);
      this.hidden();
    },
    insertAfter: function () {
      if (!this.canAdd) return false; this.canAdd = false; this.canAdd = false;
      this.result.forEach(e => {
        e.active = false
      });
      this.result.splice(this.selectTopPocker.index, 0, {
        url: '/static/images/pocker/' + (this.selectBottomPocker._index / 1 + 1) + '-' + (this.selectBottomPocker.index / 1 + 1) + '.png',
        rowIndex: this.selectBottomPocker.index,
        columnIndex: this.selectBottomPocker._index,
        active: true,
        index: this.selectTopPocker.index
      });
      this.$set(this.selectTopPocker, "index", this.selectTopPocker.index);
      this.$set(this.selectTopPocker, "row", this.selectBottomPocker.index);
      this.$set(this.selectTopPocker, "column", this.selectBottomPocker._index);
      this.hidden();
    }
  }
}
</script>
<style lang="scss" scoped>
.hidden {
  visibility: hidden;
}

.container {
  padding-top: tovmin(300);
  color: white;
  text-align: center;
}

.tips {
  position: fixed;
  top: tovmin(150);
  padding: 0 tovmin(100);
  z-index: 1002;
}

.tips p {
  text-align: left;
}

.tips p:last-child {
  text-align: center;
}

.pocker {
  width: tovmin(102);
  height: tovmin(150);
  margin-right: tovmin(10);
  margin-bottom: tovmin(10);
}

.operationTips {
  text-align: right;
  padding-right: tovmin(30);
  padding-bottom: tovmin(30);
}

.result {
  position: absolute;
  min-width: 100%;
  height: 100%;
  bottom: tovmin(75);
}

.result image {
  position: absolute;
  bottom: tovmin(0);
}

.result-div {
  display: flex;
  height: tovmin(238);
  align-items: center;
}
</style>