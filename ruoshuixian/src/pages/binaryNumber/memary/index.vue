<template>
    <div class="container">
        <CardTitle :showType="false" type="记忆完成" @finishMemary="finishMemary" @group="group" :pannelContent="pannelContent"></CardTitle>
        <div class="list">
            <div class="row" v-for="(rows,_index) in number" :key="_index">
                <div v-for="(item,index) in rows" :key="index" :class="{item:true,border:counts&&((index+1)%counts==0)&&(index+1)!=number.length}">
                    <span>{{item}}</span>
                </div>
                <span style="width:50rpx">row&nbsp;&nbsp;{{_index+1}}</span>
            </div>
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
            this.level = this.$getParams("level");
            this.rule = this.$getParams("rule");
        },
        mounted() {
            let rule = this.rule.rules_of_the_game.filter(e => {
                return e.game_level == this.level
            })[0];
            this.numberList = rule.list;
            this.total = rule.number;
            this.per = rule.number_per_group;
            let number = [];
            for (var i = 0; i < this.total; i += this.per) {
                number.push(this.numberList.slice(i, i + this.per));
            };
            this.number = number;
        },
        data() {
            return {
                number: [],
                counts: 0,
                numberList: [],
                pannelContent: ["不划线", "三个一组", "六个一组"],
                total: 0,
                per: 0,
                level: "primary",
                rule: {}
            }
        },
        methods: {
            group: function(data) {
                if (data == '三个一组') {
                    this.counts = 3;
                } else if (data == '六个一组') {
                    this.counts = 6;
                } else {
                    this.counts = 0;
                }
            },
            finishMemary: function() {
                wx.navigateTo({
                    url: "../answer/main"
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    page {
        height: calc(100% - 150rpx) !important;
    }

    .container {
        background: $deep-blue;
        color: white;
        height: calc(100% - 150rpx);
    }

    .list {
        margin-top: tovmin(200);
        margin-bottom: tovmin(30);
    }

    .row {
        display: flex;
        width: 80%;
        margin: 0 auto;
        height: tovmin(60);
        line-height: tovmin(60);
        color: $grey-text;
    }

    .item {
        flex: 1;
        border-right: none;
        height: tovmin(60);
        line-height: tovmin(60);
        width: tovmin(28);
        text-align: center;
        box-sizing: border-box;
    }

    .item.border {
        border-right: tovmin(2) solid white;
    }

    .item:nth-last-child(2) {
        margin-right: tovmin(20);
    }

    .pannel {
        height: tovmin(510) !important;
        background: red;
    }
</style>