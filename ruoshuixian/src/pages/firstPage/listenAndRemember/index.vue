<template>
  <div class="container">
    <CountIndex :nextPage="nextPage"></CountIndex>
  </div>
</template>
<script>
  import CountIndex from "@/components/countIndex"
  export default {
    components: {
      CountIndex
    },
    data() {
      return {
        show: false,
        type: "time",
        nextPage: "./listen/main"
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
  }

</script>
<style lang="scss" scoped>


</style>
