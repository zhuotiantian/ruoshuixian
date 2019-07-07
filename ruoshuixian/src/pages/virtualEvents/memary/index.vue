<template>
  <div class="container">
    <CardTitle :seconds="seconds" :minutes="minutes" type="记忆完成" @finishMemary="finishMemary"></CardTitle>
    <div class="list">
      <p class="list-title">
        <span>序号</span>
        <span>时间</span>
        <span style="flex:3;">事件</span>
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
    mounted() {

    },
    data() {
      return {
        minutes: 15,
        seconds: 0,
      }
    },
    methods: {
      finishMemary: function () {
        wx.navigateTo({
          url: "../anwser/main"
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
    margin: tovmin(150) tovmin(30) auto tovmin(130);
  }

  .list p {
    display: flex;
    align-items: center;
    text-align: left;
  }

  .list p span {
    flex: 1;
  }

  .list-title {
    color: $yellow;
  }

</style>
