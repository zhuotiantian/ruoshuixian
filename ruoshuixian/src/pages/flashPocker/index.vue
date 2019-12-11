<template>
  <div class="container">
    <PockerIndex type="time" :isShowTime="false" titleBtn="跳过" nextPage="./memary/main"></PockerIndex>
    <template>
      <div class="fog"></div>
    </template>
  </div>
</template>
<script>
import PockerIndex from "@/components/pockerIndex"
export default {
  components: {
    PockerIndex
  },
  data () {
    return {
      isNew: false
    }
  },
  onShow () {
    this.isNew = this.$store.state.isNew;
  },
  methods: {
    getGameHelp: function () {

    }
  }
}
</script>
