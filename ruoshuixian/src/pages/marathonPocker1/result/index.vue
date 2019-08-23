<template>
    <div class="container">
        <CardTitle isResult="true" isPocker="true" showTime="false"></CardTitle>
        <div class="list">
            <image class="pocker" ref="pocker" v-for="(item,index) in pocker" :key="index" :style="{'left':item+'rpx'}" :src="'/static/images/firstPage/pockerbg.png'" />
        </div>
        <div class="pageFoot">
            <span class="pageBtn" @click="prevPage">上一页</span>
            <div class="btn-group">
                <span class="item active" v-for="(item,index) in pages" :key="index">{{item}}幅</span>
            </div>
            <span class="pageBtn" @click="nextPage">下一页</span>
        </div>
    </div>
</template>
<script>
    import CardTitle from "@/components/gameTitle";
    export default {
        components: {
            CardTitle
        },
        onShareAppMessage: function(res) {
            return {
                title: "马拉松扑克牌，一起来玩吧！",
                success: function() {
                    console.log("分享成功");
                },
                error: function() {
                    console.log("分享失败");
                }
            }
        },
        data() {
            return {
                pannelContent: ["ALL", "1", "2", "4", "8"],
                pockerCount: 23,

                left: 100,
                pages: (() => {
                    let pages = [];
                    for (let i = 1; i <= 10; i++) {
                        pages.push(i);
                    };
                    return pages
                })()
            };
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
        methods: {
            group: function(data) {
                this.pockerCount = data == "ALL" ? (this.pockerCount = 23) : data;
            },
            nextPage: function() {
                if (this.currentPage > 3) {
                    return false
                } else {
                    this.currentPage++;
                    this.pages = this.pages.map((e) => {
                        return e + 10
                    });
                }
            },
            prevPage: function() {
                if (this.currentPage > 1) {
                    this.currentPage--
                    this.pages = this.pages.map((e) => {
                        return e - 10
                    });
                }
            }
        }
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

    .pageFoot {
        position: fixed;
        width: 100%;
        height: tovmin(120);
        background: white;
        z-index: 999;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        padding: 0 tovmin(60);
        box-sizing: border-box;
        font-size: tovmin(28);
        align-items: center;
    }

    .pageBtn {
        color: $yellow;
    }

    .item {
        height: tovmin(80);
        width: tovmin(80);
        display: inline-block;
        border-radius: tovmin(8);
        line-height: tovmin(80);
        text-align: center;
        margin-right: tovmin(24);
        border: tovmin(2) solid #E5E5E5;
        color: $black;
    }

    .item.active {
        color: white;
        background: $middle-blue;
        border: none;
    }
</style>