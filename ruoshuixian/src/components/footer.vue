<template>
  <ul class="footer" v-if="ratio">
    <li @click="toFisrstPage">
      <image class="icon footer1" :src="'/static/images/firstPage/footer1@'+ratio+'x.png'"></image>
      <span>首页</span>
    </li>
    <li @click="toMoney">
      <image class="icon footer2" :src="'/static/images/firstPage/footer2@'+ratio+'x.png'"></image><span>红包</span>
    </li>
    <li @click="toRecord">
      <image class="icon footer3" :src="'/static/images/firstPage/footer3@'+ratio+'x.png'"></image><span>打卡</span>
    </li>
    <li @click="toMy">
      <image class="icon footer4" :src="'/static/images/firstPage/footer4@'+ratio+'x.png'"></image><span>我的</span>
    </li>
  </ul>
</template>
<script>
  export default {
    beforeMount() {
      this.ratio = this.globalData.ratio;
    },
    data() {
      return {
        ratio: 1,
      }
    },
    methods: {
      toFisrstPage: function () {
        let url = "../firstPage/main";
        this.to(url)
      },
      toMoney: function () {
        let url = "../hongbao/main";
        this.to(url)

      },
      toRecord: function () {
        let url = "../record/main";
        this.to(url)

      },
      toMy: function () {
        let url = "../my/main";
        this.to(url)
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
  .footer {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: $footer;
    font-size: tovmin(22)
  }

  .footer li {
    flex: 1;
    text-align: center;
    height: tovmin(100);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .footer1 {
    height: tovmin(44);
    width: tovmin(44);
  }

  .footer2 {
    height: tovmin(42);
    width: tovmin(38);
  }

  .footer3 {
    height: tovmin(42);
    width: tovmin(42);
  }

  .footer4 {
    height: tovmin(44);
    width: tovmin(42);
  }

</style>
