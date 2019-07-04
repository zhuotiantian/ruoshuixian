<template>
  <div class="container">
    <CardTitle :seconds="seconds" type="jump"></CardTitle>
    <div class="content">
      <p>本轮记忆时间：{{memaryTime}}分钟</p>
      <p :class="{proccess,acticve,active:seconds>3&&seconds<=60}">一分钟准备</p>
      <p :class="{proccess,active:seconds>1&&seconds<=3}">脑细胞准备</p>
      <p :class="{proccess,active:seconds>0&&seconds<=1}">开始</p>
      <p>
        <span :class="{radio:true,active:level=='初级'}" @click="selLevel('初级')">初级</span>
        <span :class="{radio:true,active:level=='高级'}" @click="selLevel('高级')">高级</span>
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
    beforeCreate() {

    },
    data() {
      return {
        level: '初级',
        seconds: 60,
        memaryTime: 15,
      }
    },
    mounted() {
      this.timer = setInterval(() => {
        this.seconds--;
        if (this.seconds == 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    methods: {
      selLevel: function (level) {
        this.level = level;
        this.memaryTime = level == '初级' ? 15 : 5;
        this.seconds = 60;
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
    margin: tovmin(40) tovmin(30) tovmin(80) tovmin(30);
  }

  .content p {
    text-align: center;
    line-height: tovmin(30);
    margin-bottom: tovmin(30)
  }

  .content p:last-child {
    margin-top: tovmin(118);
  }

  .content p span:first-child {
    margin-right: tovmin(170);
  }

  p.active {
    color: $middle-blue;
  }

</style>
