<template>
  <div class="container">
    <div class="fog" v-if="showFog"></div>
    <alertBox :text="text" v-if="showFog&&!showTip" @hideFog="hideFog" @confirm="confirm"></alertBox>
    <div class="tips" v-if="showFog&&showTip">
      <p style="margin-bottom:30rpx">你可以通过以下两种方式对扑克牌的顺序进行修改</p>
      <p>方式一、双击屏幕上半区的任意一张扑克，将这张扑克牌退回原位。</p>
      <p>方式二、单击屏幕上半区的任意一张扑克，然后长按下半区的任意一张扑克，进行“替换位置/从前面插入/从后面插入”操作。</p>
      <p><span class="btn default-btn" @click="shideTip">我知道了</span></p>
    </div>
    <CardTitle :seconds="seconds" :minutes="minutes" type="作答完成" @finish="finish"></CardTitle>
    <div class="result">
    </div>
    <div class="list">
      <div class="row" v-for="(item,index) in rows" :key="index">
        <image class="pocker" v-for="(item,_index) in columns" :key="_index"
          :src="'/static/images/pocker/'+(_index/1+1)+'-'+(index/1+1)+'@'+ratio+'x.png'"></image>
      </div>
    </div>
    <p class="operationTips"><span class="btn default-btn" style="float-right" @click="showTips">操作提示</span></p>
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
      let rows = new Array(4);
      let columns = new Array(13);
      return {
        seconds: 0,
        minutes: 15,
        rows: rows,
        columns: columns,
        ratio: 1,
        showFog: false,
        showTip: false,
        text: "确定结束作答吗？",
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
      finish: function () {
        this.showFog = true;
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
      confirm: function () {
        wx.navigateTo({
          url: "../result/main"
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .container {
    padding-top: tovmin(300);
    color: white;
    text-align: center;
  }

  .tips {
    position: absolute;
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

  .list {
    margin-top: tovmin(400);
  }

  .pocker {
    width: tovmin(82);
    height: tovmin(130);
    margin-right: tovmin(10);
    margin-bottom: tovmin(10);
  }

  .operationTips {
    text-align: right;
    padding-right: tovmin(30);
    padding-bottom: tovmin(30);
  }

  .fog {
    height: 200% !important;
  }

</style>
