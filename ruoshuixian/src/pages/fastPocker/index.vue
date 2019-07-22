<template>
  <div class="container" v-if="ratio">
    <PockerIndex :type="type" :nextPage="nextPage" btnType="none"></PockerIndex>
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
        type: "counts",
        nextPage: "./ready/main",
        ratio: 1,
      }
    },
  }

</script>
