<template>
    <div class="container">
        <CardTitle :showType="true" :minutes="minutes" :seconds="seconds" :pannelContent="pannelContent" @group="group" :type="type" @finishMemary="finishMemary"></CardTitle>
        <div class="list" v-if="ratio">
            <template v-if="pocker.length==0">
                <image class="pocker-bg" v-for="(item,index) in bgCounts" :key="index" :style="{'left':item+'rpx'}" :src="'/static/images/firstPage/pockerbg@'+ratio+'x.png'" />
            </template>
            <template v-else>
                <em class="arrow arrow-left"></em>
                <scroll-view :style="{width:'510px',height:'196px','white-space':'nowrap'}" scroll-x>
                    <image class="pocker" ref="pocker" v-for="(item,index) in pocker" :key="index" :src="'/static/images/pocker/'+(item.index)+'-'+item.color+'@'+ratio+'x.png'" />
                </scroll-view>
                <em class="arrow arrow-right"></em>
            </template>
        </div>
    </div>
</template>
<script>
    import CardTitle from "@/components/gameTitle";
    export default {
        components: {
            CardTitle
        },
        onLoad: function(option) {
            this.level = option.level;
        },
        data() {
            return {
                pannelContent: ["ALL", "1", "2", "4", "8"],
                pockerCount: 0,
                bg: 23,
                left: 100,
                pocker: [],
                ratio: 1,
                type: null,
                level: null,
                minutes: null,
                seconds: null
            };
        },
        mounted() {
            this.ratio = this.globalData.ratio;
        },
        computed: {
            bgCounts: function() {
                let bgCounts = [];
                let left0 = this.pockerCount == 23 ? 100 : 350 - 10 * this.bg;
                for (let i = 0; i < this.bg; i++) {
                    let left = left0 + 20 * i;
                    bgCounts.push(left);
                }
                return bgCounts;
            }
        },
        methods: {
            group: function(data) {
                this.pocker = [];
                let index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
                let color = [1, 2, 3, 4];
                if (data == "ALL") {
                    for (let i = 0; i < index.length; i++) {
                        for (let j = 0; j < color.length; j++) {
                            this.pocker.push({
                                index: i + 1,
                                color: j + 1
                            });
                        }
                    };
                    this.pocker.sort(function(a, b) {
                        return Math.random() > .5 ? -1 : 1;
                    });
                } else {
                    for (let i = 0; i < data; i++) {
                        let itemIndex = index[Math.ceil(Math.random() * 13)];
                        let itemColor = color[Math.ceil(Math.random() * 4)];
                        if (
                            this.pocker.filter(e => {
                                return e.index == itemIndex && e.color == itemColor;
                            }).length == 0
                        ) {
                            this.pocker.push({
                                index: itemIndex,
                                color: itemColor
                            });
                        }
                    }
                }
                this.type = "记忆完成";
                if (this.time_long) {
                    setTimeout(() => {
                        this.finishMemary();
                    }, this.time_long);
                }
            },
            finishMemary: function() {
                wx.setStorageSync("game", this.pocker);
                wx.navigateTo({
                    url: "../recall/main"
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .list {
        text-align: center;
        margin: 0 auto;
        position: relative;
        height: tovmin(382);
        display: flex;
        justify-content: space-between;
    }

    .container {
        padding-top: tovmin(200);
    }

    .pocker {
        height: tovmin(382);
        width: tovmin(248);
        margin-right: tovmin(30);
    }

    .pocker-bg {
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