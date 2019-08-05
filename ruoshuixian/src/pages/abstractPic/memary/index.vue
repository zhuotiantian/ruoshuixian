<template>
    <div class="container">
        <alertBox :text="text" v-if="showFog" @hideFog="hideFog"></alertBox>
        <CardTitle :seconds="seconds" :minutes="minutes" type="记忆完成" @finishMemary="finishMemary"></CardTitle>
        <div class="list">
            <div class="row" v-for="(rows,_index) in number" :key="_index">
                <div class="image" v-for="(item,index) in rows" :key="index">
                    <image class="image" :src="domain+item" />
                </div>
                <span style="margin-left:60rpx">row&nbsp;&nbsp;{{_index+1}}</span>
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
        create() {
            this.level = wx.getStorageSync("level");
        },
        data() {
            return {
                seconds: 0,
                minutes: 15,
                numberList: [],
                text: "确定结束作答吗？",
                number: [],
                counts: 0,
                ratio: 1,
                total: 0,
                per: 0,
                domain: this.$http.domain,
                level: "primary",
                numberList: []
            }
        },
        onLoad(option) {
            let rule = wx.getStorageSync("rule").rules_of_the_game.filter(e => {
                return e.game_level == this.level
            })[0];
            this.numberList = rule.list;
            this.total = rule.number;
            this.per = rule.number_per_group;
        },
        mounted() {
            let number = [];
            for (var i = 0; i < this.total; i += this.per) {
                number.push(this.numberList.slice(i, i + this.per));
            };
            this.number = number.filter(e => {
                return e.length > 0
            });
            this.ratio = this.globalData.ratio;
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
        margin-top: tovmin(160);
        margin-left: tovmin(230);
        margin-top: tovmin(180);
    }

    .row {
        display: flex;
        width: 80%;
        margin: 0 auto;
        height: tovmin(140);
        line-height: tovmin(140);
        color: $grey-text;
        margin-bottom: tovmin(44);
    }

    .image {
        height: tovmin(140);
        width: tovmin(140);
        background: white;
        margin-right: tovmin(50);
    }
</style>