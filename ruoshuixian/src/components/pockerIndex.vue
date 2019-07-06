<template>
  <div class="container">
    <CardTitle :seconds="seconds" :minutes="minutes" :type="titleBtn" @toNextPage="toNextPage"></CardTitle>
    <div class="content" v-if="type=='time'">
      <span class="label">请选择闪现时间：</span>
      <div class="btn-group">
        <span :class="{active:activeIndex==0.2}" @click="activeIndex=0.2">0.2S</span><span
          :class="{active:activeIndex==0.5}" @click="activeIndex=0.5">0.5S</span><span :class="{active:activeIndex==1}"
          @click="activeIndex=1">1S</span><span :class="{active:activeIndex==2}" @click="activeIndex=2">2S</span>
      </div>
    </div>
    <div class="content" v-else>
      <span>请选择闪现时间：</span>
      <div class="btn-group">
        <span :class="{active:activeIndex=='All'}" @click="activeIndex='All'">All</span><span
          :class="{active:activeIndex==2}" @click="activeIndex=2">2</span><span :class="{active:activeIndex==4}"
          @click="activeIndex=4">4</span><span :class="{active:activeIndex==8}" @click="activeIndex=8">8</span>
      </div>
    </div>
    <div class="btn submit-btn" @click="toNextPage">{{activeIndex}}</div>
  </div>
</template>
<script>
  import CardTitle from "@/components/gameTitle"
  export default {
    props: ["type", "titleBtn", "nextPage"],
    components: {
      CardTitle
    },
    data() {
      return {
        seconds: 60,
        activeIndex: this.type == 'time' ? 0.2 : "All",
        minutes: 0,
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
      toNextPage: function () {
        wx.navigateTo({
          url: this.nextPage
        })
      },
      to: function (url) {
        wx.navigateTo({
          url
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
    width: 64%;
    text-align: center;
  }

  .label {
    height: tovmin(56);
    line-height: tovmin(56);
  }

  .btn-group span {
    margin-right: tovmin(90);
    width: tovmin(100);
    height: tovmin(56);
    display: inline-block;
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
    margin-top: tovmin(160);
  }

</style>
