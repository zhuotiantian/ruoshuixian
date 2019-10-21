<template>
  <div>
    <div class="content">
      <h3>红包领取规则</h3>
      <p class="text">{{rule}}</p>
      <div class="img_div" v-for="(item,index) in list" :key="index">
        <image class="image" :src=" domain+item.img" @click="getMoney"></image>
        <div>
          <div class="btn default-btn" @click="showRedPocket(item.game_classification_id)" v-if="item.status=='unclaimed'">已完成任务，点击领取</div>
          <div class="btn submit-btn" v-else-if="item.status=='pending_sales'" @click="toGame(item.game_classification_id,item.wxapp_url)">去完成任务</div>
          <div class="small-fog"></div>
        </div>
      </div>
    </div>
    <div class="fog" v-if="showFog"></div>
    <image class="image1" :src="'/static/images/redPocket/redPocket.png'" v-if="showFog" />
    <image class="image2" :src="'/static/images/redPocket/close.png'" v-if="showFog" @click="hideFog" />
    <p class="success" v-if="showFog">恭喜完成任务</p>
    <p class="redPocketBtn" v-if="showFog" @click="toGetRedPocket">点击领取红包</p>
    <CardFooter :index="2"></CardFooter>
  </div>
</template>
<script>
import CardFooter from "@/components/footer";
export default {
  data () {
    return {
      showFog: false,
      rule: "",
      domain: this.$http.domain,
      list: []
    };
  },
  onShow () {
    wx.hideTabBar();
    Object.assign(this.$data, this.$options.data());
    this.token && this.getList();
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data());
    this.token = this.$store.state.userInfo.token;
    // this.getList();
  },
  components: {
    CardFooter
  },
  methods: {
    getList: function () {
      this.$http
        .get({
          url: "/api/wxapp.red_envelopes/redPackList",
          header: {
            token: this.token
          }
        })
        .then(result => {
          this.list = result.data.list.filter(e => {
            return e.game_classification_id !== 0 && e.status !== 'received'
          });
          this.rule = result.data.rule_description;
        });
    },
    getMoney: function () {
      this.showFog = true;
    },
    hideFog: function () {
      this.showFog = false;
    },
    showRedPocket: function (id) {
      this.showFog = true;
      this.game_classification_id = id;
    },
    toGetRedPocket: function () {
      this.$http.post({
        url: "/api/wxapp.red_envelopes/getARedEnvelope",
        data: {
          game_classification_id: this.game_classification_id
        },
        header: {
          token: this.token
        }
      }).then(result => {
        if (result.code == 1) {
          wx.showToast({
            title: "领取成功",
            icon: "success"
          });
          wx.reLaunch({
            url: "/pages/my/hongbao/main"
          });
          this.showFog = false;
        }
      })
    },
    toGame: function (id, url) {
      this.$toGame(id, url);
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  padding: tovmin(30);
  background: $grey-background;
  height: calc(100% - 60rpx);
  position: absolute;
  width: 100%;
}

.default-btn {
  background: white;
}

p {
  margin-top: 10px;
  color: $black;
}

.img_div {
  width: tovmin(690);
  height: tovmin(180);
  overflow: hidden;
  margin-bottom: tovmin(30);
  border-radius: tovmin(12);
  position: relative;
}

.image {
  width: tovmin(750);
  height: tovmin(300);
  position: absolute;
  top: -49%;
  z-index: 1;
}

.text {
  color: #666666;
  margin-bottom: tovmin(30);
}

.btn {
  position: absolute;
  z-index: 999;
  top: tovmin(62);
  left: tovmin(180);
  width: tovmin(310);
  text-align: center;
  font-size: tovmin(24);
  height: tovmin(60);
  line-height: tovmin(60);
  border-radius: tovmin(44);
  font-weight: bold;
}

.default-btn {
  color: $green;
}

.small-fog {
  width: tovmin(750);
  height: tovmin(608);
  position: absolute;
  z-index: 998;
  top: 0;
  background: $black;
  opacity: $opacity;
}

.image1 {
  width: tovmin(438);
  height: tovmin(478);
  position: absolute;
  z-index: 1000;
  top: 40%;
  margin-top: tovmin(-239);
  left: 50%;
  margin-left: tovmin(-219);
}

.image2 {
  width: tovmin(78);
  height: tovmin(78);
  position: absolute;
  z-index: 1000;
  top: 70%;
  margin-top: tovmin(-39);
  left: 50%;
  margin-left: tovmin(-39);
}

.success {
  position: absolute;
  color: $red;
  top: 30%;
  left: 37%;
  z-index: 1000;
}

.redPocketBtn {
  position: absolute;
  top: 49.4%;
  left: 40.5%;
  z-index: 1000;
  font-size: tovmin(24);
}
</style>