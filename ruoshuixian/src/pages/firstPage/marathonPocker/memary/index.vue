<template>
  <div class="container">
    <CardTitle :showType="true" :pannelContent="pannelContent" @group="group" type="记忆完成" @finishMemary="finishMemary">
    </CardTitle>
    <div class="list" v-if="ratio">
      <em class="arrow arrow-left"></em>
      <image class="pocker" ref="pocker" v-for="(item,index) in pocker" :key="index" :style="{'left':item+'rpx'}"
        :src="'/static/images/firstPage/pockerbg@'+ratio+'x.png'" />
      <em class="arrow arrow-right"></em>
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
        pannelContent: ["ALL", "1", "2", "4", "8"],
        pockerCount: 23,
        ratio: 1,
        left: 100,
      }
    },
    mounted() {
      this.ratio = this.globalData.ratio;
    },
    computed: {
      pocker: function () {
        let pocker = [];
        let left0 = this.pockerCount == 23 ? 100 : (350 - 10 * this.pockerCount);
        for (let i = 0; i < this.pockerCount; i++) {
          let left = left0 + 20 * i;
          pocker.push(left)
        };
        return pocker;
      }
    },
    methods: {
      group: function (data) {
        this.pockerCount = data == 'ALL' ? this.pockerCount = 23 : data;
      },
      finishMemary: function () {
        wx.navigateTo({
          url: "../recall/main"
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .list {
    text-align: center;
    margin: 0 auto;
    position: relative;
    height: auto;
    height: tovmin(30);
    display: flex;
    justify-content: space-between;
  }

  .container {
    padding-top: tovmin(200);
  }

  .pocker {
    height: tovmin(382);
    width: tovmin(248);
    position: absolute;
  }

  .arrow {
    left: tovmin(-20);
  }

  .arrow::after {
    position: relative;
    top: tovmin(150);
    height: tovmin(30);
    width: tovmin(30);
    margin: 0 tovmin(60);
  }

</style>
