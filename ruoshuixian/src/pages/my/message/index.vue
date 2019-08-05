<template>
    <div class="container">
        <div class="item" v-for="(item,index) in list" :key="index">
            <p class="header">
                <span>{{item.type_text}}</span>
                <span>{{item.createtime}}</span>
            </p>
            <span class="text">
                {{item.content}}
            </span>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [],
            }
        },
        onShow() {
            this.token = wx.getStorageSync("userInfo").token;
        },
        mounted() {
            this.getList();

        },
        methods: {
            getList: function() {
                this.$http.get({
                    url: "/api/wxapp.user/myNews",
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    result.data.forEach(e => {
                        let init_time = new Date(e.createtime);
                        let formateTime = init_time.getFullYear() + "-" + init_time.getMonth() + 1 + "-" + (init_time.getDate() + 1 < 10 ? "0" : "") + init_time.getDate()
                        e.createtime = formateTime
                    });
                    this.list = result.data;

                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        padding: tovmin(30);
        background: white;
        position: absolute;
        height: calc(100% - 60rpx);
        width: calc(100% - 60rpx);
    }

    .text {
        color: #999999;
        font-size: tovmin(24);
    }

    .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: tovmin(30);
        font-size: tovmin(26);

    }

    .header>span {
        flex: 1;
    }

    .header>span:last-child {
        text-align: right;
    }

    .item {
        padding: tovmin(30);
        border: 1px solid $border;
        border-radius: tovmin(12);
        margin-bottom: tovmin(30);
    }
</style>