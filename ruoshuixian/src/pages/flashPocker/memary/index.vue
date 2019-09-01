<template>
    <div class="container">
        <CardTitle :showType="true" :pannelContent="pannelContent" @group="group" :type="type" @finishMemary="finishMemary">
        </CardTitle>
        <div class="list">
            <template v-if="pocker.length==0">
                <image class="pocker-bg" v-for="(item,index) in bgCounts" :key="index" :style="{'left':item+'rpx'}" :src="'/static/images/firstPage/pockerbg.png'" />
            </template>
            <template v-else>
                <em class="arrow arrow-left" @click="prevGroup"></em>
                <scroll-view :style="{width:'463px',height:'196px','white-space':'nowrap'}" scroll-x>
                    <image class="pocker" ref="pocker" v-for="(item,index) in pocker[currentGroupIndex]" :key="index" :src="'/static/images/pocker/'+(item.index)+'-'+item.color+'.png'" />
                </scroll-view>
                <em class="arrow arrow-right" @click="nextGroup"></em>
            </template>
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
            let level = this.$getStorage("level");
            let rule = this.$getStorage("rule");
            Promise.all([level, rule]).then(values => {
                this.level = values[0];
                this.rule = values[1].rules_of_the_game.filter(e => {
                    return e.game_level == (this.level || "primary")
                })[0];
                this.list = this.rule.list;
            })
        },
        data() {
            return {
                pannelContent: ["ALL", "1", "2", "4", "8"],
                pockerCount: 0,
                bg: 23,
                left: 100,
                pocker: [],

                rule: {},
                type: null,
                level: "primary",
                list: [],
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
            },
        },
        methods: {
            group: function(data) {
                let list = JSON.parse(JSON.stringify(this.list));
                this.pocker = [];
                if (data !== "ALL") {
                    for (var i = 0; i < list.length; i + data) {
                        this.pocker.push(list.splice(i, i + data));
                    }
                } else {
                    this.pocker.push(list);
                }
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
</style>