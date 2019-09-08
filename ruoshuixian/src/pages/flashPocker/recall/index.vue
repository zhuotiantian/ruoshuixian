<template>
    <div class="container">
        <CardTitle ref="title" type="开始" @startGame="startGame"></CardTitle>
        <div class="tips">
            <p>回忆这些扑克牌</p>
            <p v-if="recollect_minutes>0&&recollect_seconds==0">{{recollect_minutes}}分钟后开始正式答题</p>
            <p v-if="recollect_minutes==0&&recollect_seconds>0">{{recollect_seconds}}秒后开始正式答题</p>
            <p v-if="recollect_minutes>0&&recollect_seconds>0">{{recollect_minutes}}分{{recollect_seconds}}秒后开始正式答题</p>
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
        data() {
            let rows = new Array(4);
            let columns = new Array(13);
            return {
                rows: rows,
                columns: columns,
                recollect_time: 0,
                recollect_minutes: 0,
                recollect_seconds: 0
            }
        },
        onLoad() {
            Object.assign(this.$data, this.$options.data());
            let level = this.$getStorage("level");
            let rule = this.$getStorage("rule");
            Promise.all([level, rule]).then(values => {
                this.level = values[0];
                this.rule = values[1].rules_of_the_game.filter(e => {
                    return e.game_level == (this.level || "primary")
                })[0];
                this.recollect_time = this.rule.recollect_time;
                this.recollect_minutes = Math.floor(this.recollect_time / 60);
                this.recollect_seconds = this.recollect_time % 60;
            })
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

    .pocker {
        width: tovmin(82);
        height: tovmin(130);
        margin-right: tovmin(10);
        margin-bottom: tovmin(10);
    }
</style>