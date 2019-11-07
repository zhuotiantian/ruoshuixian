<template>
  <div class="container">
    <CardTitle ref="title" :isShowTime="isShowTime" :btnType="btnType" :type="titleBtn" @toNextPage="toNextPage">
    </CardTitle>
    <div class="content">
      <div v-if="type=='time'">
        <span class="label">请选择闪视时间：</span>
        <div class="btn-group">
          <span v-for="(item,index) in memoryTime" :class="{active:activeIndex1==item}" @click="activeIndex1=item" :key="index">{{item}}S</span>
        </div>
      </div>
      <div>
        <span class="label">请选择显示方式：</span>
        <div class="btn-group">
          <span v-for="(item,index) in memaryNumber" :key="index" :class="{active:activeIndex2==item}" @click="activeIndex2=item">{{item}}张</span>
        </div>
      </div>
    </div>
    <div class="btn submit-btn" @click="toNextPage">{{type=='time'?"开始":"确定"}}</div>
  </div>
</template>
<script>
import CardTitle from "@/components/gameTitle"
export default {
  props: ["type", "titleBtn", "nextPage", "btnType", "isShowTime"],
  components: {
    CardTitle
  },
  data () {
    return {
      activeIndex1: 2,
      activeIndex2: 4,
      btnType: this.btnType,
      memoryTime: [],
      memaryNumber: ["1", "2", "4", "8"],
    }
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data());
    let rule = this.$store.state.rule
    if (this.type == "time") {
      this.memoryTime = rule.rules_of_the_game[0].memory_time.split(",").reverse();
      this.activeIndex1 = this.memoryTime[0];
    } else {
      this.activeIndex2 = this.memaryNumber[0];
      this.memoryTime = rule.rules_of_the_game[0].memory_time
    }
  },
  methods: {
    toNextPage: function (data) {
      if (this.type == "time") {
        this.$store.commit("setMemoryTime", this.activeIndex1);
      } else {
        this.$store.commit("setMemoryTime", this.memoryTime);
      };
      this.$store.commit("setPockerNumber", this.activeIndex2);
      this.$refs.title.clear();
      wx.reLaunch({
        url: this.nextPage
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  background: $deep-blue;
  color: white;
  text-align: center;
}

.content {
  margin: tovmin(350) auto auto auto;
  display: flex;
  flex-direction: column;
  width: 64%;
  text-align: center;
  justify-content: center;
}
.content > div {
  display: flex;
  justify-content: center;
}
.label {
  height: tovmin(56);
  line-height: tovmin(56);
  font-weight: bold;
  font-size: tovmin(28);
}

.btn-group span {
  margin-right: tovmin(90);
  width: tovmin(100);
  height: tovmin(56);
  display: inline-block;
  font-size: tovmin(26);
}

.btn-group .active {
  border-radius: tovmin(34);
  background: $middle-blue;
  display: inline-block;
  text-align: center;
  line-height: tovmin(56);
}

.submit-btn {
  height: tovmin(98);
  width: tovmin(220);
  border-radius: tovmin(50);
  text-align: center;
  line-height: tovmin(98);
  font-size: tovmin(34);
  margin: 0 auto;
  margin-top: tovmin(130);
}
</style>
