<template>
  <div class="container">
    <alertBox :text="text" v-if="showFog" @hideFog="hideFog"></alertBox>
    <CardTitle :seconds="seconds" :showType="true" :minutes="minutes" type="记忆完成" @finishMemary="finishMemary"
      @group="group" :pannelContent="pannelContent"></CardTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in rows" :key="_index">
        <div v-for="(item,index) in number" :key="index"
          :class="{item:true,border:counts&&((index+1)%counts==0)&&(index+1)!=number.length}">
          <span>{{item}}</span>
        </div>
        <span style="width:50rpx">row&nbsp;&nbsp;{{_index+1}}</span>
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
    onLoad(option) {
      this.level = option.level;
      this.minutes = this.level == "0" ? 30 : 15
    },
    data() {
      let array = [];
      let array1 = [0, 1];
      for (let i = 0; i < 30; i++) {
        let index = Math.floor((Math.random() * array1.length));
        array.push(array1[index]);
      };
      let rows = new Array(12);
      return {
        seconds: 0,
        minutes: null,
        text: "确定结束作答吗？",
        number: array,
        rows: rows,
        counts: 0,
        pannelContent: ["不划线", "三个一组", "六个一组"],
        level: ""
      }
    },
    methods: {
      group: function (data) {
        if (data == '三个一组') {
          this.counts = 3;
        } else if (data == '六个一组') {
          this.counts = 6;
        } else {
          this.counts = 0;
        }
      },
      finishMemary: function () {
        wx.navigateTo({
          url: "../answer/main"
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
  }

  .row {
    display: flex;
    width: 80%;
    margin: 0 auto;
    height: tovmin(60);
    line-height: tovmin(60);
    color: $grey-text;
  }

  .item {
    flex: 1;
    border-right: none;
    height: tovmin(60);
    line-height: tovmin(60);
    width: tovmin(28);
    text-align: center;
    box-sizing: border-box;
  }

  .item.border {
    border-right: tovmin(2) solid white;
  }

  .item:nth-last-child(2) {
    margin-right: tovmin(20);
  }

  .pannel {
    height: tovmin(510) !important;
    background: red;
  }

</style>
