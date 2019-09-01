<template>
    <div class="container">
        <div class="content">
            <div v-for="(item,index) in list" class="item" :key="index" @click="toGame(item)">
                <div class="img_div">
                    <image class="image" :src="domain+item.img" />
                </div>
                <p style="text-align:center;" class="btnGroup">
                    <span v-if="item.status=='not_finished'" class="yellow_btn">待完成</span>
                    <span v-else class="btn default_btn">已完成</span>
                </p>
            </div>
        </div>
        <CardFooter :index="3"></CardFooter>
    </div>
</template>
<script>
    import CardFooter from "@/components/footer";
    export default {
        components: {
            CardFooter
        },
        data() {
            return {

                list: [],
                domain: this.$http.domain,
                students_homework_details_id: null,
            };
        },
        onLoad(option) {
            this.students_homework_details_id = option.students_homework_details_id;
            this.$getStorage("userInfo").then(result => {
                this.token = result.token;
                this.getList();
            });
        },
        onShow() {
            wx.hideTabBar();
        },
        methods: {
            getList: function() {
                this.$http
                    .get({
                        url: "/api/wxapp.student/myCardTask",
                        data: {
                            students_homework_details_id: this.students_homework_details_id
                        },
                        header: {
                            token: this.token
                        }
                    })
                    .then(result => {
                        this.list = result.data;
                    });
            },
            toGame: function(item) {
                this.$toGame(item.game_id, item.wxapp_url);
            }
        }
    };
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
        width: tovmin(680);
        height: tovmin(318);
        overflow: hidden;
        margin-bottom: tovmin(30);
        border-radius: tovmin(10);
        position: relative;
    }

    .image {
        width: 92vmin;
        height: 33.06667vmin;
        position: absolute;
        z-index: 1;
    }

    .yellow_btn {
        padding: tovmin(6) tovmin(10);
    }

    .item {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        border-radius: tovmin(10);
        margin-bottom: tovmin(30);
    }

    .btnGroup {
        text-align: center;
        position: relative;
        margin-top: -7vmin;
        top: -3vmin;

    }

    .default_btn {
        background: #E0E0E0;
    }
</style>