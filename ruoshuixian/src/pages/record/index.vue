<template>
    <div class="container">
        <div class="content" v-if="ratio">
            <div class="img_div">
                <image class="image" :src="'/static/images/redPocket/bg2@'+ratio+'x.png'"></image>
            </div>
            <p class="p">这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录
            </p>
            <div class="img_div">
                <image class="image" :src="'/static/images/redPocket/bg1@'+ratio+'x.png'"></image>
            </div>
            <p class="p">这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录这里是打卡记录
            </p>
        </div>
        <CardFooter :index="3"></CardFooter>
    </div>
</template>
<script>
    import CardFooter from "@/components/footer"
    export default {
        components: {
            CardFooter
        },
        data() {
            return {
                ratio: 1,
                result: []
            }
        },
        onShow() {
            wx.hideTabBar();
        },
        mounted() {
            this.ratio = this.globalData.ratio;
            this.getList();
        },
        methods: {
            getList: function() {
                this.$http.get({
                    url: "/api/wxapp.user/taskListForCarding"
                }).then(result => {
                    console.log(result);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        padding: tovmin(30);
        background: white;
        font-size: tovmin(26);
        position: absolute;
        height: 100%;
    }

    .p {
        color: #666666;
        margin-bottom: tovmin(30);
    }

    .img_div {
        width: tovmin(670);
        height: tovmin(318);
        overflow: hidden;
        margin-bottom: tovmin(30);
        border-radius: tovmin(10);
        position: relative;
    }

    .image {
        width: tovmin(690);
        height: tovmin(518);
        position: absolute;
        top: -52%;
        z-index: 1;
        margin: tovmin(30) 0;
    }
</style>