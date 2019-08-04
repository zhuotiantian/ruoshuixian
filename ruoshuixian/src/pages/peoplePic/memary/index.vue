<template>
    <div class="container">
        <CardTitle :seconds="seconds" :minutes="minutes" type="记忆完成" @finishMemary="finishMemary"></CardTitle>
        <div class="list">
            <div class="row" v-for="(rows,_index) in number" :key="_index">
                <div class="image" v-for="(item,index) in rows" :key="index">
                    <image class="image" :src="domain+item.avatar" />
                    <span class="name">{{item.name}}</span>
                </div>
                <span class="rowName">row&nbsp;&nbsp;{{_index+1}}</span>
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
            let list = wx.getStorageSync("rule").list;
            this.numberList = list.name.map((e, index) => {
                return {
                    name: e,
                    avatar: list.avatar[index]
                }
            });
            this.total = wx.getStorageSync("rule").rules_of_the_game.filter(e => {
                return e.type == "number"
            })[0].number;
            this.per = wx.getStorageSync("rule").rules_of_the_game.filter(e => {
                return e.type == "number_per_group"
            })[0].number;
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
        data() {
            return {
                number: [],
                numberList: [],
                counts: 0,
                ratio: 1,
                total: 0,
                per: 0,
                domain: this.$http.domain
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
        margin-left: tovmin(230);
        margin-top: tovmin(230);
    }

    .row {
        display: flex;
        width: 80%;
        margin: 0 auto;
        height: tovmin(200);
        color: $grey-text;
        margin-bottom: tovmin(44);
        text-align: center;
    }

    .rowName {
        height: tovmin(140);
        line-height: tovmin(140);
    }

    .image {
        height: tovmin(140);
        width: tovmin(140);
        background: white;
        margin-right: tovmin(40);
    }

    .name {
        height: tovmin(40);
        line-height: tovmin(40) !important;
        color: white;
    }
</style>