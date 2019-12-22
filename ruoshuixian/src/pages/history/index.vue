<template>
  <div class="history-wrapper">
    <ul class="list">
      <li v-for="(item,index) in list" :key="index">
        <span>得分：{{item.fraction}}</span>
        <span>耗时：{{item.game_time}}s</span>
        <span>时间：{{item.createtime}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: []
    };
  },
  onLoad: function () {
    Object.assign(this.$data, this.$options.data());
    this.token = this.$store.state.userInfo.token;
    this.game_level = this.$store.state.level;
    this.game_id = this.$store.state.gameid;
    this.getHistoryList();
  },
  methods: {
    getHistoryList: function () {
      this.$http
        .get({
          url: "/api/wxapp.game/gameHistory",
          data: {
            game_id: this.game_id,
            game_level: this.game_level
          },
          header: {
            token: this.token
          }
        })
        .then(result => {
          result.data.forEach(e => {
            let init_time = new Date(e.createtime * 1000);
            let formateTime =
              init_time.getFullYear() + "-" +
              (Number(init_time.getMonth() + 1) < 10 ? "0" : "") + Number(init_time.getMonth() + 1) + "-" +
              (init_time.getDate() + 1 < 10 ? "0" : "") + init_time.getDate() + " " +
              (init_time.getHours() < 10 ? "0" : "") + init_time.getHours() + ":" +
              (init_time.getMinutes() < 10 ? "0" : "") + init_time.getMinutes() + ":" +
              (init_time.getSeconds() < 10 ? "0" : "") + init_time.getSeconds()
            e.createtime = formateTime
          });
          this.list = result.data;
        });
    }
  }
};
</script>
<style lang="scss" scope>
page {
  height: 100%;
  width: 100%;
}
.history-wrapper {
  width: calc(100% - 30rpx);
  height: calc(100% - 30rpx);
  margin: 15rpx;
}
.history-wrapper .list {
  height: 100%;
  width: 100%;
  background: #0e2754;
  color: white;
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
  box-sizing: border-box;
  overflow-y: auto;
}
.history-wrapper .list li {
  display: flex;
  justify-content: space-around;
  line-height: 40rpx;
}
.history-wrapper .list li:not(:last-child) {
  border-bottom: 0.5rpx solid #eaeaea;
}
.history-wrapper .list li > span {
  flex: 1;
}
</style>
