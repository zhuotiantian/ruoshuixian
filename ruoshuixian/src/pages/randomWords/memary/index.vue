<template>
  <div class="container">
    <CardTitle :seconds="seconds" :minutes="minutes" @finishMemary="finishMemary" :type="type" @nextPage="nextPage">
    </CardTitle>
    <div class="list">
      <span v-for="(item,index) in words" :key="index+1">词语{{index+1}}</span>
    </div>
  </div>
</template>

<script>
  import CardTitle from "@/components/gameTitle"
  export default {
    components: {
      CardTitle
    },
    mounted() {

    },
    data() {
      let words = new Array(200);
      return {
        minutes: 15,
        seconds: 0,
        words: words,
        type: "记忆完成"
      }
    },
    methods: {
      nextPage: function () {
        this.type = "记忆完成"
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
    display: grid;
    grid-template-columns: tovmin(200) tovmin(200) tovmin(200) tovmin(200) tovmin(200);
    grid-gap: tovmin(20);
    font-size: tovmin(26);
    justify-content: center;
    align-items: center;
    color: $grey-text;
    margin: tovmin(180) tovmin(30) tovmin(30) tovmin(30);
  }

  .list span {
    border: tovmin(2) solid $blue-border;
    text-align: center;
  }

</style>
