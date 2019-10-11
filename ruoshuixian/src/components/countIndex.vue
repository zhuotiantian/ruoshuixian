<template>
  <div class="container">
    <CardTitle :seconds="seconds" type="跳过" pageType="countIndex" @toNextPage="toNextPage"></CardTitle>
    <div class="content">
      <p v-if="memoryTime_minutes>0&&memoryTime_seconds==0">本轮记忆时间：{{memoryTime_minutes}}分钟</p>
      <p v-if="memoryTime_minutes==0&&memoryTime_seconds>0">本轮记忆时间：{{memoryTime_seconds}}秒</p>
      <p v-if="memoryTime_minutes>0&&memoryTime_seconds>0">本轮记忆时间：{{memoryTime_minutes}}分{{memoryTime_seconds}}秒</p>
      <p :class="{proccess,acticve,active:seconds>3&&seconds<=60}">一分钟准备</p>
      <p :class="{proccess,active:seconds>1&&seconds<=3}">脑细胞准备</p>
      <p :class="{proccess,active:seconds>0&&seconds<=1}">开始</p>
      <p>
        <span :class="{radio:true,active:level=='primary'}" @click="selLevel('primary')">初级</span>
        <span :class="{radio:true,active:level=='senior'}" @click="selLevel('senior')">高级</span>
      </p>
    </div>
  </div>
</template>
<script>
import CardTitle from "@/components/gameTitle"
export default {
  props: ["nextPage"],
  components: {
    CardTitle
  },
  onUnload () {
    this.show = false
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data())
    this.show = true;
    this.level = this.$store.state.level;
    this.gameRule = this.$store.state.rule.rules_of_the_game;
    this.rule = this.gameRule.filter(e => {
      return e.game_level == this.level
    })[0];
    this.memoryTime = this.rule.memory_time;
    this.memoryTime_minutes = Math.floor(this.memoryTime / 60);
    this.memoryTime_seconds = this.memoryTime % 60;
    this.timer = setInterval(() => {
      this.seconds--;
      if (this.seconds == 0) {
        clearInterval(this.timer);
        wx.reLaunch({
          url: this.nextPage
        });
      }
    }, 1000);
  },
  data () {
    return {
      level: 'primary',
      seconds: 60,
      memoryTime: null,
      memoryTime_minutes: 0,
      memoryTime_seconds: 0,
      show: false,
      rule: {}
    }
  },
  methods: {
    toNextPage: function (time) {
      clearInterval(this.timer);
      this.seconds = time;
    },
    selLevel: function (level) {
      this.level = level;
      this.$store.commit("setLevel", level);
      let rule = this.gameRule.filter(e => {
        return e.game_level == level
      })[0];
      this.memoryTime = rule.memory_time;
      this.memoryTime_minutes = Math.floor(this.memoryTime / 60);
      this.memoryTime_seconds = this.memoryTime % 60;
    }
  },
}
</script>
<style lang="scss" scoped>
.container {
  background: $deep-blue;
  color: white;
}

.content {
  margin-top: tovmin(180);
}

.content p {
  text-align: center;
  line-height: tovmin(30);
  margin-bottom: tovmin(30);
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