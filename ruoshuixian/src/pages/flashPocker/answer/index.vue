<template>
  <div class="container">
    <div class="fog" v-if="showFog"></div>
    <alertBox :text="text" v-if="showFog&&!showTip" @hideFog="hideFog" @confirm="confirm"></alertBox>
    <div class="tips" v-if="showFog&&showTip">
      <p style="margin-bottom:30rpx">你可以通过以下两种方式对扑克牌的顺序进行修改</p>
      <p>方式一、双击屏幕上半区的任意一张扑克，将这张扑克牌退回原位。</p>
      <p>方式二、单击屏幕上半区的任意一张扑克，然后长按下半区的任意一张扑克，进行“替换位置/从前面插入/从后面插入”操作。</p>
      <p>
        <span class="btn default-btn" @click="shideTip">我知道了</span>
      </p>
    </div>
    <CardTitle minutes="15" seconds="0" type="作答完成" @finish="finish"></CardTitle>
    <div class="result-div">
      <em class="arrow arrow-left" v-if="result.length>0" style="flex:1;"></em>
      <scroll-view :style="{width:'99%','height':'100%','white-space':'nowrap','margin':'0 auto','flex':'10'}"
        scroll-x="true">
        <div class="result" :style="{width:102+(result.length-1)*20+'rpx'}">
          <image class="pocker" @click="backHandler(index,item.rowIndex,item.columnIndex)"
            :style="{right:(result.length-index)*20+'rpx'}" v-for="(item,index) in result" :key="index"
            :src="item.url" />
        </div>
      </scroll-view>
      <em class="arrow arrow-right" v-if="result.length>0" style="flex:1;"></em>
    </div>
    <div class="list">
      <div class="row" v-for="(item,index) in pocker" :key="index">
        <image @click="selectPocker($event,index,_index)" ref="pocker" :class="{pocker:true,hidden:!_item.show}"
          v-for="(_item,_index) in item" :key="_index"
          :src="'/static/images/pocker/'+(_index/1+1)+'-'+(index/1+1)+'@'+ratio+'x.png'" />
      </div>
    </div>
    <p class="operationTips">
      <span class="btn default-btn" style="float-right" @click="showTips">操作提示</span>
    </p>
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
    beforeCreate() {

    },
    data() {
      let pocker = [];
      for (let j = 0; j < 4; j++) {
        let columns = [];
        for (let i = 0; i < 13; i++) {
          columns.push({
            show: true
          });
        };
        pocker.push(columns);
      }
      return {
        seconds: 0,
        minutes: 15,
        pocker: pocker,
        ratio: 1,
        showFog: false,
        showTip: false,
        result: [],
        lastClick: 0,
      }
    },
    mounted() {
      this.ratio = this.globalData.ratio;
    },
    methods: {
      startGame: function () {
        wx.navigateTo({
          url: "../answer/main"
        })
      },
      finish: function (data) {
        if (data == "timeout") {
          this.confirm();
        } else {
          this.showFog = true;
        }
      },
      hideFog: function () {
        this.showFog = false;
      },
      showTips: function () {
        this.showFog = true;
        this.showTip = true;
      },
      shideTip: function () {
        this.showFog = false;
        this.showTip = false;
      },
      selectPocker: function (e, index, _index) {
        this.result.push({
          url: '/static/images/pocker/' + (_index / 1 + 1) + '-' + (index / 1 + 1) + '@' + this.ratio +
            'x.png',
          rowIndex: index,
          columnIndex: _index
        });
        let hidden = this.pocker[index];
        hidden[_index].show = false;
        this.$set(this.pocker, "index", hidden);
      },
      backHandler: function (index, row, column) {
        let currentTime = new Date().getTime();
        if (currentTime - this.lastClick < 300) {
          this.result.splice(index, 1);
          this.$set(this.pocker[row][column], "show", true);
        } else {
          this.lastClick = new Date().getTime();
        }
      },
      confirm: function () {
        wx.navigateTo({
          url: "../result/main"
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .hidden {
    visibility: hidden;
  }

  .container {
    padding-top: tovmin(520);
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
