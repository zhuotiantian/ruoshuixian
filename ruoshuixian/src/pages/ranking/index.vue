<template>
  <div class="container">
    <div class="header">
      <span style="flex:1">
        <image class="image" :src="domain+avatar"></image>
      </span>
      <h3 style="flex:6">我的排名</h3>
      <h3 style="flex:1">{{index+1}}</h3>
    </div>
    <div class="content">
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <span style="flex:1">
            <image class="image" :src="domain+item.avatar"></image>
          </span>
          <span style="flex:6">{{item.nickname}}</span>
          <span style="flex:1;display:flex;justify-content:center">
            <image class="icon" v-if="index==0" :src="'/static/images/ranking/ranking1.png'"></image>
            <image class="icon" v-if="index==1" :src="'/static/images/ranking/ranking2.png'"></image>
            <image class="icon" v-if="index==2" :src="'/static/images/ranking/ranking3.png'"></image>
            <span v-if="index>2">{{index+1}}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

      token: "",
      list: [],
      domain: this.$http.domain,
      index: 0,
      avator: ""
    }
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data());
    let userInfo = this.$store.state.userInfo;
    this.token = userInfo.token;
    this.currentUser = userInfo.nickname;
    this.avator = userInfo.avatar
    this.getList();
  },
  methods: {
    getList: function () {
      this.$http.get({
        url: "/api/wxapp.game/rankingList",
        data: {
          ranking_type: 1
        },
        header: {
          token: this.token
        }
      }).then(result => {
        this.list = result.data;
        this.list.forEach((e, index) => {
          if (e.nickname == this.currentUser) {
            this.index = index;
          }
        });
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  color: white;
  height: 100%;
  position: absolute;
  height: 100%;
  width: 100%;
}

.header {
  height: tovmin(130);
  line-height: tovmin(130);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 tovmin(72);
  background: #fff;
  color: #333;
  font-size: tovmin(34);
  font-weight: 600;
}

.content {
  background: $grey-background;
  padding: tovmin(30);
  height: calc(100% - 192px);
  overflow-y: auto;
}

.content ul {
  background: white;
  color: $black;
  box-sizing: content-box;
  height: 100%;
  overflow-y: auto;
}

.content ul li {
  display: flex;
  padding: tovmin(20) tovmin(30);
  align-items: center;
}

.content ul li:nth-child(2n) {
  background: $light-blue;
}

.image {
  height: tovmin(60);
  width: tovmin(60);
  border-radius: tovmin(60);
  vertical-align: middle;
}

.icon {
  width: tovmin(38);
  height: tovmin(49);
}
</style>