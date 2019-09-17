<template>
    <div class="wrapper">
        <div>
            <image src="/static/images/my/avator.png" width="60" height="60"></image>
            <p>获取您的公开信息（昵称、头像）等</p>
            <button class="btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权登陆</button>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            getPhoneNumber: function(e) {
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
                                that.$http.post({
                                    url: "/api/wxapp.user/login",
                                    data: params
                                }).then(result => {
                                    if (result.code == 1) {
                                        that.$setStorage("userInfo", result.data.userInfo).then(() => {
                                            wx.switchTab({
                                                url: "/pages/my_teacher/main"
                                            })
                                        });
                                    }
                                });
                            })
                        }
                    });
                }
            }
        }
    };
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
    p,
    button {
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
</style>