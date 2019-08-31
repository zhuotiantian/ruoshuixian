<template>
    <div class="container">
        <div class="btn-group">
            <button class="btn primary" open-type="getUserInfo" @getuserinfo="weChetLogin">微信授权登陆</button>
            <button class="btn default" @click="toLogin">账号登陆</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            weChetLogin: function() {
                wx.getUserInfo({
                    data: {
                        withCredentials: false
                    },
                    success: (res) => {
                        console.log(res);
                    }
                });
            },
            getLocation: function(fn) {
                const self = this;

            },
            getUserInfo: function() {
                const self = this;

            },
            toLogin: function() {
                let url = "../login/main";
                wx.navigateTo({
                    url
                })
            }
        }
    }
</script>

<style scoped>
    .container {
        color: #303133;
        font-size: 14px;
        display: flex;
        justify-content: center;
    }

    .btn-group {
        display: flex;
        justify-content: space-between;
        width: 80%;
        position: absolute;
        bottom: 30px;
    }

    .primary {
        background-color: #169bd5;
        color: white;
        font-size: 14px;
    }

    .default {
        padding: 0 15px;
        box-sizing: border-box;
        margin-left: 20px;
        font-size: 14px;
    }

    .btn {
        flex: 1;
    }
</style>