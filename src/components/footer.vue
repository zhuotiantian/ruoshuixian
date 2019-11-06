<template>
  <ul class="footer">
    <li @click="toFisrstPage">
      <image class="icon footer1" :src="'/static/images/firstPage/footer1'+(index==1?'_active':'')+'.png'">
      </image>
      <span>首页</span>
    </li>
    <li @click="toMoney">
      <image class="icon footer2" :src="'/static/images/firstPage/footer2'+(index==2?'_active':'')+'.png'">
      </image><span>红包</span>
    </li>
    <li @click="toRecord">
      <image class="icon footer3" :src="'/static/images/firstPage/footer3'+(index==3?'_active':'')+'.png'">
      </image><span>打卡</span>
    </li>
    <li @click="toMy">
      <image class="icon footer4" :src="'/static/images/firstPage/footer4'+(index==4?'_active':'')+'.png'">
      </image><span>我的</span>
    </li>
  </ul>
</template>
<script>
export default {
  props: ["index"],
  data () {
    return {

      active: 1,
      isMember: 3
    };
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data());
    let userInfo = this.$store.state.userInfo;
    if (userInfo) {
      this.isMember = userInfo.group_id !== 1;
      this.token = userInfo.token;
    }
  },
  methods: {
    toFisrstPage: function (index) {
      let url = "/pages/firstPage/main";
      this.to(url, index);
    },
    toMoney: function (index) {
      let url = "/pages/hongbao/main";
      this.to(url, index);
    },
    toRecord: function (index) {
      let url = "/pages/record/main";
      this.to(url, index);
    },
    toMy: function (index) {
      let url = "/pages/my/main";
      this.to(url, index);
    },
    to: function (url) {
      wx.switchTab({
        url
      });
    }
  }
};
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
  font-size: tovmin(22);
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