<template>
    <div class="container">
        <CardTitle @finishMemary="finishMemary" type="记忆完成"></CardTitle>
        <div class="list">
            <span v-for="(item,index) in list" :key="index+1">{{item}}</span>
        </div>
    </div>
</template>

<script>
    import CardTitle from "@/components/gameTitle";
    export default {
        components: {
            CardTitle
        },
        onLoad() {
            this.level = wx.getStorageSync("level");
        },
        mounted() {
            this.list = wx.getStorageSync("rule").rules_of_the_game.filter(e => {
                return e.game_level == this.level
            })[0].list;
        },
        data() {
            return {
                list: [],
                level: "primary"
            };
        },
        methods: {
            nextPage: function() {
                this.type = "记忆完成";
            },
            finishMemary: function() {
                wx.navigateTo({
                    url: "../answer/main"
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .container {
        background: $deep-blue;
        color: white;
    }

    .title {
        font-size: tovmin(30);
        display: flex;
        justify-content: space-between;
        margin: tovmin(40) tovmin(30) 0 tovmin(30);
    }

    .list {
        display: grid;
        grid-template-columns: tovmin(200) tovmin(200) tovmin(200) tovmin(200) tovmin(200);
        grid-gap: tovmin(20);
        font-size: tovmin(26);
        justify-content: center;
        align-items: center;
        color: $grey-text;
        margin: tovmin(180) tovmin(30) tovmin(30) tovmin(30);
    }

    .list span {
        border: tovmin(2) solid $blue-border;
        text-align: center;
    }
</style>