<template>
  <div class="container">
    <PockerIndex :type="type" :nextPage="nextPage" btnType="none"></PockerIndex>
  </div>
</template>
<script>
  import PockerIndex from "@/components/pockerIndex"
  export default {
    components: {
      PockerIndex
    },
    data() {
      return {
        type: "counts",
        nextPage: "./ready/main"
      }
    }
  }

</script>
<style lang="scss" scoped>


</style>
