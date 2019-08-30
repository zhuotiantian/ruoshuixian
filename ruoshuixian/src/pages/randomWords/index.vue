<template>
    <div class="container">
        <CountIndex nextPage="./memary/main"></CountIndex>
    </div>
</template>
<script>
    import CountIndex from "@/components/countIndex"
    export default {
        components: {
            CountIndex
        },
        onLoad() {
            this.gameid = this.$getParams("gameid");
            this.userInfo = this.$getParams("userInfo");
            this.token = this.userInfo.token;
        }
    }
</script>
<style lang="scss" scoped>


</style>