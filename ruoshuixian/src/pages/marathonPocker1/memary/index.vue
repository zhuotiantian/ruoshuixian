<template>
    <div class="container">
        <CardTitle :showType="true" :pannelContent="pannelContent" @group="group" :type="type" @finishMemary="finishMemary">
        </CardTitle>
        <div class="list">
            <template v-if="perPocker.length==0">
                <image class="pocker-bg" v-for="(item,index) in bgCounts" :key="index" :style="{'left':item+'rpx'}" :src="'/static/images/firstPage/pockerbg.png'" />
            </template>
            <template v-else>
                <em class="arrow arrow-left" @click="prevGroup"></em>
                <scroll-view :style="{width:'463px',height:'196px','white-space':'nowrap'}" scroll-x>
                    <image class="pocker" ref="pocker" v-for="(item,index) in perPocker[currentGroupIndex]" :key="index" :src="'/static/images/pocker/'+(item.index)+'-'+item.color+'.png'" />
                </scroll-view>
                <em class="arrow arrow-right" @click="nextGroup"></em>
            </template>
        </div>
        <div class="pageFoot">
            <span class="pageBtn" @click="prevPage">上一页</span>
            <div class="btn-group">
                <span :class="{item:true, active:item.active}" @click="select(index,item)" v-for="(item,index) in groupPage[currentPage]" :key="index">{{item.number}}幅</span>
            </div>
            <span class="pageBtn" @click="nextPage">下一页</span>
            <span class="btn tips-btn" style="float-right" @click="showTips">操作提示</span>
        </div>
    </div>
</template>
<script>
    import CardTitle from "@/components/gameTitle"
    export default {
        components: {
            CardTitle
        },
        onLoad() {
            Object.assign(this.$data, this.$options.data())
            this.level = this.$getParams("level");
            this.rule = this.$getParams("rule");

            this.pocker = this.rule.rules_of_the_game.filter(e => {
                return e.game_level == this.level
            })[0].list;
            // 生成pock的副数
            for (var i = 1; i <= this.pocker.length; i++) {
                this.pages.push({
                    number: i,
                    active: false
                });
            };
            this.pages[0].active = true;
            let groupPage = [];
            for (var i = 0; i < this.pages.length; i += 10) {
                groupPage.push(this.pages.slice(i, i + 10));
            };
            this.groupPage = groupPage;
        },
        data() {
            return {
                pannelContent: ["ALL", "1", "2", "4", "8"],
                pockerCount: 0,
                bg: 23,
                left: 100,
                pocker: [],

                type: null,
                level: "primary",
                pages: [],
                perPocker: [],
                currentPage: 0,
                groupPage: [],
                currentGroupIndex: 0
            }
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
            group: function(data) {
                let currentIndex = this.groupPage[this.currentPage].filter(e => {
                    return e.active
                })[0].number;
                if (data !== "ALL") {
                    let list = JSON.parse(JSON.stringify(this.pocker[currentIndex]));
                    this.perPocker = [];
                    for (var i = 0; i < list.length; i + data) {
                        this.perPocker.push(list.splice(i, i + data));
                    }
                } else {
                    this.perPocker.push(this.pocker[currentIndex]);
                };
                this.groupData = data;
                this.type = "记忆完成";
                if (this.time_long) {
                    setTimeout(() => {
                        this.finishMemary();
                    }, this.time_long);
                }
            },
            finishMemary: function() {
                wx.navigateTo({
                    url: "../recall/main"
                })
            },
            nextPage: function() {
                if (this.currentPage < this.groupPage.length - 1) {
                    this.currentPage++;
                }
            },
            prevPage: function() {
                if (this.currentPage > 0) {
                    this.currentPage--;
                }
            },
            select: function(index, item) {
                this.$set(this.groupPage, this.currentPage, this.groupPage[this.currentPage].map(e => {
                    return {
                        number: e.number,
                        active: false
                    }
                }));
                this.$set(this.groupPage[this.currentPage], index, {
                    number: item.number,
                    active: true
                });
                this.group(this.groupData);
            },
            prevGroup: function() {
                if (this.currentGroupIndex > 0) {
                    this.currentGroupIndex--;
                }
            },
            nextGroup: function() {
                if (this.currentGroupIndex < this.pocker.length - 1) {
                    this.currentGroupIndex++;
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

    .tips-btn {
        color: $middle-blue;
        border: tovmin(2) solid $middle-blue;
    }
</style>