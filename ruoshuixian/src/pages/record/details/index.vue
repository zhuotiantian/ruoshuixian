<template>
    <div class="container">
        <div class="content" v-if="ratio">
            <div v-for="(item,index) in list" :key="index" @click="toDetails">
                <div class="img_div">
                    <image class="image" :src="'/static/images/redPocket/bg2@'+ratio+'x.png'"></image>
                </div>
                <p class="p">{{item.remarks}}</p>
            </div>
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
                list: []
            }
        },
        onShow() {
            wx.hideTabBar();
            this.token = wx.getStorageSync("userInfo").token;
        },
        mounted() {
            this.ratio = this.globalData.ratio;
            this.getList();
        },
        methods: {
            getList: function() {
                this.$http.get({
                    url: "/api/wxapp.user/taskListForCarding",
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    this.list = result.data;
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
        height: calc(100% - 100rpx);
        width: calc(100% - 60rpx);
        overflow-y: auto;
        z-index: -1;
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