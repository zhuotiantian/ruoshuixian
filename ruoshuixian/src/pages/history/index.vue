<template>
  <div class="history-wrapper">
    <ul class="list">
      <li v-for="(item,index) in list" :key="index">
        <span>得分：{{item.fraction}}</span>
        <span>耗时：{{item.game_time}}s</span>
        <span>时间：</span>
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
  margin: tovmin(30);
}
.history-wrapper .list {
  height: 100%;
  width: 100%;
  background: #0e2754;
  color: white;
  padding: tovmin(20) tovmin(40);
  border-radius: tovmin(40);
  box-sizing: border-box;
  overflow-y: auto;
}
.history-wrapper .list li {
  display: flex;
  justify-content: space-around;
  line-height: tovmin(80);
}
.history-wrapper .list li:not(:last-child) {
  border-bottom: tomvin(1) solid #eaeaea;
}
.history-wrapper .list li > span {
  flex: 1;
}
</style>
