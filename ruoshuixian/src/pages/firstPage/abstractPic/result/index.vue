<template>
  <div class="container">
    <CardTitle :isResult="true" :sconds="seconds" :minutes="minutes"></CardTitle>
    <div class="list">
      <div class="row" v-for="(rows,_index) in rows" :key="_index">
        <div class="image_div" v-for="(item,index) in number" :key="index">
          <image class="image" :src="'/static/images/firstPage/abstract@'+ratio+'x.png'" />
          <span class="input">序号</span>
        </div>
        <span>row&nbsp;&nbsp;{{_index+1}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import CardTitle from "@/components/gameTitle";
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
      number: array,
      rows: rows,
      ratio: 1
    };
  },
  mounted() {
    this.ratio = this.globalData.ratio;
  },
  methods: {}
};
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
  display: inline-block;
  width: tovmin(88);
}
</style>
