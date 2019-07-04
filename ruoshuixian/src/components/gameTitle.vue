<template>
  <div class="title">
    <p class="btn default-btn">帮助</p>
    <p v-if="type=='jump'">00：00：{{seconds}}</p>
    <p v-else>00：{{minutes}}：{{seconds<10?'0'+seconds:seconds}}</p>
    <p class="btn primary-btn" v-if="type=='jump'">跳过</p>
    <p class="btn submit-btn" v-else>记忆完成</p>
  </div>
</template>
<script>
  export default {
    props: ["seconds", "minutes", "type"],
    mounted() {
      this.type == 'finish' ? this.finish() : this.jump();
    },
    data() {
      return {
        seconds: this.seconds,
        minutes: this.minutes
      }
    },
    methods: {
      jump: function () {
        this.timer = setInterval(() => {
          this.seconds--;
          if (this.seconds == 0) {
            clearInterval(this.timer);
          }
        }, 1000);
      },
      finish: function () {
        this.seconds = 60;
        this.minutes = this.minutes - 1;
        this.timer = setInterval(() => {
          if (this.seconds == 0) {
            if (this.minutes > 0) {
              this.minutes--;
              this.seconds = 60;
            } else {
              clearInterval(this.timer);
            }
          } else {
            this.seconds--;
          }
        }, 1000);
      }
    }
  }

</script>
<style lang="scss" scoped>
  .title {
    font-size: tovmin(30);
    display: flex;
    justify-content: space-between;
    margin: tovmin(40) tovmin(30) tovmin(80) tovmin(30);
  }

</style>
