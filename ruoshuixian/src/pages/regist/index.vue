<template>
    <div class="container">
        <image class="background" :src="'/static/images/firstPage/bg@'+ratio+'x.png'" v-if="ratio" />
        <div class="login-form">
            <div class="input-div">
                <input type="text" class="input" v-model="form.mobile" placeholder="请输入手机号" @blur="checkPhone" placeholder-style="color:#ccc" />
                <image :src="'/static/images/my/phone@'+ratio+'x.png'" v-if="ratio" class="icon" style="height:42rpx;width:34rpx" />

                <template v-if="true">
                    <span class="getCode" @click="getCode" v-if="!clickGetCode">获取验证码</span>
                    <span class="getCode" style="color:#c0c4cc" v-else>{{seconds}}s后重新获取</span>
                </template>
            </div>
            <div class="input-div">
                <input type="text" class="input" v-model="form.captcha" placeholder="验证码" placeholder-style="color:#ccc" />
                <image :src="'/static/images/my/keys@'+ratio+'x.png'" v-if="ratio" class="icon" style="height:54rpx;width:38rpx" />
            </div>
            <div class="input-div">
                <input type="password" class="input" v-model="form.password" placeholder="密码" placeholder-style="color:#ccc" />
                <image :src="'/static/images/my/password@'+ratio+'x.png'" v-if="ratio" class="icon" style="height:42rpx;width:34rpx" />
            </div>
            <div class="input-div">
                <input type="password" class="input" v-model="form.repassword" placeholder="确认密码" placeholder-style="color:#ccc" />
                <image :src="'/static/images/my/password@'+ratio+'x.png'" v-if="ratio" class="icon" style="height:42rpx;width:34rpx" />
            </div>
            <p class="info">
                <span @click="switchLoginWay">
                    <span v-if="!codeLogin">验证码登陆</span>
                    <span v-else>验证码登陆</span>
                </span>
                <span>忘记密码</span>
            </p>
            <p style="text-align:center">
                <span class="btn submit-btn" @click="regist">注 册</span>
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                clickGetCode: false,
                seconds: 60,
                ratio: 1,
                form: {
                    mobile: "",
                    password: "",
                    captcha: "",
                    repassword: ""
                }
            };
        },
        mounted() {
            this.ratio = this.globalData.ratio;
        },
        methods: {
            regist: function() {
                const {
                    mobile,
                    captcha,
                    password,
                    repassword
                } = this.form;
                if (password !== repassword) {
                    wx.showToast({
                        title: "两次密码不一致",
                        icon: "none"
                    });
                    return false;
                }
                this.$http
                    .post({
                        url: "/api/wxapp.sms/check",
                        data: {
                            mobile,
                            captcha,
                            event: "注册若水轩小程序"
                        },
                    })
                    .then(result => {
                        if (result.code == 1) {
                            this.$http
                                .post({
                                    url: "/api/wxapp.user/register",
                                    data: {
                                        mobile,
                                        captcha,
                                        password
                                    }
                                })
                                .then(result => {
                                    if (result.code == 1) {
                                        wx.showToast({
                                            title: "注册成功"
                                        });
                                        wx.switchTab({
                                            url: "../login/main"
                                        });
                                    }

                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 跳转到注册页面
            toRegist: function() {
                let url = "../regist/main";
                wx.navigateTo({
                    url
                });
            },
            getCode: function() {
                // 获取验证码
                this.clickGetCode = true;
                this.timer = setInterval(() => {
                    this.seconds--;
                    if (this.seconds == 0) {
                        clearInterval(this.timer);
                        this.clickGetCode = false;
                        this.seconds = 60;
                    }
                }, 1000);
                this.getPostCode();
            },
            getPostCode: function() {
                this.$http
                    .post({
                        url: "/api/wxapp.sms/send",
                        data: {
                            mobile: this.form.mobile,
                            event: "注册若水轩小程序"
                        },
                        header: {
                            token: this.globalData.token
                        }
                    })
                    .then(result => {
                        if (result.code == 1) {
                            wx.showToast({
                                title: "验证码发送成功"
                            });
                        } else {
                            wx.showToast({
                                title: result.msg,
                                icon: "none"
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            switchLoginWay: function() {
                clearInterval(this.timer);
                this.clickGetCode = false;
                this.seconds = 60;
                let url = "../firstPage/main";
                wx.redirectTo({
                    url
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .container {
        height: 100%;
        width: 100%;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        font-size: tovmin(28);
        position: absolute;
    }

    .login-form {
        width: 80%;
        height: 50%;
        position: relative;
        transform: translate(13%, 40%);
    }

    .input-div {
        position: relative;
    }

    .input {
        background-color: white;
        border-radius: tovmin(12);
        height: tovmin(86);
        width: tovmin(530);
        margin-bottom: tovmin(28);
        padding-left: tovmin(70);
    }

    .btn {
        border-radius: tovmin(50);
        margin-top: tovmin(104);
        font-size: tovmin(40);
        height: tovmin(98);
        width: tovmin(530);
        line-height: tovmin(98);
    }

    #info {
        color: $grey-background;
        position: absolute;
        bottom: tovmin(74);
        text-align: center;
        width: 100%;
    }

    .getCode {
        font-size: tovmin(26);
        position: absolute;
        right: tovmin(10);
        top: tovmin(26);
        color: #ccc;
        z-index: 30;
    }

    .background {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -6;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .icon {
        position: absolute;
        top: tovmin(20);
        left: tovmin(20);
    }

    .info {
        color: #c0c4cc;
        display: flex;
        justify-content: space-between;
        margin-top: tovmin(24);
    }
</style>