<template>
    <div class="container">
        <div class="header">
            <div>
                <p>余额</p>
                <p style="font-size:50px">{{money}}元</p>
                <p>满1000元可提现</p>
            </div>
        </div>
        <div class="content">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <span>{{item.name}}</span>
                    <span>{{item.money}}元</span>
                </li>
                <span class="btn submit-btn" @click="tixian">去提现</span>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [],
                money: 0
            };
        },
        onLoad() {
            Object.assign(this.$data, this.$options.data());
            this.$getStorage("userInfo").then(result => {
                this.token = result.token;
                this.getList();
            });
        },
        methods: {
            getList: function() {
                this.$http
                    .get({
                        url: "/api/wxapp.user/redEnvelopeRecord",
                        header: {
                            token: this.token
                        }
                    })
                    .then(result => {
                        this.list = result.data.list;
                        this.money = result.data.money;
                    });
            },
            tixian: function() {
                wx.navigateTo({
                    url: "/pages/my/hongbao/getCash/main"
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .container {
        height: 100%;
        background: white;
        position: absolute;
        width: 100%;
        font-size: tovmin(28);
    }

    .header {
        position: relative;
        z-index: 10;
        overflow: hidden;
        width: 100%;
        height: tovmin(296);
        color: #fce2b1;
        text-align: center;
        position: relative;
    }

    .header>div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .header>div p {
        margin: tovmin(4) 0;
    }

    .header::after {
        content: "";
        width: 140%;
        height: tovmin(296);
        position: absolute;
        left: -20%;
        top: 0;
        z-index: -1;
        border-radius: 0 0 60% 60%;
        background: $light-red;
    }

    .content {
        padding: tovmin(20) tovmin(30);
        height: calc(100% - 220px);
    }

    .content ul li {
        display: flex;
        justify-content: space-between;
        height: tovmin(100);
        line-height: tovmin(100);
        border-bottom: tovmin(2) solid $grey-background;
    }

    .content ul li:last-child {
        border-bottom: none;
    }

    .submit-btn {
        height: tovmin(88);
        width: tovmin(362);
        text-align: center;
        border-radius: tovmin(44);
        line-height: tovmin(88);
        font-size: tovmin(32);
        position: absolute;
        bottom: tovmin(118);
        left: tovmin(180);
        //   color: #ffc400;
    }
</style>