<template>
    <div class="wrapper">
        <div>
            <image src="/static/images/my/avator.png" width="60" height="60"></image>
            <p>获取您的公开信息（昵称、头像）等</p>
            <button class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">授权登陆</button>
        </div>
        <template v-if="showFog">
            <div class="fog"></div>
            <div class="alertBox">
                <p>注册成功！</p>
                <p>
                    <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">确认</button>
                </p>
            </div>
        </template>
    </div>
</template>
<script>
    import alertBox from "@/components/alertBox"
    export default {
        components: {
            alertBox
        },
        onLoad(options) {
            this.inviter_id = options.inviterid
        },
        data() {
            return {
                inviter_id: null,
                showFog: false
            }
        },
        methods: {
            getUserInfo: function(e) {
                if (e.mp.detail.iv) {
                    let that = this;
                    wx.login({
                        success: function(res) {
                            that.$setStorage("code", res.code).then(() => {
                                let params = {
                                    rawData: JSON.stringify(e.mp.detail),
                                    code: res.code,
                                    type: "teacher",
                                };
                                if (that.inviter_id && that.inviter_id !== "null") {
                                    params.inviter_id = that.inviter_id;
                                }
                                that.$http.post({
                                    url: "/api/wxapp.user/login",
                                    data: params
                                }).then(result => {
                                    if (result.code == 1) {
                                        that.showFog = true;

                                        that.token = result.data.userInfo.token;
                                    }
                                });
                            })
                        }
                    });
                }
            },
            getPhoneNumber: function(e) {
                let that = this;
                wx.login({
                    success: function(res) {
                        that.$setStorage("code", res.code).then(() => {
                            that.$http.post({
                                url: "/api/wxapp.user/bindingMobilePhoneNumber",
                                data: {
                                    code: res.code,
                                    type: "teacher",
                                    rawData: JSON.stringify(e.mp.detail)
                                },
                                header: {
                                    token: that.token
                                }
                            }).then(result => {
                                if (result.code == 1) {
                                    that.$setStorage("userInfo", result.data.userInfo).then(result => {
                                        wx.showToast({
                                            title: "绑定成功！",
                                            icon: "none"
                                        });
                                        wx.reLaunch({
                                            url: "/pages/my_teacher/main"
                                        })
                                    });
                                }
                            })
                        })
                    }
                });
            },
            hideFog: function() {
                this.showFog = false;
            },
            confirm: function() {

            }
        }
    }
</script>
<style scoped lang="scss">
    .wrapper {
        width: 100%;
        height: 100%;
        background: #eaeaea !important;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    image {
        width: tovmin(120);
        height: tovmin(120);
        border-radius: 50%;
    }

    .wrapper>div {
        text-align: center;
    }

    image,
    p {
        margin-bottom: tovmin(30);
    }

    .btn {
        width: tovmin(300);
        height: tovmin(70);
        line-height: tovmin(70);
        border-radius: tovmin(8);
        background: $deep-blue;
        color: white;
    }

    .alertBox {
        background: white;
        border-radius: tovmin(14);
        height: tovmin(298);
        width: tovmin(542);
        margin: 0 auto;
        position: fixed;
        z-index: 1002;
        color: $black;
    }

    .alertBox p:first-child {
        height: tovmin(220);
        line-height: tovmin(220);
        border-bottom: tovmin(2) solid $border;
    }

    .alertBox p {
        text-align: center;
        margin-bottom: 0;
    }

    .alertBox p:last-child {
        display: flex;
        height: calc(100% - 220rpx);
        align-items: center;
        background-color: $deep-blue;
        margin-bottom: tovmin(0);
        border-bottom-left-radius: tovmin(16);
        border-bottom-right-radius: tovmin(16);
    }

    .alertBox p:last-child span {
        flex: 1;
        height: 100%;
        line-height: tovmin(70);

    }

    .alertBox p:last-child span:first-child {
        border-right: tovmin(2) solid $border;
    }

    .alertBox button {
        height: tovmin(60);
        line-height: tovmin(60);
        background: transparent;
        border: none;
        color: white;
        width: 100%;
    }

    .alertBox button::after {
        border-radius: none;
        border: none;
    }

    .red {

        color: $red;
    }
</style>