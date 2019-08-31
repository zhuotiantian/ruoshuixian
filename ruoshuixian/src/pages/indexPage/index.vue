<template>
    <div class="container">
        <div class="content">
            <image class="background" src="/static/images/firstPage/bg.png" />
            <div class="top">
                <swiper autoplay="true" circular="true">
                    <swiper-item v-for="(item ,index) in imgUrls" :key="index">
                        <image class="top-image" :src="domain+topImg" />
                    </swiper-item>
                </swiper>
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
        <div class="fog" v-if="showFog"></div>
        <image class="image1" :src="'/static/images/redPocket/redPocket.png'" v-if="showFog" />
        <image class="image2" :src="'/static/images/redPocket/close.png'" v-if="showFog" @click="hideFog" />
        <p class="success" v-if="showFog">新人注册红包</p>
        <p class="redPocketBtn" v-if="showFog" @click="toGetRedPocket">点击领取</p>
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
                url: "/api/wxapp.user/getOpenId",
                data: {
                    code: this.$code,
                    type: "user"
                },
                header: {
                    token: this.token
                }
            }).then(result => {
                this.openid = result.data.openid;
            });
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
                    wx.redirectTo({
                        url: "/pages/login/main"
                    })
                }
            });

        },
        onLoad() {
            Object.assign(this.$data, this.$options.data())
            this.userInfo = this.$getParams("userInfo");
            this.code = this.$getParams("code");
            this.token = this.userInfo.token;
            this.$setStorage("rule", {});
            this.$setStorage("gameid", "");
            this.$setStorage("level", "");
            this.$setStorage("memaryTime", "");
            this.$setStorage("result", {});
            this.getIndexData();
            this.getList();
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
                userInfo: null,
                list: [],
                showFog: false,
                imgUrls: [
                    'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
                    'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
                    'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
                ],
            };
        },
        methods: {
            hideFog: function() {
                this.showFog = false;
            },
            showRedPocket: function() {
                this.showFog = true;
            },
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
                this.$toGame(item.id, item.wxapp_url);
            },
            toRanking: function() {
                let url = "../ranking/main";
                wx.navigateTo({
                    url
                });
            },
            getList: function() {
                this.$http
                    .get({
                        url: "/api/wxapp.red_envelopes/redPackList",
                        header: {
                            token: this.token
                        }
                    })
                    .then(result => {
                        this.list = result.data.list.filter(e => {
                            return e.game_classification_id == 0 && e.status !== 'received'
                        });
                        this.showFog = this.list.length > 0;
                    });
            },
            toGetRedPocket: function() {
                this.$http.post({
                    url: "/api/wxapp.red_envelopes/getARedEnvelope",
                    data: {
                        game_classification_id: this.list[0].game_classification_id
                    },
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    if (result.code == 1) {
                        wx.showToast({
                            title: "领取成功",
                            icon: "success"
                        });
                        wx.navigateTo({
                            url: "/pages/hongbao/redPocketList/main"
                        })
                        this.showFog = false;
                    }
                })
            }
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

    .image {
        width: tovmin(750);
        height: tovmin(300);
        position: absolute;
        top: -49%;
        z-index: 1;
    }

    .text {
        color: #666666;
        margin-bottom: tovmin(30);
    }

    .btn {
        position: absolute;
        z-index: 999;
        top: tovmin(62);
        left: tovmin(180);
        width: tovmin(310);
        text-align: center;
        font-size: tovmin(24);
        height: tovmin(60);
        line-height: tovmin(60);
        border-radius: tovmin(44);
        font-weight: bold;
    }

    .default-btn {
        color: $green;
    }

    .small-fog {
        width: tovmin(750);
        height: tovmin(608);
        position: absolute;
        z-index: 998;
        top: 0;
        background: $black;
        opacity: $opacity;
    }

    .image1 {
        width: tovmin(438);
        height: tovmin(478);
        position: absolute;
        z-index: 1000;
        top: 40%;
        margin-top: tovmin(-239);
        left: 50%;
        margin-left: tovmin(-219);
    }

    .image2 {
        width: tovmin(78);
        height: tovmin(78);
        position: absolute;
        z-index: 1000;
        top: 67%;
        margin-top: tovmin(-39);
        left: 50%;
        margin-left: tovmin(-39);
    }

    .success {
        position: absolute;
        color: $red;
        top: 30%;
        left: 37%;
        z-index: 1000;
    }

    .redPocketBtn {
        position: absolute;
        top: 51%;
        left: 44.5%;
        z-index: 1000;
        font-size: 3.2vmin;
    }
</style>