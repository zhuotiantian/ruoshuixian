<template>
    <div class="container">
        <PockerIndex type="time" titleBtn="跳过" nextPage="./memary/main"></PockerIndex>
    </div>
</template>
<script>
    import PockerIndex from "@/components/pockerIndex"
    export default {
        components: {
            PockerIndex
        },
        onLoad() {
            this.gameid = this.$getParams("gameid");
            this.userInfo = this.$getParams("userInfo");
            this.token = this.userInfo.token;
        },
        data() {
            return {
                gameid: null,
                token: null
            }
        }
    }
</script>