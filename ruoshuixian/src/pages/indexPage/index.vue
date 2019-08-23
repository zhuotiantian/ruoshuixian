<template>
    <div class="container">
        <div class="content">
            <image class="background" src="/static/images/firstPage/bg.png" />
            <div class="top">
                <image class="top-image" :src="domain+topImg" />
            </div>
            <div class="middle">
                <ul>
                    <li @click="toRanking">
                        <image class="icon ranking" src="/static/images/firstPage/ranking_icon.png" />
                        <span class="flex-span">排行榜</span>
                    </li>
                    <li>
                        <button open-type="share">
                            <image class="icon share" src="/static/images/firstPage/share.png" />
                            <span class="flex-span" open-type="share">分享</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div class="bottom">
                <ul v-if="games.length>0">
                    <li @click="toGame(item)" v-for="(item,index) in games" :key="index">
                        <image class="item" :src="domain+item.img" />
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <CardFooter :index="1"></CardFooter>
    </div>
</template>
<script>
    import CardFooter from "@/components/footer";
    export default {
        components: {
            CardFooter
        },
        onShow() {
            wx.hideTabBar();

            this.token = this.userInfo.token;

            this.$http.get({
                url: "/api/wxapp.token/check",
                header: {
                    token: this.token
                }
            }).then(result => {
                if (result.code !== 1) {
                    wx.showToast({
                        title: "登陆信息已过期，请重新登陆"
                    });
                    wx.navigateTo({
                        url: "/pages/login/main"
                    })
                }
            })
        },
        onLoad() {
            Object.assign(this.$data, this.$options.data())
            this.userInfo = this.$getParams("userInfo");

            this.token = this.userInfo.token;
            this.getIndexData();
        },
        onShareAppMessage: function(res) {
            return {
                title: "11种脑力游戏，一起来玩吧！",
                success: function() {
                    console.log("分享成功");
                },
                error: function() {
                    console.log("分享失败");
                }
            }
        },
        data() {
            return {

                games: [],
                domain: this.$http.domain,
                topImg: "",
                userInfo: null
            };
        },
        methods: {
            getIndexData: function() {
                this.$http.get({
                    url: "/api/wxapp.index/index",
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    this.games = result.data.game_list;
                    this.topImg = result.data.rotary_planting_map[0].image
                });
            },
            toGame: function(item) {
                wx.setStorageSync("gameid", item.id);
                this.$http.get({
                    url: "/api/wxapp.game/getGame",
                    data: {
                        game_id: item.id
                    },
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    wx.setStorageSync("rule", result.data);
                    wx.setStorageSync("level", "primary");
                    wx.setStorageSync("result", []);
                    if (this.userInfo) {
                        wx.navigateTo({
                            url: item.wxapp_url
                        });
                    }
                });
            },
            toRanking: function() {
                let url = "../ranking/main";
                wx.navigateTo({
                    url
                });
            },

        }
    };
</script>
<style lang="scss" scoped>
    .content {
        padding: tovmin(10) tovmin(40) tovmin(40) tovmin(40);
        display: grid;
        grid-template-rows: tovmin(240) tovmin(160) auto;
        grid-template-columns: 100%;
        grid-gap: tovmin(30);
        height: calc(100% - 80px);
    }

    .top-image {
        width: tovmin(670);
        height: tovmin(240);
    }

    .middle ul {
        height: tovmin(160);
        width: tovim(660);
        border-radius: tovmin(18);
        display: flex;
        width: 100%;
        color: #303133;
        background: white;
        height: 100%;
        justify-content: center;
        align-items: center;
        font-size: tovmin(24);
    }

    .middle ul li,
    .middle ul li button {
        flex: 1;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .icon {
        height: tovmin(50);
        width: tovmin(46);
        background-repeat: no-repeat;
        margin-bottom: tovmin(24);
    }

    .flex-span {
        flex: 1;
    }

    .bottom {
        color: white;
        width: 100%;
        font-size: tovmin(20);
    }

    .bottom ul {
        display: grid;
        grid-template-columns: 22% 22% 22% 22%;
        grid-template-rows: 30% 30% 30%;
        justify-content: center;
        align-items: center;
        grid-gap: tovmin(30);
        height: 100%;
    }

    .bottom ul li {
        display: flex;
        flex-direction: column;
        background: white;
        color: #303133;
        text-align: center;
        height: 100%;
        border-radius: 4px;
        border: 2px solid #303133;
        justify-content: center;
        align-items: center;
    }

    .bottom ul li span {
        margin-top: tovmin(12);
    }

    .item {
        height: tovmin(116);
        width: tovmin(116);
        margin: 0 auto;
    }

    .ranking {
        height: tovmin(54);
        width: tovmin(52);
    }

    .redPocket {
        height: tovmin(56);
        width: tovmin(48);
    }

    .share {
        height: tovmin(46);
        width: tovmin(62);
    }

    .background {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -6;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    button::after {
        border: none;

    }

    button {
        background-color: transparent;
        font-size: tovmin(28);
    }

    button image {
        margin-bottom: 0;
    }
</style>