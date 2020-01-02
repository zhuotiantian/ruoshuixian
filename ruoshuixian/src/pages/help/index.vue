<template>
  <div class="container">
    <div v-html="content" class="helpInfo"></div>
    <!-- <image  class="image" :src="'/static/images/help/qr.png'"></image> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      game_id: 1,
      content: ""
    };
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data());
    this.token = this.$store.state.userInfo.token;
    this.game_id = this.$store.state.gameid;
    this.getHelp();
  },
  methods: {
    getHelp: function () {
      this.$http
        .get({
          url: "/api/wxapp.game/help",
          data: {
            game_id: this.game_id
          },
          header: {
            token: this.token
          }
        })
        .then(result => {
          this.content = result.data[0];
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  color: white;
  padding: tovmin(30);
  text-align: left;
  padding-left: tovmin(120);
}

.image {
  height: tovmin(176);
  width: tovmin(178);
  margin-top: tovmin(30);
}
</style>
