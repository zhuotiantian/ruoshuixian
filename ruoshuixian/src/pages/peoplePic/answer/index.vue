<template>
  <div class="container">
    <div class="fog" v-if="showFog"></div>
    <alertBox :text="text" v-if="showFog" @hideFog="hideFog" @confirm="confirm"></alertBox>
    <CardTitle :seconds="seconds" :minutes="minutes" type="作答完成" @finish="finish"></CardTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in rows" :key="_index">
        <div class="image_div" v-for="(item,index) in number" :key="index">
          <image class="image" :src="'/static/images/firstPage/people@'+ratio+'x.png'" />
          <input type="text" class="input" placeholder="姓名" />
        </div>
        <span>row&nbsp;&nbsp;{{_index+1}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import CardTitle from "@/components/gameTitle";
  import alertBox from "@/components/alertBox";
  export default {
    components: {
      CardTitle,
      alertBox
    },
    data() {
      let array = new Array(5);
      let rows = new Array(10);
      return {
        seconds: 0,
        minutes: 15,
        text: "确定结束作答吗？",
        number: array,
        rows: rows,
        counts: 0,
        ratio: 1,
        showFog: false,
      };
    },
    mounted() {
      this.ratio = this.globalData.ratio;
    },
    methods: {
      finish: function () {
        this.showFog = true;
      },
      hideFog: function () {
        this.showFog = false;
      },
      confirm: function () {
        wx.navigateTo({
          url: "../result/main"
        });
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
    margin-left: tovmin(180);
    margin-top: tovmin(230);
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
  }

</style>
