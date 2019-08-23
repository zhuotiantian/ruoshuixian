<template>
    <div class="container">
        <CardTitle type="记忆完成" @finishMemary="finishMemary"></CardTitle>
        <div class="list">
            <div class="row" v-for="(rows,_index) in number" :key="_index">
                <span class="item" v-for="(item,index) in rows" :key="index">{{item}}</span>
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
        onLoad(option) {
            this.level = this.$getParams("level");
            this.rule = this.$getParams("rule");
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
                seconds: 0,
                minutes: 15,
                number: [],
                numberList: [],
                total: 0,
                per: 0,
                level: "primary",
                rule: {}
            }
        },
        methods: {
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
    }

    .row {
        display: flex;
        width: 80%;
        margin: 0 auto;
        margin-bottom: tovmin(30);
        color: $grey-text;
    }

    .item {
        flex: 1;
        border-right: none;
        height: tovmin(40);
        width: tovmin(28);
        text-align: center;
    }

    .item:nth-last-child(2) {
        margin-right: tovmin(20);
    }
</style>