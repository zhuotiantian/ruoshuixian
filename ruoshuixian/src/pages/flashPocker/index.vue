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
            let gameid = this.$getStorage("gameid");
            let userInfo = this.$getStorage("userInfo");
            Promise.all([gameid.userInfo]).then(values => {
                this.gameid = values[0];
                this.token = values[1].token;
            })
        },
        data() {
            return {
                gameid: null,
                token: null
            }
        }
    }
</script>