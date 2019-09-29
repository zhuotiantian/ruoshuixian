<template>
    <div class="container">
        <div class="content">
            <image class="background" src="/static/images/firstPage/bg.png" />
            <div class="top">
                <swiper autoplay="true" circular="true" v-if="imgUrls.length>0">
                    <swiper-item v-for="(item ,index) in imgUrls" :key="index">
                        <image class="top-image" :src="domain+item.image" />
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
        <template v-if="showFog">
            <div class="fog"></div>
            <image class="image1" :src="'/static/images/redPocket/redPocket.png'" />
            <image class="image2" :src="'/static/images/redPocket/close.png'" @click="hideFog" />
            <p class="success">新人注册红包</p>
            <p class="success" style="top:35%;left:42%">{{registPocket[0]["money"]}}元</p>
            <p class="redPocketBtn" @click="toGetRedPocket('regist')">点击领取</p>
        </template>
        <template v-if="showFog1">
            <div class="fog"></div>
            <image class="image1" :src="'/static/images/redPocket/redPocket.png'" />
            <image class="image2" :src="'/static/images/redPocket/close.png'" @click="hideFog1" />
            <p class="success" style="text-align:center;width: 26%;">邀请红包</p>
            <p class="success" style="top:35%;left:44%">{{sharePocket[0]["money"]}}元</p>
            <p class="redPocketBtn" @click="toGetRedPocket('share')">点击领取</p>
        </template>
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
            this.getIndexData();
            this.$setStorage("rule", {});
            this.$setStorage("gameid", "");
            this.$setStorage("level", "");
            this.$setStorage("memoryTime", "");
            this.$setStorage("result", {});
            this.$setStorage("pockerNumber", "");
            let code = this.$getStorage("code");
            let userInfo = this.$getStorage("userInfo");
            this.$getStorage("userInfo").then(result => {
                this.userInfo = result;
                this.token = result.token;
                this.userid = result.id;
                this.getRedPocket();
            });
        },
        onLoad(options) {
            Object.assign(this.$data, this.$options.data());
            if (options.id) this.inviter_id = options.id;
        },
        onShareAppMessage: function(res) {
            return {
                path: "/pages/firstPage/main?id=" + this.userid,
                title: "11种脑力游戏，一起来玩吧！",
                success: function() {
                    console.log("分享成功");
                },
                error: function() {
                    console.log("分享失败");
                }
            };
        },
        data() {
            return {
                games: [],
                domain: this.$http.domain,
                userInfo: null,
                list: [],
                showFog: false,
                showFog1: false,
                imgUrls: [],
                code: null,
                red_envelopes: [],
                userid: null,
                inviter_id: null,
                registPocket: [],
                sharePocket: []
            };
        },
        methods: {
            hideFog: function() {
                this.showFog = false;
            },
            hideFog1: function() {
                this.showFog1 = false;
            },
            showRedPocket: function() {
                this.showFog = true;
            },
            getIndexData: function() {
                this.$http
                    .get({
                        url: "/api/wxapp.index/index",
                        header: {
                            token: this.token
                        }
                    })
                    .then(result => {
                        this.games = result.data.game_list;
                        this.imgUrls = result.data.rotary_planting_map;
                    });
            },
            toGame: function(item) {
                this.$getStorage("userInfo").then(result => {
                    this.$toGame(item.id, item.wxapp_url);
                }).catch(err => {
                    this.$getStorage("code").then(result => {
                        this.code = result;
                        this.$http.post({
                            url: "/api/wxapp.user/login",
                            data: {
                                code: this.code,
                                type: "user"
                            }
                        }).then(result => {
                            if (typeof result.data.userInfo !== 'object') {
                                wx.showToast({
                                    title: result.msg,
                                    icon: "none"
                                });
                                wx.navigateTo({
                                    url: "/pages/auth/main?inviterid=" + this.inviter_id
                                })
                            } else {
                                this.$setStorage("userInfo", result.data.userInfo).then(result => {
                                    this.$toGame(item.id, item.wxapp_url);
                                });
                            }
                        })
                    });
                });
            },
            toRanking: function() {
                let url = "../ranking/main";
                wx.navigateTo({
                    url
                });
            },
            getRedPocket: function() {
                this.$http.get({
                    url: "/api/wxapp.red_envelopes/getRegisterToShareRedEnvelopes",
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    this.red_envelopes = result.data.red_envelopes;
                    this.registPocket = result.data.red_envelopes.filter(e => {
                        return e.name == '注册'
                    });
                    this.sharePocket = result.data.red_envelopes.filter(e => {
                        return e.name !== '注册'
                    });
                    if (this.registPocket.length > 0) {
                        this.showFog = true;
                    };
                    if (this.sharePocket.length > 0) {
                        this.showFog1 = true;
                    };
                })
            },
            toGetRedPocket: function(type) {
                this.$http
                    .post({
                        url: "/api/wxapp.red_envelopes/getARedEnvelope",
                        data: {
                            red_envelopes_id: type == 'regist' ? this.registPocket[0].id : this.sharePocket[0].id,
                            game_classification_id: 0
                        },
                        header: {
                            token: this.token
                        }
                    })
                    .then(result => {
                        if (result.code == 1) {
                            wx.showToast({
                                title: "领取成功",
                                icon: "success"
                            });
                            wx.navigateTo({
                                url: "/pages/my/hongbao/main"
                            });
                            this.showFog = false;
                        }
                    });
            }
        },
        toRanking: function() {
            let url = "../ranking/main";
            wx.navigateTo({
                url
            });
        },
        getRedPocket: function() {
            this.$http.get({
                url: "/api/wxapp.red_envelopes/getRegisterToShareRedEnvelopes",
                header: {
                    token: this.token
                }
            }).then(result => {
                this.red_envelopes = result.data.red_envelopes;
                this.registPocket = result.data.red_envelopes.filter(e => {
                    return e.name == '注册'
                });
                this.sharePocket = result.data.red_envelopes.filter(e => {
                    return e.name !== '注册'
                });
                if (this.registPocket.length > 0) {
                    this.showFog = true;
                };
                if (this.sharePocket.length > 0) {
                    this.showFog = true;
                };
            })
        },
        toGetRedPocket: function(type) {
            this.$http
                .post({
                    url: "/api/wxapp.red_envelopes/getARedEnvelope",
                    data: {
                        red_envelopes_id: type == 'regist' ? this.registPocket[0].id : this.sharePocket[0].id,
                        game_classification_id: 0
                    },
                    header: {
                        token: this.token
                    }
                })
                .then(result => {
                    if (result.code == 1) {
                        wx.showToast({
                            title: "领取成功",
                            icon: "success"
                        });
                        wx.navigateTo({
                            url: "/pages/my/hongbao/main"
                        });
                        this.showFog = false;
                    }
                });
        }
    }
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