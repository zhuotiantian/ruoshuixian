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
    beforeCreate() {

    },
    data() {
      return {
        type: "time",
        nextPage: "../flashPocker/memary/main"
      }
    },
  }

</script>
<style lang="scss" scoped>


</style>
