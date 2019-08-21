<template>
    <div class="container" v-if="ratio">
        <div class="header">
            <span style="flex:1">
                <image class="image" :src="'/static/images/ranking/people@'+ratio+'x.png'"></image>
            </span>
            <span style="flex:6">我</span>
            <span style="flex:1">04</span>
        </div>
        <div class="content">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <span style="flex:1">
                        <image class="image" :src="domain+item.avatar"></image>
                    </span>
                    <span style="flex:6">小明</span>
                    <span style="flex:1">
                        <image class="icon" :src="'/static/images/ranking/ranking1@'+ratio+'x.png'"></image>
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
                ratio: 1,
                token: "",
                list: [],
                domain: this.$http.domain
            }
        },
        onLoad() {
            this.token = wx.getStorageSync("userInfo").token
        },
        mounted() {
            this.ratio = this.globalData.ratio;
            this.getList();
        },
        methods: {
            getList: function() {
                this.$http.get({
                    url: "/api/wxapp.game/rankingList",
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    this.list = result.data
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        color: white;
        height: 100%;
        position: absolute;
        height: 100%;
        width: 100%;
    }

    .header {
        height: tovmin(130);
        line-height: tovmin(130);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 tovmin(72);
    }

    .content {
        background: $grey-background;
        padding: tovmin(30);
        height: calc(100% - 192rpx);
    }

    .content ul {
        background: white;
        color: $black;
        box-sizing: content-box;
        height: 100%;
    }

    .content ul li {
        display: flex;
        padding: tovmin(20) tovmin(30);
        align-items: center;
    }

    .content ul li:nth-child(2n) {
        background: $light-blue;
    }

    .image {
        height: tovmin(60);
        width: tovmin(60);
        border-radius: tovmin(60);
        vertical-align: middle;
    }

    .icon {
        width: tovmin(38);
        height: tovmin(49);
    }
</style>