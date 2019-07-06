<template>
  <div class="container">
    <PockerIndex :type="type" titleBtn="跳过"></PockerIndex>
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
        type: "time"

      }
    },
    mounted() {

    },
    methods: {

    }
  }

</script>
<style lang="scss" scoped>


</style>
