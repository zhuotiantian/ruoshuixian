<template>
  <CountIndex :nextPage="nextPage"></CountIndex>
</template>
<script>
  import CountIndex from "@/components/countIndex"
  export default {
    components: {
      CountIndex
    },
    data() {
      return {
        nextPage: "./memary/main",
      }
    },
  }

</script>
<style lang="scss" scoped>


</style>
