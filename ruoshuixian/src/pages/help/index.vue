<template>
    <div class="container">
        <p>{{content}}</p>
        <!-- <image v-if="ratio" class="image" :src="'/static/images/help/qr@'+ratio+'x.png'"></image> -->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                ratio: 1,
                game_id: 1,
                content: ""
            }
        },
        onLoad() {
            this.userInfo = this.$getParams("userInfo");
            this.game_id = this.$getParams("gameid");
        },
        mounted() {
            this.token = this.userInfo.token;
            this.ratio = this.globalData.ratio;
            this.getHelp();
        },
        methods: {
            getHelp: function() {
                this.$http.get({
                    url: "/api/wxapp.game/help",
                    data: {
                        game_id: this.game_id
                    },
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    this.content = result.data[0]
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        color: white;
        padding: tovmin(30);
        text-align: center;
    }

    .image {
        height: tovmin(176);
        width: tovmin(178);
        margin-top: tovmin(30);
    }
</style>