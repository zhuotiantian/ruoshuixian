<template>
    <div class="container">
        <CardTitle type="记忆完成" @finishMemary="finishMemary"></CardTitle>
        <div class="list">
            <p class="list-title">
                <span>序号</span>
                <span>时间</span>
                <span style="flex:3;">事件</span>
            </p>
            <p v-for="(item,index) in numberList" :key="index"><span>{{index+1}}</span><span class="year">{{item.date}}</span><span style="flex:3;">{{item.event}}</span></p>
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
            let rule = this.rule.rules_of_the_game.filter(e => {
                return e.game_level == this.level
            })[0];
            this.numberList = rule.list.date.map((e, index) => {
                return {
                    date: e,
                    event: rule.list.event[index]
                }
            });
        },
        data() {
            return {
                numberList: [],
                level: "primary"
            }
        },
        methods: {
            finishMemary: function() {
                wx.navigateTo({
                    url: "../answer/main"
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        background: $deep-blue;
        color: white;
    }

    .year {
        color: $grey-text;
    }

    .title {
        font-size: tovmin(30);
        display: flex;
        justify-content: space-between;
        margin: tovmin(40) tovmin(30) 0 tovmin(30);
    }

    .list {
        margin: tovmin(150) tovmin(30) auto tovmin(130);
    }

    .list p {
        display: flex;
        align-items: center;
        text-align: left;
        height: tovmin(80);
        line-height: tovmin(80);
        color: #D6D6D6;
    }

    .list p span {
        flex: 1;
    }

    .list-title {
        color: $yellow !important;
    }
</style>