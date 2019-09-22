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
            Object.assign(this.$data, this.$options.data())
            let level = this.$getStorage("level");
            let result = this.$getStorage("result");
            let rule = this.$getStorage("rule");
            let userInfo = this.$getStorage("userInfo");
            Promise.all([level, result, rule, userInfo]).then(values => {
                this.level = values[0];
                this.result = values[1].right_and_wrong_results;
                this.rule = values[2].rules_of_the_game.filter(e => {
                    return e.game_level == (this.level || "primary")
                })[0];
                this.userid = values[3].id;
                this.numberList = this.result;
                this.total = this.rule.number;
                this.per = this.rule.number_per_group;
                let number = [];
                for (var i = 0; i < this.total; i += this.per) {
                    number.push(this.numberList.slice(i, i + this.per));
                };
                this.number = number;
            })
        },
        onShareAppMessage: function(res) {
            return {
                path: "pages/firstPage/main?id=" + this.userid,
                title: "马拉松数字，一起来玩吧！",
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
                showFog: false,
                text: "确定结束作答吗？",
                number: [],
                rule: {},
                userid: null
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