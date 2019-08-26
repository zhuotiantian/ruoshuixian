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
        },
        mounted() {
            this.getRule();
        },
        methods: {
            getRule: function() {
                this.$http.get({
                    url: "/api/wxapp.game/getGame",
                    data: {
                        game_id: this.gameid
                    },
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    wx.setStorageSync("rule", result.data);
                    wx.setStorageSync("level", "primary");
                    wx.setStorageSync("result", []);
                });
            }
        }
    }
</script>
<style lang="scss" scoped>


</style>