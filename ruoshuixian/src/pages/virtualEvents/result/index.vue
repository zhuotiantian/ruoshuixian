<template>
  <div class="container">
    <CardTitle :seconds="seconds" :minutes="minutes" :isResult="isResult"></CardTitle>
    <div class="list">
      <p class="list-title">
        <span>序号</span>
        <span>时间</span>
        <span>&nbsp;</span>
        <span style="flex:3;">事件</span>
      </p>
      <p><span>1</span><span class="input">1974</span><span class="answer">1974</span><span style="flex:3;">事件事件</span>
        <p><span>2</span><span class="input wrong">1976</span><span class="answer">1974</span><span
            style="flex:3;">事件事件</span>
        </p>
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
      return {
        isResult: true
      }
    }
  }

</script>
<style lang="scss" scoped>
  .list {
    margin: tovmin(150) tovmin(30) auto tovmin(130);
    color: white;
  }

  .list p {
    display: flex;
    align-items: center;
    text-align: center;
    height: tovmin(86);
  }

  .list p span {
    flex: 1;
    line-height: tovmin(60);
  }

  .list-title {
    color: $yellow;
  }

  .input {
    width: tovmin(164);
    height: tovmin(66);
    border: tovmin(2) solid $blue-border;
    border-radius: tovmin(8);
    margin: 0 auto;
  }

  .wrong {
    background: $red;
    border-radius: tovmin(8);
    border: none;
  }

  .answer {
    color: $green;
  }

</style>
