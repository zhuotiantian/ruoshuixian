<template>
    <div class="container">
        <CardTitle type="开始" @startGame="startGame"></CardTitle>
        <div class="tips">
            <p>回忆这些扑克牌</p>
            <p>{{recollect_time}}秒后开始正式答题</p>
        </div>
        <div class="list">
            <div class="row" v-for="(item,index) in rows" :key="index">
                <image class="pocker" v-for="(item,_index) in columns" :key="_index" :src="'/static/images/pocker/'+(_index/1+1)+'-'+(index/1+1)+'.png'"></image>
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
        onShow() {
            this.level = this.$getParams("level");
            this.rule = this.$getParams("rule");

            this.recollect_time = this.rule.rules_of_the_game.filter(e => {
                return e.game_level == this.level
            })[0].recollect_time;
        },
        data() {
            let rows = new Array(4);
            let columns = new Array(13);
            return {
                rows: rows,
                columns: columns,

                level: "primary",
                rule: {},
                recollect_time: null,
            }
        },
        methods: {
            startGame: function() {
                wx.navigateTo({
                    url: "../answer/main"
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        padding-top: tovmin(300);
        color: white;
        text-align: center;
    }

    .tips p {
        height: tovmin(60);
        line-height: tovmin(60);
    }

    .list {
        margin-top: tovmin(400);
    }
</style>