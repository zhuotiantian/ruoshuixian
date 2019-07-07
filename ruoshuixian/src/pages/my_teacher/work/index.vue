<template>
  <div class="container">
    <div class="fog" v-if="showDrop||showSuccessBox" @click="showDrop=false"></div>
    <div class="alertBox" v-if="showSuccessBox&&ratio">
      <image class="image" :src="'/static/images/my/check@'+ratio+'x.png'"></image>
      <span>发布成功</span>
    </div>
    <div class="top">
      <input placeholder-style="color: #AFAFAF;" type="text" placeholder="请输入作业名称">
      <p class="item" @click="showDrop=true">组别</p>
      <p class="item">学生</p>
    </div>
    <div class="middle">
      <p class="title">选择游戏：</p>
      <ul class="gameList">
        <li v-for="(item,index) in game" :key="index">
          <em class="checkBox"></em>
          <!-- <image class="checkBox" :src="'/static/images/my/checkbox@'+ratio+'x.png'" /> -->
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <textarea name="" id="" cols="30" rows="10" placeholder="备注"></textarea>
    <p style="text-align:center"><button class="submit-btn btn" @click="sendMessage">点评</button></p>
    <div :class="{drop_up:true,up:showDrop,down:!showDrop}">
      <p class="title">组别选择</p>
      <scroll-view :style="{'height': '384rpx'}" scroll-y="true">
        <ul class="list">
          <li>一组
            <image class="icon" :src="'/static/images/my/select.png'"></image>
          </li>
          <li>两组
          </li>
        </ul>
      </scroll-view>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showDrop: false,
        game: [],
        ratio: 1,
        showSuccessBox: false,
      }
    },
    mounted() {
      this.game = this.globalData.games;
      this.ratio = this.globalData.ratio;
    },
    methods: {
      sendMessage: function () {
        this.showSuccessBox = true;
        setTimeout(() => {
          this.showSuccessBox = false;
        }, 1500);
      }
    }
  }

</script>
<style lang="scss" scoped>
  .top input,
  .top .item {
    border-bottom: 1px solid #F3F3F3;
    height: tovmin(100);
    line-height: tovmin(100);

  }

  .top .item {
    color: #c6c6c6;
  }

  .container {
    padding: tovmin(60);
    position: fixed;
    height: calc(100% - 120rpx);
    width: calc(100% - 120rpx);
    background: $grey-background;
    box-sizing: content-box;
  }

  .title {
    color: $black;
  }

  .middle {
    margin-top: 31px;
  }

  .gameList {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    grid-template-rows: 23% 23% 23% 23%;
    grid-gap: 10px;
    justify-content: center;
    align-items: center;
    margin-top: tovmin(38);
    font-size: tovmin(26);
  }

  .gameList {
    white-space: nowrap;
  }

  textarea {
    margin-top: tovmin(60);
    font-size: tovmin(26);
  }

  .btn {
    width: tovmin(362);
    height: tovmin(88);
    line-height: tovmin(88);
    border-radius: tovmin(44);
    border: tovmin(2) solid transparent;
    font-size: 14px;
    margin: 0 auto;
  }

  .drop_up {
    height: tovmin(460);
    background: white;
    position: absolute;
    z-index: 1001;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: tovmin(28);
  }

  .drop_up .title {
    color: #B4B4B4;
    font-size: tovmin(24);
    line-height: tovmin(74);
    text-indent: tovmin(22);
  }

  .list {
    width: 100%;
  }

  .list li {
    height: tovmin(88);
    line-height: tovmin(88);
    padding: 0 tovmin(30);
  }

  .list li:nth-child(2n) {
    background: #F8FBFF;
  }

  .icon {
    height: tovmin(28);
    width: tovmin(32);
    float: right;
  }

  .image {
    width: tovmin(88);
    height: tovmin(88);
    margin-bottom: tovmin(40);
  }

  .alertBox {
    background: white;
    display: flex;
    flex-direction: column;
    height: tovmin(272);
    width: tovmin(272);
    border-radius: tovmin(22);
    position: absolute;
    top: 35%;
    left: 50%;
    margin-left: tovmin(-136);
    z-index: 1001;
    justify-content: center;
    align-items: center;
  }

  .down {
    animation: slide-down .5s;
    animation-fill-mode: forwards
  }

  .up {
    animation: slide-up .5s;
    animation-fill-mode: forwards
  }

  @keyframes slide-down {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(tovmin(1000));
      display: block;
    }
  }

  @keyframes slide-up {
    from {
      transform: translateY(tovmin(1000));
    }

    to {
      transform: translateY(0);
      display: none;
    }
  }

</style>
