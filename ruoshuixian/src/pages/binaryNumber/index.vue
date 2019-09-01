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