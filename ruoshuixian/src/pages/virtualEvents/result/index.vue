<template>
    <div class="container">
        <CardTitle :seconds="seconds" :minutes="minutes" :isResult="isResult"></CardTitle>
        <div class="list">
            <p class="list-title">
                <span>序号</span>
                <span>时间</span>
                <span>&nbsp;</span>
                <span style="flex:3;">事件</span>
            </p>
            <p v-for="(item,index) in numberList" :key="index">
                <span>{{index+1}}</span>
                <span :class="{input:true, wrong:!item.isRight}">{{item.anwser}}</span>
                <span class="year">{{item.date}}</span>
                <span style="flex:3;">{{item.event}}</span>
            </p>
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
            this._result = this.$getParams("result");
            this.rule = this.$getParams("rule");
        },
        mounted() {
            let rule = this.rule.rules_of_the_game.filter(e => {
                return e.game_level == this.level
            })[0];
            this.result = this._result.right_and_wrong_results;
            this.numberList = rule.list.date.map((e, index) => {
                return {
                    date: e,
                    event: rule.list.event[index],
                    anwser: this.result[index].number,
                    isRight: this.result[index].result == 1,
                }
            });
        },
        data() {
            return {
                isResult: true,
                rule: {},
                numberList: [],
            }
        }
    }
</script>
<style lang="scss" scoped>
    .list {
        margin: tovmin(150) tovmin(30) auto tovmin(130);
        color: white;
    }

    .list p {
        display: flex;
        align-items: center;
        text-align: center;
        height: tovmin(86);
    }

    .list p span {
        flex: 1;
        line-height: tovmin(60);
    }

    .list-title {
        color: $yellow;
    }

    .input {
        width: tovmin(164);
        height: tovmin(66);
        border: tovmin(2) solid $blue-border;
        border-radius: tovmin(8);
        margin: 0 auto;
    }

    .wrong {
        background: $red;
        border-radius: tovmin(8);
        border: none;
    }

    .answer {
        color: $green;
    }
</style>