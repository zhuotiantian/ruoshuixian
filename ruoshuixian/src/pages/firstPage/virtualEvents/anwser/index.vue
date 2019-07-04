<template>
  <div class="container">
    <CardTitle :seconds="seconds" :minutes="minutes" type="finish"></CardTitle>
  </div>
</template>
<script>
  import CardTitle from "@/components/gameTitle"
  export default {
    components: {
      CardTitle
    },
    data() {
      return {
        seconds: 0,
        minutes: 15
      }
    }
  };

</script>
<style lang="scss" scoped>
  .container {
    background: $deep-blue;
    color: white;
  }

</style>
