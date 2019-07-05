<template>
  <div class="container">
    <alertBox :text="text" v-if="showFog" @hideFog="hideFog"></alertBox>
    <CardTitle :seconds="seconds" :minutes="minutes" type="记忆完成"></CardTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in rows" :key="_index">
        <span class="item" v-for="(item,index) in number" :key="index">{{index+1}}</span>
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
      let array = new Array(30);
      let rows = new Array(3);
      return {
        seconds: 0,
        minutes: 15,
        text: "确定结束作答吗？",
        number: array,
        rows: rows,
      }
    },
    methods: {

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
    margin-bottom: tovmin(30);
    color: $grey-text;
  }

  .item {
    flex: 1;
    border-right: none;
    height: tovmin(40);
    width: tovmin(28);
    text-align: center;
  }

  .item:nth-last-child(2) {
    margin-right: tovmin(20);
  }

</style>
