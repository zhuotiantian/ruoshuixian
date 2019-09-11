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
                    <span @click="showPannel=true">
                        <span>{{item.fraction}}</span>
                        <span>
                            <image class="image" :src="'/static/images/my/share.png'"></image>
                        </span>
                        <span>分享</span>
                    </span>
                </li>
            </ul>
        </div>
        <div :class="{drop_up:true,up:showPannel,down:!showPannel}">
            <button open-type="share">发送给好友</button>
            <p>生成海报</p>
            <p style="text-align:center;position:absolute;bottom:2vmin;width:100%" @click="showPannel=false">取消</p>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                active: "打卡记录",

                list: [],
                scores: [],
                showPannel: false
            };
        },
        onShareAppMessage: function(res) {
            return {
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
                this.getList();
                this.getScoreList();
            });
        },
        methods: {
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
            }
        }
    };
</script>

<style lang="scss" scoped>
    .container {
        height: 100%;
        position: absolute;
        width: 100%;
        overflow: hidden;
    }

    .content {
        padding: tovmin(30);
        background: $grey-background;
        height: calc(100% - 172rpx);
        font-size: tovmin(28);
    }

    .header {
        height: tovmin(110);
        background: $deep-blue;
        display: flex;
        justify-content: center;
        color: white;
        align-items: center;
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
        background: white;
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
        background: white;
        position: absolute;
        z-index: 1001;
        bottom: 0;
        left: 0;
        width: calc(100% - 7vmin);
        font-size: tovmin(28);
        padding: tovmin(30);
    }

    .drop_up .title {
        color: #b4b4b4;
        font-size: tovmin(24);
        line-height: tovmin(74);
        text-indent: tovmin(22);
    }

    .drop_up button {
        border-color: #fff;
        background: #fff;
        text-align: left;
        padding: 0;
        font-size: inherit;
        color: inherit;
        position: static;

    }

    .drop_up p {
        margin-bottom: tovmin(30);
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