<script>
    export default {
        mounted() {
            const that = this;
            wx.getLocation({
                type: 'wgs84',
                success: function(data) {
                    const {
                        latitude,
                        longitude
                    } = data;
                    that.init(latitude, longitude);
                }
            })
        },
        data() {
            return {
                apiUrl: "http://yxcy.wanzhong.ink"
            }
        },
        methods: {
            init: function(lat, lng) {
                this.$http.get({
                    url: "/api/wxapp.common/init",
                    data: {
                        version: "1",
                        lng: lat,
                        lat: lng
                    },
                    success: function(res) {
                        wx.showToast({
                            title: "success",
                            icon: "success"
                        });
                        console.log(res);
                    }
                });
            }
        }

    }
</script>

<style lang="scss" scope>
    .icon {
        display: inline-block;
        background-size: 100%;
    }

    .checkBox {
        border: 1px solid #c6c6c6;
        display: inline-block;
        height: 12px;
        width: 12px;
        vertical-align: middle;
        margin-right: 5px;
    }

    .checkBox.active {
        border: 1px solid #ffc400;
    }

    .checkBox.active::after {
        content: "";
        display: inline-block;
        height: 6px;
        width: 6px;
        background: #ffc400;
        position: relative;
        top: -11px;
        left: 6px;
    }

    textarea {
        border: 1px solid #e4e7ed;
        background: #fcfcfc;
        border-radius: 4px;
        width: 100%;
        padding: 5px 8px;
        box-sizing: border-box;
        margin-bottom: 15px;
    }

    .yellow_btn {
        background-color: #ffc400;
        width: 181px;
        height: 44px;
        border-radius: 22px;
        border: 1px solid transparent;
        font-size: 16px;
    }

    .down {
        animation: slide-down 0.5s;
        animation-fill-mode: forwards;
    }

    .up {
        animation: slide-up 0.5s;
        animation-fill-mode: forwards;
    }

    @keyframes slide-down {
        from {
            transform: translateY(-1000px);
        }

        to {
            transform: translateY(0px);
            display: block;
        }
    }

    @keyframes slide-up {
        from {
            transform: translateY(0px);
        }

        to {
            transform: translateY(-1000px);
            display: none;
        }
    }
</style>