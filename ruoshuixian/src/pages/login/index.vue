<template>
    <div class="container">
        <image class="background" :src="'/static/images/firstPage/bg@'+ratio+'x.png'" v-if="ratio"></image>
        <div class="login-form">
            <div class="input_div">
                <input type="text" class="input" placeholder="请输入手机号" v-model="form.mobile" placeholder-style="color:#ccc" />
                <image :src="'/static/images/my/phone@'+ratio+'x.png'" v-if="ratio" class="icon" style="height:42rpx;width:34rpx">
                </image>
            </div>
            <template v-if="!codeLogin">
                <span class="getCode" @click="getCode" v-if="!clickGetCode">获取验证码</span>
                <span class="getCode" style="color:#c0c4cc" v-else>{{seconds}}s后重新获取</span>
            </template>
            <div class="input-div">
                <template v-if="codeLogin">
                    <input type="text" class="input" v-model="form.password" placeholder="密码" placeholder-style="color:#ccc" />
                    <image :src="'/static/images/my/password@'+ratio+'x.png'" v-if="ratio" class="icon" style="height:42rpx;width:34rpx"></image>
                </template>
                <template v-else>
                    <input type="text" class="input" placeholder="验证码" v-model="form.captcha" placeholder-style="color:#ccc" />
                    <image :src="'/static/images/my/keys@'+ratio+'x.png'" v-if="ratio" class="icon" style="height:54rpx;width:38rpx">
                    </image>
                </template>
            </div>
            <p style="text-align:center">
                <span class="btn submit-btn" @click="login">登 录</span>
            </p>
            <p class="info">
                <span @click="switchLoginWay">
                    <span v-if="!codeLogin">密码登陆</span><span v-else>验证码登陆</span>
                </span>
                <span>忘记密码</span></p>
        </div>
        <p id="info">还没有若水轩账号？<span style="color:#f8b551" @click="toRegist">立即注册</span></p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                clickGetCode: false,
                seconds: 60,
                codeLogin: false,
                ratio: 1,
                form: {
                    mobile: "",
                    captcha: "",
                    password: ""
                }
            }
        },
        mounted() {
            this.ratio = this.globalData.ratio;
        },
        methods: {
            // 跳转到注册页面
            toRegist: function() {
                let url = "../regist/main";
                wx.navigateTo({
                    url
                })
            },
            login: function() {
                const {
                    mobile,
                    captcha,
                    password
                } = this.form;
                if (!this.codeLogin) {
                    this.$http.get({
                        url: "/api/wxapp.sms/check",
                        data: {
                            mobile,
                            captcha
                        }
                    }).then();
                } else {
                    this.$http.get({
                        url: "/api/wxapp.user/login",
                        data: {
                            mobile,
                            password
                        }
                    }).then(result => {
                        if (result.code == 1) {
                            wx.setStorage({
                                key: 'userInfo',
                                data: result.data.userinfo
                            })
                            wx.showToast({
                                title: "登陆成功"
                            })
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }


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
                this.$http.get({
                    url: "/api/wxapp.sms/send",
                    data: {
                        mobile: this.form.mobile,
                        event: "登陆若水轩小程序"
                    },
                    success: function(data) {
                        if (data.captcha == 1) {
                            wx.showToast({
                                title: "验证码发送成功"
                            })
                        }
                    }
                });
            },
            switchLoginWay: function() {
                this.codeLogin = !this.codeLogin;
                clearInterval(this.timer);
                this.clickGetCode = false;
                this.seconds = 60;
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
        transform: translate(13%, 50%);
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

    .info {
        color: #C0C4CC;
        display: flex;
        justify-content: space-between;
        margin-top: tovmin(24);
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

    .input-div {
        position: relative;
    }
</style>