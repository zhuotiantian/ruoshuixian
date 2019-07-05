<template>
  <div class="container">
    <CardTitle :seconds="seconds" :minutes="minutes" :type="type" @nextPage="nextPage"></CardTitle>
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
        type: "下一页"
      }
    },
    methods: {
      nextPage: function () {
        this.type = "记忆完成"
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

  .list span {
    border: tovmin(2) solid $blue-border;
    text-align: center;
  }

</style>
