<template>
    <div>
        <div class="content">
            <h3>红包领取规则</h3>
            <p class="text">该项活动暂时还未启动，具体的领取规则淘宝也并没有公布。借鉴以往的活动经验，可以猜想12月12日当天的整点，平台和店铺会限量派发红包优惠券，需要大家拼手气和网速争抢获取</p>
            <div class="img_div">
                <image class="image" :src="'/static/images/redPocket/bg2.png'" @click="getMoney"></image>
                <div>
                    <div class="btn default-btn" @click="showRedPocket">已完成任务，点击领取</div>
                    <div class="small-fog"></div>
                </div>
            </div>
            <div class="img_div">
                <image class="image" :src="'/static/images/redPocket/bg1.png'"></image>
                <div>
                    <div class="btn submit-btn">去完成任务</div>
                    <div class="small-fog"></div>
                </div>
            </div>
        </div>
        <div class="fog" v-if="showFog"></div>
        <image class="image1" :src="'/static/images/redPocket/redPocket.png'" v-if="showFog" />
        <image class="image2" :src="'/static/images/redPocket/close.png'" v-if="showFog" @click="hideFog" />
        <p class="success" v-if="showFog">恭喜完成任务</p>
        <p class="redPocketBtn" v-if="showFog" @click="toGetRedPocket">点击领取红包</p>
        <CardFooter :index="2"></CardFooter>
    </div>
</template>
<script>
    import CardFooter from "@/components/footer"
    export default {
        data() {
            return {
                showFog: false,

            }
        },
        onShow() {
            wx.hideTabBar();
        },
        components: {
            CardFooter
        },
        methods: {
            getMoney: function() {
                this.showFog = true;
            },
            hideFog: function() {
                this.showFog = false;
            },
            showRedPocket: function() {
                this.showFog = true;
            },
            toGetRedPocket: function() {
                wx.navigateTo({
                    url: "./redPocketList/main"
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .content {
        padding: tovmin(30);
        background: $grey-background;
        height: calc(100% - 60rpx);
        position: absolute;
    }

    .default-btn {
        background: white;
    }

    p {
        margin-top: 10px;
        color: $black;
    }

    .img_div {
        width: tovmin(690);
        height: tovmin(180);
        overflow: hidden;
        margin-bottom: tovmin(30);
        border-radius: tovmin(12);
        position: relative;
    }

    .image {
        width: tovmin(750);
        height: tovmin(608);
        position: absolute;
        top: -120%;
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
        top: 70%;
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
        top: 49.4%;
        left: 40.5%;
        z-index: 1000;
        font-size: tovmin(24);
    }
</style>