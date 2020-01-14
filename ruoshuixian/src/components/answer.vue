<template>
  <div class="answer-wrapper" :style="{height:gameName==='马拉松扑克牌'?'61vmin':'79vmin'}">
    <div class="btnGroup" style="position:relative:z-index:998;" v-if="hasToOperationPocker">
      <p v-if="operationType!==''">请在待选区域选择需要{{operationType}}的牌</p>
      <template v-else>
        <div class="btn default-btn" @click.stop="replace">替换</div>
        <div class="btn default-btn" @click="insertBefore">从右插入</div>
        <div class="btn default-btn" @click="insertAfter">从左插入</div>
        <div class="btn default-btn" @click="back">退回</div>
      </template>
    </div>
    <div class="result-div" v-if="result.length>0">
      <em class="arrow arrow-left" style="flex:1;"></em>
      <scroll-view :style="{width:'80%','height':'100%','white-space':'nowrap','margin':'0 auto','flex':'10'}" scroll-x="true" :scroll-left="101+(result.length-1)*20+'px'">
        <div class="result" :style="{width:101+(result.length-1)*20+'px'}">
          <image @click="selectSelectedPocker(index,item)" :class="{pocker:true,active:item.selected}" :style="{right:(result.length-index)*20+'px'}" v-for="(item,index) in result" :key="index" :src="item.url" ref="pocker" />
        </div>
      </scroll-view>
      <em class="arrow arrow-right" v-if="result.length>0" style="flex:1;"></em>
    </div>
    <scroll-view scroll-y="true" v-if="gameName==='马拉松扑克牌'" :style="{height:result.length>0?(hasToOperationPocker?'calc(100% - 40vmin)':'calc(100% - 32vmin)'):'100%',marginTop: '3vmin'}">
      <div class="list">
        <div class="row" v-for="(row,rowIndex) in pocker" :key="rowIndex">
          <image @click="selectPocker(item.row,item.column)" ref="pocker" :class="{pocker,hidden:!item.show,active:item.active}" v-for="(item,columnIndex) in row" :src="'/static/images/pocker/'+item.column+'-'+item.row+'.png'" :key="columnIndex"></image>
        </div>
      </div>
    </scroll-view>
    <scroll-view scroll-y="true" v-else :style="{height:result.length>0?(hasToOperationPocker?'calc(100% - 40vmin)':'calc(100% - 33vmin)'):'100%',marginTop: '3vmin'}">
      <div class="list">
        <div class="row" v-for="(row,rowIndex) in pocker" :key="rowIndex">
          <image @click="selectPocker(item.row,item.column)" ref="pocker" :class="{pocker,hidden:!item.show,active:item.active}" v-for="(item,columnIndex) in row" :src="'/static/images/pocker/'+item.column+'-'+item.row+'.png'" :key="columnIndex"></image>
        </div>
      </div>
    </scroll-view>
    <div class="pageFoot" v-if="gameName==='马拉松扑克牌'">
      <span class="pageBtn" @click="prevPage">上一页</span>
      <div class="btn-group">
        <span :class="{item:true, active:item.active}" @click="select(index,item)" v-for="(item,index) in groupPage[currentPage]" :key="index">{{item.number}}副</span>
      </div>
      <span class="pageBtn" @click="nextPage">下一页</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    let pocker = [];
    for (let j = 1; j <= 4; j++) {
      let columns = [];
      for (let i = 1; i <= 13; i++) {
        columns.push({
          show: true,
          selected: false,
          row: j,
          column: i
        });
      }
      pocker.push(columns);
    }
    return {
      pocker: pocker,
      result: [],
      hasToOperationPocker: false,
      operationType: "",
      notBack: true,
      gameName: "",
      allResult: [],
      pages: [], //分组后的
      currentIndex: 0,
      currentPage: 0,
      groupPage: []
    };
  },
  onLoad(options) {
    Object.assign(this.$data, this.$options.data());
    this.gameName = this.$getGameInfo("name");
    if (this.gameName === "马拉松扑克牌") {
      this.list = this.$store.state.ruleList.list;
      let level = this.$store.state.level;
      let rule = this.$store.state.rule.rules_of_the_game.filter(e => {
        return e.game_level == level;
      })[0];
      // 生成所有pock的副数
      for (var i = 1; i <= this.list.length; i++) {
        this.pages.push({
          number: i,
          active: false
        });
        this.allResult.push([]);
      }
      //一页显示10副
      let groupPage = [];
      for (var i = 0; i < this.pages.length; i += 10) {
        groupPage.push(this.pages.slice(i, i + 10));
      }
      this.groupPage = groupPage;
      this.select(0, this.pages[0]);
    }
  },

  methods: {
    select: function(index, item) {
      let currentPage = this.groupPage[this.currentPage];
      this.groupPage[this.currentPage].forEach(e => {
        e.active = false;
      });
      this.$set(this.groupPage[this.currentPage], index, {
        number: item.number,
        active: true
      });
      this.currentIndex = item.number - 1;
      this.pocker.forEach(e => {
        e.forEach(m => {
          m.show = true;
        });
      });
      if (this.allResult[this.currentIndex].length === 0) {
        this.result = [];
      } else {
        this.result = this.allResult[this.currentIndex];
        this.result.forEach(e => {
          this.hiddenPocker(e.rowIndex, e.columnIndex);
        });
      }
      this.clearStatus();
    },
    //从待选区域选择扑克
    selectPocker: function(rowIndex, columnIndex) {
      this.$emit("hideAnwserText");
      if (this.notBack) {
        this.result.push({
          url: "/static/images/pocker/" + columnIndex + "-" + rowIndex + ".png",
          rowIndex,
          columnIndex,
          selected: false
        });
        this.hiddenPocker(rowIndex, columnIndex);
      } else {
        if (this.operationType === "替换") {
          let { item, index } = this.selectedTopPocker;
          this.showPocker(item.rowIndex, item.columnIndex);
          this.hiddenPocker(rowIndex, columnIndex);
          let result_item = this.result[index];
          result_item.rowIndex = rowIndex;
          result_item.columnIndex = columnIndex;
          this.$set(this.result, index, {
            rowIndex: rowIndex,
            columnIndex: columnIndex,
            url:
              "/static/images/pocker/" + columnIndex + "-" + rowIndex + ".png",
            selected: false
          });
        } else if (this.operationType === "从前插入") {
          this.hiddenPocker(rowIndex, columnIndex);
          let { index } = this.selectedTopPocker;
          this.result.splice(index + 1, 0, {
            url:
              "/static/images/pocker/" + columnIndex + "-" + rowIndex + ".png",
            rowIndex,
            columnIndex,
            selected: false
          });
        } else {
          this.hiddenPocker(rowIndex, columnIndex);
          let { index } = this.selectedTopPocker;
          this.result.splice(index, 0, {
            url:
              "/static/images/pocker/" + columnIndex + "-" + rowIndex + ".png",
            rowIndex,
            columnIndex,
            selected: false
          });
        }

        this.clearStatus();
      }
      if (this.gameName === "马拉松扑克牌") {
        this.allResult[this.currentIndex] = this.result;
      }
    },
    //隐藏待选区已经选择的扑克牌
    hiddenPocker: function(rowIndex, columnIndex) {
      this.$set(this.pocker[rowIndex - 1][columnIndex - 1], "show", false);
    },
    //显示待选区域扑克牌
    showPocker: function(rowIndex, columnIndex) {
      this.$set(this.pocker[rowIndex - 1][columnIndex - 1], "show", true);
    },
    //选择/取消选择已选择区域的扑克牌
    selectSelectedPocker: function(index, item) {
      this.result.forEach((e, _index) => {
        if (_index !== index) {
          e.selected = false;
        }
      });
      this.$set(this.result[index], "selected", !this.result[index].selected);
      this.hasToOperationPocker = this.result.some(e => {
        return e.selected;
      });
      this.selectedTopPocker = {
        index,
        item
      };
    },
    //退回扑克牌
    back: function() {
      let { index, item } = this.selectedTopPocker;
      let { rowIndex, columnIndex } = item;
      this.result.splice(index, 1);
      this.showPocker(rowIndex, columnIndex);
      this.clearStatus();
    },
    //替换扑克牌
    replace: function() {
      this.operationType = "替换";
      this.notBack = false;
    },
    //从前插入
    insertBefore: function() {
      this.operationType = "从前插入";
      this.notBack = false;
    },
    //从后插入
    insertAfter: function() {
      this.operationType = "从后插入";
      this.notBack = false;
    },
    //重置状态
    clearStatus: function() {
      this.result.forEach((e, _index) => {
        e.selected = false;
      });
      this.hasToOperationPocker = false;
      this.operationType = "";
      this.selectedTopPocker = {};
      this.notBack = true;
    },
    nextPage: function() {
      if (this.currentPage > 3) {
        return false;
      } else {
        this.currentPage++;
        this.pages = this.pages.map(e => {
          return e + 10;
        });
      }
    },
    prevPage: function() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.pages = this.pages.map(e => {
          return e - 10;
        });
      }
    }
  }
};
</script>
<style lang="scss" scope>
.pocker {
  width: tovmin(102);
  height: tovmin(150);
  margin-right: tovmin(10);
  margin-bottom: tovmin(10);
}
.hidden {
  visibility: hidden;
}
.result {
  position: relative;
  min-width: 100%;
  height: 100%;
  bottom: 7vmin;
  right: 0;
}

.result image {
  position: absolute;
  bottom: tovmin(0);
  width: tovmin(132);
  height: tovmin(180);
}

.result-div {
  display: flex;
  height: tovmin(250);
  align-items: center;
}
.pageFoot {
  position: fixed;
  width: 100%;
  height: tovmin(120);
  background: white;
  z-index: 999;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 tovmin(60);
  box-sizing: border-box;
  font-size: tovmin(28);
  align-items: center;
}

.pageBtn {
  color: $yellow;
}

.pageFoot .item {
  height: tovmin(80);
  width: tovmin(80);
  display: inline-block;
  border-radius: tovmin(8);
  line-height: tovmin(80);
  text-align: center;
  margin-right: tovmin(24);
  border: tovmin(2) solid #e5e5e5;
  color: $black;
}

.pageFoot .item.active {
  color: white;
  background: $middle-blue;
  border: none;
}

.operationTips {
  text-align: right;
  padding-right: tovmin(30);
  padding-bottom: tovmin(30);
}
</style>
