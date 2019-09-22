<template>
    <div class="container">
        <div class="fog" v-if="showPannel" @click="showPannel=false"></div>
        <div class="header">
            <span :class="{active:active=='打卡记录'}" @click="active='打卡记录'">打卡记录</span>
            <span :class="{active:active=='成绩记录'}" @click="active='成绩记录'">成绩记录</span>
        </div>
        <div class="content">

            <ul class="list" v-if="active=='打卡记录'">
                <scroll-view>
                    <li v-for="(item,index) in list" :key="index">
                        <span>{{item.createtime}}</span>
                        <span>打卡成功</span>
                    </li>
                </scroll-view>
            </ul>
            <ul class="list" v-else>
                <li v-for="(item,index) in scores" :key="index">
                    <span>{{item.game}}</span>
                    <span @click="toShare(item)">
                        <span>{{item.fraction}}</span>
                        <span>
                            <image class="image" :src="'/static/images/my/share.png'"></image>
                        </span>
                        <span>分享</span>
                    </span>
                </li>
                <painter @imgOK="onImgOk" :palette="template" style="position:fixed;top:-99999px" />
            </ul>

        </div>
        <div :class="{drop_up:true,up:showPannel,down:!showPannel}">
            <button open-type="share">发送给好友</button>
            <button @click="alertBox">生成海报</button>
            <button style="text-align:center;width:calc(100% - 10vmin)" @click="showPannel=false">取消</button>
        </div>

        <template v-if="showFog">

            <div class="fog"></div>
            <div class="alertBox" id="wrapper">
                <div class="top draw">
                    <div class="alertHeader draw">
                        <div class="userImage draw">
                            <image class="image draw" data-type="radius-image" :data-url="icon==''?userInfo.avatar:icon" :src="icon==''?userInfo.avatar:icon" @click="uploadImg"></image>
                        </div>
                        <div class="draw">
                            <p class="draw" data-type="text" :data-text="userInfo.nickname">{{userInfo.nickname}}</p>
                            <p class="info draw" data-type="text" :data-text="'给你推荐了一款好玩的游戏《'+currentGameInfo.game+'》'">给你推荐了一款好玩的游戏《{{currentGameInfo.game}}》</p>
                        </div>
                    </div>
                    <div class="alertContent draw">
                        <div class="draw">
                            <p class="draw" data-type="text" data-text="得分">得分</p>
                            <p class="data draw" data-type="text" :data-text="currentGameInfo.fraction">{{currentGameInfo.fraction}}</p>
                        </div>
                        <div class="draw">
                            <p class="draw" data-type="text" data-text="排名">排名</p>
                            <p class="data draw" data-type="text" :data-text="currentGameInfo.fraction">{{currentGameInfo.fraction}}</p>
                        </div>
                    </div>
                    <image class="draw" data-type="image" :data-url="domain+currentGameInfo.img" :src="domain+currentGameInfo.img"></image>
                    <div class="bottom draw">
                        <p class="draw" data-type="text" data-text="快来挑战我吧~">快来挑战我吧~</p>
                        <image class="draw" data-type="image" :data-url="domain+currentGameInfo.img" :src="domain+currentGameInfo.img"></image>
                    </div>
                </div>
                <div class="footer">
                    <button class="btn" style="flex:3" @click="drawCanvas">保存成图片</button>
                    <button class="btn" style="flex:1;background-color:white;color:inherit;margin-left:30rpx" @click="showFog=false">取消</button>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                active: "打卡记录",
                list: [],
                scores: [],
                showPannel: false,
                showFog: false,
                userInfo: {},
                icon: "",
                mobile: "",
                currentGameInfo: {},
                domain: this.$http.domain,
                template: {},
                userid: null
            };
        },
        onShareAppMessage: function(res) {
            return {
                path: "pages/firstPage/main?id=" + this.userid,
                title: "来跟我一起玩吧~~",
                success: function() {
                    console.log("分享成功");
                },
                error: function() {
                    console.log("分享失败");
                }
            };
        },
        onLoad() {
            Object.assign(this.$data, this.$options.data());
            this.$getStorage("userInfo").then(result => {
                this.token = result.token;
                this.userInfo = result;
                this.userid = result.id;
                this.getList();
                this.getScoreList();
                let that = this;
                wx.getSystemInfo({
                    success: (res) => {
                        that.width = res.screenWidth;
                        that.height = res.screenHeight;
                    }
                })
            });
        },
        methods: {
            onImgOk: function(e) {
                wx.hideLoading();
                this.imagePath = e.mp.detail.path;
            },
            drawCanvas: function() {
                let that = this;
                wx.saveImageToPhotosAlbum({
                    filePath: this.imagePath,
                    success: res => {
                        wx.showModal({
                            title: '已保存到系统相册',
                            success: res => {
                                this.showFog = false;
                            },
                            error: err => {
                                if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                                    wx.openSetting({
                                        success: result => {
                                            this.drawCanvas();
                                        }
                                    })
                                }
                            }
                        })
                    },
                    fail: err => {
                        if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                            wx.openSetting({
                                success: result => {
                                    this.drawCanvas();
                                }
                            })
                        }
                    }
                })
                this.template = {} // 重置,下次点击生成时重新生成
            },
            getList: function() {
                this.$http
                    .get({
                        url: "/api/wxapp.student/punchInRecord",
                        header: {
                            token: this.token
                        }
                    })
                    .then(result => {
                        if (result.code == 1) {
                            this.list = result.data;
                        } else {
                            wx.showToast({
                                title: result.msg,
                                icon: none
                            });
                        }
                    });
            },
            toShare: function(item) {
                this.currentGameInfo = item;
                wx.showLoading({
                    title: '生成中',
                    success: res => {
                        this.showPannel = true;
                    }
                });
                this.showFog = false;
                this.template = {
                    background: "#173771",
                    width: '875px',
                    height: '1301px',
                    views: [{
                            type: 'image',
                            url: this.userInfo.avatar,
                            css: {
                                top: '30px',
                                left: '30px',
                                width: '96px',
                                height: '96px',
                                borderRadius: "48px",
                            }
                        }, {
                            type: 'text',
                            text: this.userInfo.nickname,
                            css: {
                                top: '30px',
                                left: '156px',
                                fontSize: "40px",
                                color: "white"
                            }
                        },
                        {
                            type: 'text',
                            text: '给你推荐了一款好玩的游戏《' + this.currentGameInfo.game + '》',
                            css: {
                                top: '90px',
                                left: '156px',
                                fontSize: "20px",
                                color: "#999999"
                            }
                        },
                        {
                            type: 'rect',
                            css: {
                                top: '200px',
                                left: '30px',
                                height: "198px",
                                width: "815px",
                                color: "#F8B551",
                                borderRadius: "20px",
                            }
                        },
                        {
                            type: 'text',
                            text: '得分',
                            css: {
                                top: '230px',
                                left: '156px',
                                fontSize: "40px",
                                color: "#333"
                            }
                        },
                        {
                            type: 'text',
                            text: '排名',
                            css: {
                                top: '230px',
                                right: '156px',
                                fontSize: "36px",
                                color: "#333"
                            }
                        },
                        {
                            type: 'text',
                            text: String(this.currentGameInfo.fraction),
                            css: {
                                top: '300px',
                                left: '175px',
                                fontSize: "36px",
                                color: "#333"
                            }
                        },
                        {
                            type: 'text',
                            text: String(this.currentGameInfo.fraction),
                            css: {
                                top: '300px',
                                right: '175px',
                                fontSize: "36px",
                                color: "#333"
                            }
                        },
                        {
                            type: 'image',
                            url: this.domain + this.currentGameInfo.img,
                            css: {
                                top: '450px',
                                left: '30px',
                                width: '815px',
                                height: '258px',
                                borderRadius: "20px",
                            }
                        },
                        {
                            type: 'text',
                            text: "快来一起玩吧~",
                            css: {
                                bottom: '300px',
                                left: "330px",
                                fontSize: "36px",
                                color: "white"
                            }
                        },
                        {
                            type: 'image',
                            url: this.domain + this.currentGameInfo.img,
                            css: {
                                bottom: '60px',
                                left: '350px',
                                width: '168px',
                                height: '168px',
                            }
                        },
                    ]
                };
            },
            getScoreList: function() {
                this.$http
                    .get({
                        url: "/api/wxapp.game/achievement",
                        header: {
                            token: this.token
                        }
                    })
                    .then(result => {
                        if (result.code == 1) {
                            this.scores = result.data;
                        } else {
                            wx.showToast({
                                title: result.msg,
                                icon: none
                            });
                        }
                    });
            },
            alertBox: function() {
                this.showFog = true;
                this.showPannel = false;
            },

        }
    };
</script>

<style lang="scss" scoped>
    .alertBox {
        position: absolute;
        top: 10vmin;
        bottom: 0;
        left: 10vmin;
        right: 0;
        z-index: 1001;
        height: 80%;
        width: 80%;

    }

    .alertBox>div:not(:last-child) {
        padding: tovmin(30);
        box-sizing: border-box;
        height: 100%;
        width: 100%;
    }

    .footer {
        display: flex;
        padding: 0 !important;
        margin-top: tovmin(30);
    }

    .alertBox .top {
        background-color: $deep-blue;
    }

    .alertHeader image {
        height: tovmin(96);
        width: tovmin(96);
        border-radius: 50%;
    }

    .alertBox .alertHeader {
        height: 20vmin;
        background-color: $deep-blue;
        color: white;
        display: flex;
        align-items: center;
        font-size: tovmin(34);
        // padding: 0 tovmin(32);
        margin-bottom: tovmin(30);
    }

    .alertBox .bottom {
        position: relative;
        color: white;
        top: tovmin(100);
        text-align: center;

    }

    .alertBox .bottom image {
        height: tovmin(168);
        width: tovmin(168);
        margin-top: tovmin(30);
    }

    .data {
        font-size: tovmin(36);
        font-weight: bold;
        margin-top: tovmin(16);
    }

    .info {
        font-size: tovmin(24);
        color: $light-black;
    }

    .alertContent {
        background-color: $yellow;
        border-radius: tovmin(16);
        height: tovmin(150);
        display: flex;
        justify-content: space-around;
        align-items: center
    }

    .alertBox>div>image {
        height: tovmin(198);
        width: 100%;
        border-radius: tovmin(20);
        margin-top: tovmin(30);
    }

    .alertContent>div>p {
        text-align: center;
    }

    .container {
        height: 100%;
        position: absolute;
        width: 100%;
        overflow: hidden;
    }

    .content {
        padding: tovmin(30);
        background-color: $grey-background;
        height: calc(100% - 172rpx);
        font-size: tovmin(28);
    }

    .header {
        height: tovmin(110);
        background-color: $deep-blue;
        display: flex;
        justify-content: center;
        color: white;
        align-items: center;
    }

    .btn {
        width: tovmin(300);
        height: tovmin(70);
        line-height: tovmin(70);
        border-radius: tovmin(8);
        background-color: $deep-blue;
        color: white;
    }

    .header span {
        flex: 1;
        text-align: center;
    }

    .header span.active {
        color: $middle-blue;
        position: relative;
    }

    .header span.active::after {
        content: "";
        height: 0;
        width: 0;
        border-color: transparent transparent white transparent;
        border-style: dashed dashed solid dashed;
        border-width: tovmin(20);
        position: absolute;
        top: tovmin(35);
        right: 45%;
    }

    .list {
        background-color: white;
        padding: 15px;
        height: calc(100% - 30px);
        overflow-y: scroll;
    }

    .list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: tovmin(90);
        border-bottom: tovmin(2) solid $grey-background;
    }

    .list li:last-child {
        border-bottom: none;
    }

    .list li>span {
        flex: 6;
    }

    .list li>span:last-child {
        text-align: right;
    }

    .list li>span:last-child span:first-child {
        margin-right: 5px;
    }

    .image {
        width: tovmin(28);
        height: tovmin(28);
        vertical-align: middle;
        margin-right: tovmin(10);
        margin-left: tovmin(20);
    }

    .drop_up {
        height: tovmin(230);
        background-color: white;
        position: absolute;
        z-index: 1001;
        bottom: 0;
        left: 0;
        width: calc(100% - 7vmin);
        font-size: tovmin(28);
        padding: tovmin(30);
        text-align: center;
    }

    .drop_up .title {
        color: #b4b4b4;
        font-size: tovmin(24);
        line-height: tovmin(74);
        text-indent: tovmin(22);
    }

    .drop_up button {
        border-color: #fff;
        background-color: #fff;
        text-align: center;
        padding: 0;
        font-size: inherit;
        color: inherit;

    }

    .drop_up button::after {
        border-radius: 0;
        border: none;
    }

    .drop_up p {
        margin-bottom: tovmin(30);
        margin-top: tovmin(30);
    }

    .drop_up image {
        height: tovmin(40);
        width: tovmin(40);
        vertical-align: middle;
        margin-right: tovmin(30);
    }

    .down {
        animation: slide-down 0.5s;
        animation-fill-mode: forwards;
    }

    .up {
        animation: slide-up 0.5s;
        animation-fill-mode: forwards;
    }

    @keyframes slide-down {
        from {
            transform: translateY(0);
        }

        to {
            transform: translateY(tovmin(1000));
            display: block;
        }
    }

    @keyframes slide-up {
        from {
            transform: translateY(tovmin(1000));
        }

        to {
            transform: translateY(0);
            display: none;
        }
    }
</style>