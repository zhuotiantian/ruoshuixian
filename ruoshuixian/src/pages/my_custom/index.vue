<template>
    <div class="container" v-if="ratio">
        <div class="header">
            <div class="userImage">
                <image class="image" :src="'/static/images/my/my_icon1@'+ratio+'x.png'"></image>
            </div>
            <span style="flex:7">注册/登录</span>
        </div>
        <div class="content">
            <ul>
                <li @click="toRanking">
                    <image class="item" style="height:44rpx;width:42rpx;" :src="'/static/images/my/my_icon2@'+ratio+'x.png'">
                    </image>
                    <span>排行榜</span>
                </li>
                <button open-type="share">
                    <li>
                        <image class="item" style="height:40rpx;width:46rpx;" :src="'/static/images/my/my_icon3@'+ratio+'x.png'">
                        </image>
                        <span>分享邀请</span>

                    </li>
                </button>
                <li @click="toHongbao">
                    <image class="item" :src="'/static/images/my/my_icon6@'+ratio+'x.png'"></image>
                    <span>红包</span>
                </li>
                <li @click="toRecord">
                    <image class="item" style="height:48rpx;width:38rpx;" :src="'/static/images/my/my_icon4@'+ratio+'x.png'">
                    </image>
                    <span>我的记录</span>
                </li>
                <li @click="toMessage">
                    <image class="item" style="height:44rpx;width:46rpx;" :src="'/static/images/my/my_icon5@'+ratio+'x.png'">
                    </image>
                    <span class="last">我的消息</span>
                </li>
            </ul>
        </div>
        <CardFooter></CardFooter>
    </div>
</template>
<script>
    import CardFooter from "@/components/footer"
    export default {
        components: {
            CardFooter
        },
        mounted() {
            this.ratio = this.globalData.ratio;
        },
        data() {
            return {
                ratio: 1
            }
        },
        onShareAppMessage: function(res) {
            return {
                title: "11种脑力游戏，一起来玩吧！",
                path: "/pages/indexPage/main",
                success: function() {
                    console.log("分享成功");
                },
                error: function() {
                    console.log("分享失败");
                }
            }
        },
        methods: {
            toRanking: function() {
                let url = "./ranking/main";
                this.to(url)
            },
            toHongbao: function() {
                let url = "./hongbao/main";
                this.to(url)
            },
            toRecord: function() {
                let url = "./record/main";
                this.to(url)
            },
            toMessage: function() {
                let url = "./message/main";
                this.to(url)
            },
            to: function(url) {
                wx.navigateTo({
                    url
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .userImage {
        height: tovmin(120);
        width: tovmin(120);
        background: $grey-background;
        border-radius: tovmin(120);
        text-align: center;
        margin-right: tovmin(22);
    }

    .userImage .image {
        position: relative;
        top: 50%;
        margin-top: tovmin(-40)
    }

    .container {
        background: $grey-background;
        height: 100%;
        position: absolute;
        width: 100%;
    }

    .header {
        height: tovmin(250);
        background: $deep-blue;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: tovmin(34);
        padding: 0 tovmin(32);
    }

    .image {
        height: tovmin(84);
        width: tovmin(78);
    }

    .content {
        padding: tovmin(30);
    }

    .content ul li {
        display: flex;
        justify-content: center;
        height: tovmin(120);
        font-size: tovmin(32);
        align-items: center;
        line-height: tovmin(120);

    }

    .item {
        height: tovmin(44);
        width: tovmin(42);
        margin-right: tovmin(38);
    }

    .content ul li span {
        flex: 7;
        border-bottom: tovmin(2) solid #E4E7ED;
    }

    .last {
        border-bottom: none !important;
    }

    button::after {
        border: none;

    }

    button {
        background-color: transparent;
        font-size: tovmin(28);
        padding: 0;
        text-align: left;
        color: black;

    }

    button image {
        margin-bottom: 0;
    }
</style>