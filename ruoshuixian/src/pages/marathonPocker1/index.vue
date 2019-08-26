<template>
    <div class="container">
        <PockerIndex type="counts" titleBtn="跳过" nextPage="./ready/main" btnType="none"></PockerIndex>
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