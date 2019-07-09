<template>
  <div class="container" v-if="ratio">
    <PockerIndex :type="type" titleBtn="跳过" :nextPage="nextPage"></PockerIndex>
  </div>
</template>
<script>
  import PockerIndex from "@/components/pockerIndex"
  export default {
    components: {
      PockerIndex
    },
    created() {
      this.ratio = this.globalData.ratio;
    },
    data() {
      return {
        type: "time",
        nextPage: "./memary/main",
        ratio: 1,
      }
    },
  }

</script>
<style lang="scss" scoped>


</style>
