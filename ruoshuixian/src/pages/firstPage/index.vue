<template>
  <div class="container">
    <div class="content" v-if="ratio">
      <image class="background" :src="'/static/images/firstPage/bg@'+ratio+'x.png'"></image>
      <div class="top">
        <image class="top-image" :src="'/static/images/firstPage/top@'+ratio+'x.png'" />
      </div>
      <div class="middle">
        <ul>
          <li @click="toRanking">
            <image class="icon ranking" :src="'/static/images/firstPage/排行榜@'+ratio+'x.png'" />
            <span class="flex-span">排行榜</span>
          </li>
          <!-- <li>
            <image class="icon redPocket" :src="'/static/images/firstPage/红包@'+ratio+'x.png'" />
            <span class="flex-span">红包</span>
          </li> -->
          <li>
            <image class="icon share" :src="'/static/images/firstPage/share@'+ratio+'x.png'" />
            <span class="flex-span">分享</span>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <ul v-if="games.length>0">
          <li @click="toGame(item.url)" v-for="(item,index) in games" :key="index">
            <image class="item" :src="'/static/images/firstPage/'+(index/1+1)+'@'+ratio+'x.png'" />
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <CardFooter></CardFooter>
  </div>
</template>
<script>
  import CardFooter from "../../components/footer"
  export default {
    components: {
      CardFooter,

    },
    beforeMount() {
      this.ratio = this.globalData.ratio;
      this.games = this.globalData.games;
    },
    data() {
      return {
        ratio: 1,
        games: [],
      }
    },
    mounted() {},
    methods: {
      toGame: function (url) {
        wx.navigateTo({
          url
        })
      },
      toRanking: function () {
        let url = "./ranking/main"
        wx.navigateTo({
          url
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .content {
    padding: tovmin(40);
    display: grid;
    grid-template-rows: 130px 80px auto;
    grid-template-columns: 100%;
    grid-gap: tovmin(30);
    height: calc(100% - 80px);
  }

  .top-image {
    width: tovmin(670);
    height: tovmin(240);
  }

  .middle ul {
    height: tovmin(160);
    width: tovim(660);
    border-radius: tovmin(18);
    display: flex;
    width: 100%;
    color: #303133;
    background: white;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: tovmin(24);
  }

  .middle ul li {
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .icon {
    height: tovmin(50);
    width: tovmin(46);
    background-repeat: no-repeat;
    margin-bottom: tovmin(24);
  }

  .flex-span {
    flex: 1;
  }

  .bottom {
    color: white;
    width: 100%;
    font-size: tovmin(20);
  }

  .bottom ul {
    display: grid;
    grid-template-columns: 22% 22% 22% 22%;
    grid-template-rows: 30% 30% 30%;
    justify-content: center;
    align-items: center;
    grid-gap: tovmin(30);
    height: 100%;
  }

  .bottom ul li {
    display: flex;
    flex-direction: column;
    background: white;
    color: #303133;
    text-align: center;
    height: 100%;
    border-radius: 4px;
    border: 2px solid #303133;
    justify-content: center;
    align-items: center;
  }

  .bottom ul li span {
    margin-top: tovmin(12)
  }

  .item {
    height: tovmin(116);
    width: tovmin(116);
    margin: 0 auto;
  }

  .ranking {
    height: tovmin(54);
    width: tovmin(52);
  }

  .redPocket {
    height: tovmin(56);
    width: tovmin(48);
  }

  .share {
    height: tovmin(46);
    width: tovmin(62);
  }

  .background {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -6;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

</style>
