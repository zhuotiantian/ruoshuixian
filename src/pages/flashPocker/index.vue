<template>
  <div class="container">
    <PockerIndex type="time" :isShowTime="false" titleBtn="跳过" nextPage="./memary/main"></PockerIndex>
  </div>
</template>
<script>
import PockerIndex from "@/components/pockerIndex"
export default {
  components: {
    PockerIndex
  }
}
</script>