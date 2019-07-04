<template>
  <div class="container">
    <div class="title">
      <p class="btn default-btn">帮助</p>
      <p>00：{{memaryTime}}：{{seconds<10?'0'+seconds:seconds}}</p>
      <p class="btn submit-btn">记忆完成</p>
    </div>
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
  export default {
    mounted() {
      this.seconds = 60;
      this.memaryTime = this.memaryTime - 1;;
      this.timer = setInterval(() => {
        this.seconds--;
        if (this.seconds == 0) {
          if (this.memaryTime > 0) {
            this.memaryTime--;
            this.seconds = 60;
          } else {
            clearInterval(this.timer);
          }
        }
      }, 1000);
    },
    data() {
      return {
        memaryTime: 15,
        seconds: 0,
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
    margin: tovmin(40) tovmin(30) auto tovmin(30);

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
