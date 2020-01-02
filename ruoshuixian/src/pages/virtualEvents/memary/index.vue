<template>
  <div class="container">
    <GameTitle :showIntervalTime='true' ref="title" :showFinishMemoryBtn="true" @finishMemary="finishMemary"></GameTitle>
    <div class="list">
      <p class="list-title">
        <span>序号</span>
        <span>时间</span>
        <span style="flex:3;">事件</span>
      </p>
      <p v-for="(item,index) in numberList" :key="index"><span>{{index+1}}</span><span class="year">{{item.date}}</span><span style="flex:3;">{{item.event}}</span></p>
    </div>
  </div>
</template>

<script>
import GameTitle from "@/components/gameTitle_new"
export default {
  components: {
    GameTitle
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data())
    this.init();
  },
  data () {
    return {
      numberList: []
    }
  },
  methods: {
    init: function () {
      let list = this.$store.state.ruleList.list;
      this.numberList = list.date.map((e, index) => {
        return {
          date: e,
          event: list.event[index]
        }
      });
      this.numberList.sort(() => {
        return Math.random() > 0.5 ? -1 : 1
      })
    },
    finishMemary: function () {
      wx.reLaunch({
        url: "../answer/main"
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

.year {
  color: $grey-text;
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
  height: tovmin(80);
  line-height: tovmin(80);
  color: #d6d6d6;
}

.list p span {
  flex: 1;
}

.list-title {
  color: $yellow !important;
}
</style>
