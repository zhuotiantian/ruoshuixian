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
  data () {
    return {
      nextPage: "../memary/main"
    }
  }
}

</script>
