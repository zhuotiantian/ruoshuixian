<template>
    <div class="container">
        <CardTitle :isResult="true"></CardTitle>
        <div class="list">
            <div class="row" v-for="(rows,_index) in number" :key="_index">
                <span :class="{item:true, wrong:item.result==1}" v-for="(item,index) in rows" :key="index">{{item.number}}</span>
                <span>row&nbsp;&nbsp;{{_index+1}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import CardTitle from "@/components/gameTitle"
    import Keybord from "@/components/Keybord"
    import alertBox from "@/components/alertBox"
    export default {
        components: {
            CardTitle,
            Keybord,
            alertBox
        },
        onLoad(option) {
            this.level = this.$getParams("level");
            this.rule = this.$getParams("rule");
            this.result = this.$getParams("result");
        },
        mounted() {
            let rule = this.rule.rules_of_the_game.filter(e => {
                return e.game_level == this.level
            })[0];
            this.numberList = this.result.right_and_wrong_results;
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
                showFog: false,
                text: "确定结束作答吗？",
                number: [],
                rule: {}
            }
        },
        methods: {
            finish: function() {
                this.showFog = true;
            },
            hideFog: function() {
                this.showFog = false;
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
    }

    .item {
        flex: 1;
        border: tovmin(2) solid $middle-blue;
        border-right: none;
        height: tovmin(40);
        width: tovmin(28);
        text-align: center;
    }

    .item:nth-last-child(2) {
        border-right: tovmin(2) solid $middle-blue;
        margin-right: tovmin(20);
    }

    .wrong {
        color: $grey-text;
        background: $red;
    }
</style>