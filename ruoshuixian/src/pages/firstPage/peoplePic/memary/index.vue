<template>
  <div class="container">
    <alertBox :text="text" v-if="showFog" @hideFog="hideFog"></alertBox>
    <CardTitle :seconds="seconds" :minutes="minutes" type="记忆完成" @finishMemary="finishMemary"></CardTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in rows" :key="_index">
        <div class="image" v-for="(item,index) in number" :key="index">
          <image class="image" :src="'/static/images/firstPage/people@'+ratio+'x.png'" />
        </div>
        <span>row&nbsp;&nbsp;{{_index+1}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import CardTitle from "@/components/gameTitle"
  export default {
    components: {
      CardTitle
    },
    data() {
      let array = new Array(5);
      let rows = new Array(3);
      return {
        seconds: 0,
        minutes: 15,
        text: "确定结束作答吗？",
        number: array,
        rows: rows,
        counts: 0,
        ratio: 1,
      }
    },
    mounted() {
      this.ratio = this.globalData.ratio;
    },
    methods: {
      finishMemary: function () {
        wx.navigateTo({
          url: "../answer/main"
        })
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
    margin-left: tovmin(230);
    margin-top: tovmin(230);
  }

  .row {
    display: flex;
    width: 80%;
    margin: 0 auto;
    height: tovmin(140);
    line-height: tovmin(140);
    color: $grey-text;
    margin-bottom: tovmin(44);
  }

  .image {
    height: tovmin(140);
    width: tovmin(140);
    background: white;
    margin-right: tovmin(40);
  }

</style>
