<template>
    <div class="container">
        <CardTitle :showType="true" :pannelContent="pannelContent" @group="group" :type="type" @finishMemary="finishMemary">
        </CardTitle>
        <div class="list" v-if="ratio">
            <template v-if="pocker.length==0">
                <image class="pocker-bg" v-for="(item,index) in bgCounts" :key="index" :style="{'left':item+'rpx'}" :src="'/static/images/firstPage/pockerbg@'+ratio+'x.png'" />
            </template>
            <template v-else>
                <em class="arrow arrow-left"></em>
                <scroll-view :style="{width:'510px',height:'196px','white-space':'nowrap'}" scroll-x>
                    <image class="pocker" ref="pocker" v-for="(item,index) in pocker" :key="index" :src="'/static/images/pocker/'+(index+1)+'-1@'+ratio+'x.png'" />
                </scroll-view>
                <em class="arrow arrow-right"></em>
            </template>
        </div>
        <div class="pageFoot">
            <span class="pageBtn" @click="prevPage">上一页</span>
            <div class="btn-group">
                <span :class="{item:true,active:item.active}" @click="selectCounts(index)" v-for="(item,index) in pages" :key="index">{{item.index}}幅</span>
            </div>
            <span class="pageBtn" @click="nextPage">下一页</span>
        </div>
    </div>
</template>
<script>
    import CardTitle from "@/components/gameTitle"
    export default {
        components: {
            CardTitle
        },
        onLoad: function(option) {
            this.level = option.level;
        },
        data() {
            let pages = [];
            for (let i = 1; i <= 10; i++) {
                pages.push({
                    index: i,
                    active: false
                });
            };
            return {
                pannelContent: ["ALL", "1", "2", "4", "8"],
                pockerCount: 0,
                bg: 23,
                left: 100,
                pocker: [],
                ratio: 1,
                type: null,
                currentPage: 1,
                level: "",
                pages: pages,
            }
        },
        mounted() {
            this.ratio = this.globalData.ratio;
        },
        computed: {
            bgCounts: function() {
                let bgCounts = [];
                let left0 = this.pockerCount == 23 ? 100 : (350 - 10 * this.bg);
                for (let i = 0; i < this.bg; i++) {
                    let left = left0 + 20 * i;
                    bgCounts.push(left)
                };
                return bgCounts;
            }
        },
        methods: {
            selectCounts: function(index) {
                this.pages.forEach(e => {
                    e.active = false;
                })
                this.$set(this.pages, index, {
                    index: index + 1,
                    active: true
                });
            },
            group: function(data) {
                if (data !== "ALL") {
                    this.pocker = this.pocker.splice(0, data);
                }
                this.type = "记忆完成";
                this.minutes = 60;
                this.seconds = 0;
            },
            finishMemary: function() {
                wx.navigateTo({
                    url: "../recall/main"
                })
            },
            nextPage: function() {
                if (this.currentPage > 3) {
                    return false
                } else {
                    this.currentPage++;
                    this.pages = this.pages.map((e) => {
                        return {
                            index: e + 10,
                            active: false
                        }
                    });
                }
            },
            prevPage: function() {
                if (this.currentPage > 1) {
                    this.currentPage--
                    this.pages = this.pages.map((e) => {
                        return {
                            index: e - 10,
                            active: false
                        }
                    });
                }
            }
        }
    }
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