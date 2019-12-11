<template>
  <div class="container">
    <CardTitle :seconds="seconds" :isShowTime="false" pageType="countIndex" :noWait="hideProccess"></CardTitle>
    <div class="content">
      <p>本轮记忆时间：{{memoryTime}}秒</p>
      <p style="margin-top:80rpx">
        <span :class="{radio:true,active:level=='primary'}" @click="selLevel('primary')">初级</span>
        <span :class="{radio:true,active:level=='senior'}" @click="selLevel('senior')">高级</span>
      </p>
      <p>
        <span class="btn submit-btn" @click="toNextPage">开始</span>
      </p>
    </div>
  </div>
</template>
<script>
import CardTitle from "@/components/gameTitle"
export default {
  props: {
    nextPage: null,
    hideProccess: {
      type: Boolean,
      default: true
    }
  },
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
      // this.seconds = time;

      wx.reLaunch({
        url: this.nextPage
      });
    },
    selLevel: function (level) {
      this.level = level;
      this.$store.commit("setLevel", level);
      let rule = this.gameRule.filter(e => {
        return e.game_level == level
      })[0];
      this.memoryTime = rule.memory_time;
    }
  },
}
</script>
<style lang="scss" scoped>
.container {
  background: $deep-blue;
  color: white;
  text-align: center;
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

.content p:not(:last-child) span:first-child {
  margin-right: tovmin(170);
}

p.active {
  color: $middle-blue;
}
.submit-btn {
  margin-right: 0 !important;
  margin-top: tovmin(50);
}
</style>
