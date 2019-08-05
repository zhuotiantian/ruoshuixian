<template>
    <div class="container">
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
                    <span>
                        <span>{{item.fraction}}</span>
                        <span>
                            <image class="image" v-if="ratio" :src="'/static/images/my/share@'+ratio+'x.png'"></image>
                        </span>
                        <span>分享</span>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                active: "打卡记录",
                ratio: 1,
                list: [],
                scores: []
            }
        },
        onShow() {
            this.token = wx.getStorageSync("userInfo").token;
        },
        mounted() {
            this.ratio = this.globalData.ratio;
            this.getList();
            this.getScoreList();
        },
        methods: {
            getList: function() {
                this.$http.get({
                    url: "/api/wxapp.student/punchInRecord",
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    if (result.code == 1) {
                        this.list = result.data;
                    } else {
                        wx.showToast({
                            title: result.msg,
                            icon: none
                        });
                    }
                })
            },
            getScoreList: function() {
                this.$http.get({
                    url: "/api/wxapp.game/achievement",
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    if (result.code == 1) {
                        this.scores = result.data;
                    } else {
                        wx.showToast({
                            title: result.msg,
                            icon: none
                        });
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        height: 100%;
        position: absolute;
        width: 100%;
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
</style>