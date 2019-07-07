<template>
  <div class="container">
    <PockerIndex :type="type" titleBtn="跳过" :nextPage="nextPage"></PockerIndex>
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
        nextPage: "../marathonPocker/memary/main"
      }
    }
  }

</script>
<style lang="scss" scoped>


</style>
