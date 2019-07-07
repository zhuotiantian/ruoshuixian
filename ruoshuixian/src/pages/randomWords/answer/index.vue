<template>
  <div class="container">
    <div class="fog" v-if="showFog"></div>
    <alertBox :text="text" v-if="showFog" @hideFog="hideFog" @confirm="confirm"></alertBox>
    <CardTitle :seconds="seconds" :minutes="minutes" :type="type" @finish="finish" @nextPage="nextPage"></CardTitle>
    <div class="list">
      <span v-for="(item,index) in words" :key="index+1"><span>{{index+1}}</span><input type="text"
          class="input"></span>
    </div>
  </div>
</template>

<script>
  import CardTitle from "@/components/gameTitle"
  import alertBox from "@/components/alertBox"
  export default {
    components: {
      CardTitle,
      alertBox
    },
    mounted() {

    },
    data() {
      let words = new Array(200);
      return {
        minutes: 15,
        seconds: 0,
        words: words,
        type: "下一页",
        showFog: false,
        text: "确定结束作答吗？",
      }
    },
    methods: {
      nextPage: function () {
        this.type = "作答完成"
      },
      finish: function () {
        this.showFog = true;
        console.log("111");
      },
      hideFog: function () {
        this.showFog = false;
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
    background: $deep-blue;
    color: white;
  }

  .title {
    font-size: tovmin(30);
    display: flex;
    justify-content: space-between;
    margin: tovmin(40) tovmin(30) 0 tovmin(30);
  }

  .list {
    margin: tovmin(150) tovmin(30) tovmin(30) tovmin(30);
  }

  .list {
    display: grid;
    grid-template-columns: tovmin(200) tovmin(200) tovmin(200) tovmin(200) tovmin(200);
    grid-gap: tovmin(20);
    font-size: tovmin(26);
    justify-content: center;
    align-items: center;
    color: $grey-text;
  }

  .list>span {
    border: tovmin(2) solid $blue-border;
    text-align: center;
    display: inline-block;
  }

  .input {
    border-bottom: tovmin(2) solid $grey-text;
    display: inline-block;
    width: tovmin(134);
    font-size: tovmin(26);
  }

</style>
