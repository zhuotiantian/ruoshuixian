<template>
    <div class="container">
        <div class="content">
            <div v-for="(item,index) in list" :key="index" @click="toDetails(item.students_homework_details_id)">
                <div class="img_div">
                    {{item.name}}
                    <image class="image" :src="'/static/images/firstPage/recordList.png'"></image>
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

                list: []
            }
        },
        onShow() {
            wx.hideTabBar();

        },
        onLoad() {
            Object.assign(this.$data, this.$options.data())
            this.$getStorage("userInfo").then(result => {
                this.token = result.token;
                this.getList();
            });
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
            },
            toDetails: function(id) {
                wx.navigateTo({
                    url: "./details/main?students_homework_details_id=" + id,

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
        width: 89.33333vmin;
        height: 26.66667vmin;
        overflow: hidden;
        margin-bottom: 4vmin;
        border-radius: 1.33333vmin;
        position: relative;
        text-align: center;
        line-height: 26.6667vmin;
        font-size: tovmin(36);
        color: white;
    }

    .image {
        width: tovmin(670);
        height: tovmin(162);
        z-index: -1;
        margin: tovmin(30) 0;
        position: absolute;
        left: 0;
    }
</style>