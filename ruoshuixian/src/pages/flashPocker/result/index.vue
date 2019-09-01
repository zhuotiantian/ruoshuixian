<template>
    <div class="container">
        <CardTitle isResult="true" isPocker="true" showTime="false"></CardTitle>
        <div class="list">
            <image class="pocker" ref="pocker" v-for="(item,index) in pocker" :key="index" :style="{'left':item+'rpx'}" :src="'/static/images/firstPage/pockerbg.png'" />
        </div>
    </div>
</template>
<script>
    import CardTitle from "@/components/gameTitle";
    export default {
        components: {
            CardTitle
        },
        data() {
            return {
                pockerCount: 23,

                left: 100,
                game: [],
                result: [],
            };
        },
        onLoad() {
            Object.assign(this.$data, this.$options.data());
            this.$getStorage("result").then(result => {
                this.result = result;
            })
        },
        onShareAppMessage: function(res) {
            return {
                title: "闪现扑克牌，一起来玩吧！",
                success: function() {
                    console.log("分享成功");
                },
                error: function() {
                    console.log("分享失败");
                }
            }
        },
        computed: {
            pocker: function() {
                let pocker = [];
                let left0 = this.pockerCount == 23 ? 100 : 350 - 10 * this.pockerCount;
                for (let i = 0; i < this.pockerCount; i++) {
                    let left = left0 + 20 * i;
                    pocker.push(left);
                }
                return pocker;
            }
        },
    };
</script>
<style lang="scss" scoped>
    .list {
        text-align: center;
        margin: 0 auto;
        position: relative;
        height: auto;
        height: tovmin(30);
        display: flex;
        justify-content: space-between;
    }

    .container {
        padding-top: tovmin(200);
    }

    .pocker {
        height: tovmin(382);
        width: tovmin(248);
        position: absolute;
    }

    .arrow {
        left: tovmin(-20);
    }

    .arrow::after {
        position: relative;
        top: tovmin(150);
        height: tovmin(30);
        width: tovmin(30);
        margin: 0 tovmin(60);
    }
</style>