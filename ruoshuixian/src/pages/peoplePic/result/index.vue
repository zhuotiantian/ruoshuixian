<template>
    <div class="container">
        <CardTitle :isResult="true"></CardTitle>
        <div class="list">
            <div class="row" v-for="(rows,_index) in number" :key="_index">
                <div class="image_div" v-for="(item,index) in rows" :key="index">
                    <image class="image" :src="domain+item.avatar" />
                    <span class="result name">{{item.name}}</span>
                    <span :class="{answer:item.result==0, name:true}">{{item.result_name}}</span>
                </div>
                <span>row&nbsp;&nbsp;{{_index+1}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import CardTitle from "@/components/gameTitle";
    export default {
        components: {
            CardTitle
        },
        onLoad(option) {
            this.level = this.$getParams("level");
            this.rule = this.$getParams("rule");
            let result = this.$getParams("result");
            let rule = this.rule.rules_of_the_game.filter(e => {
                return e.game_level == this.level
            })[0];
            this.numberList = rule.list.xing_name.map((e, index) => {
                return {
                    name: e + rule.list.ming_name[index],
                    result_name: result.right_and_wrong_results[index].result_name,
                    avatar: rule.list.avatar[index]
                }
            });
            this.total = rule.number;
            this.per = rule.number_per_group;
            let number = [];
            for (var i = 0; i < this.total; i += this.per) {
                number.push(this.numberList.slice(i, i + this.per));
            };
            this.number = number.filter(e => {
                return e.length > 0
            });
        },
        data() {
            return {
                number: [],
                domain: this.$http.domain
            };
        },
    };
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
        margin-left: tovmin(180);
        margin-top: tovmin(230);
    }

    .row {
        display: flex;
        width: 80%;
        margin: 0 auto;
        height: tovmin(200);
        color: $grey-text;
        margin-bottom: tovmin(44);
    }

    .row>span {
        line-height: tovmin(200);
    }

    .image_div {
        height: tovmin(200);
        width: tovmin(200);
        margin-right: tovmin(40);
        text-align: center;
    }

    .image {
        height: tovmin(140);
        width: tovmin(140);
        background: white;
    }

    .name {
        text-align: center;
        height: tovmin(40);
        line-height: tovmin(40) !important;
        display: block;
        color: $red;
    }

    .result {
        color: white;
    }

    .answer {
        color: $green;
    }
</style>