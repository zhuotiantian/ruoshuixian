<template>
  <div class="container">
    <p>游戏规则和帮助游戏规则和帮助游戏规则和帮助游戏规则和帮助游戏规则和帮助游戏规则和帮助</p>
    <image v-if="ratio" class="image" :src="'/static/images/help/qr@'+ratio+'x.png'"></image>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ratio: 1,
      }
    },
    mounted() {
      this.ratio = this.globalData.ratio;
    },
    methods: {

    }
  }

</script>

<style lang="scss" scoped>
  .container {
    color: white;
    padding: tovmin(30);
    text-align: center;
  }

  .image {
    height: tovmin(176);
    width: tovmin(178);
  }

</style>
