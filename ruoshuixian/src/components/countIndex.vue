<template>
    <div class="container">
        <CardTitle :seconds="seconds" :minutes="minutes" type="跳过" @toNextPage="toNextPage"></CardTitle>
        <div class="content">
            <p>本轮记忆时间：{{memaryTime}}秒钟</p>
            <p :class="{proccess,acticve,active:seconds>3&&seconds<=60}">一分钟准备</p>
            <p :class="{proccess,active:seconds>1&&seconds<=3}">脑细胞准备</p>
            <p :class="{proccess,active:seconds>0&&seconds<=1}">开始</p>
            <p>
                <span :class="{radio:true,active:level=='primary'}" @click="selLevel('primary')">初级</span>
                <span :class="{radio:true,active:level=='senior'}" @click="selLevel('senior')">高级</span>
            </p>
        </div>
    </div>
</template>
<script>
    import CardTitle from "@/components/gameTitle"
    export default {
        props: ["nextPage"],
        components: {
            CardTitle
        },
        onLoad() {
            this.show = true
        },
        onUnload() {
            this.show = false
        },
        onLoad() {
            this.level = this.$getParams("level");
            this.rule = this.$getParams("rule");
        },
        data() {
            return {
                level: 'primary',
                seconds: 60,
                memaryTime: null,
                show: false,
                minutes: 0,
                rule: {}
            }
        },
        mounted() {
            this.memaryTime = this.rule.rules_of_the_game.filter(e => {
                return e.game_level == this.level
            })[0].memory_time;
            this.timer = setInterval(() => {
                this.seconds--;
                if (this.seconds == 0) {
                    clearInterval(this.timer);
                }
            }, 1000);
        },
        methods: {
            toNextPage: function() {
                wx.navigateTo({
                    url: this.nextPage
                });
                wx.setStorageSync("level", this.level);
            },
            selLevel: function(level) {
                this.level = level;
                this.seconds = 60;
            }
        },

    }
</script>
<style lang="scss" scoped>
    .container {
        background: $deep-blue;
        color: white;
    }

    .content {
        margin-top: tovmin(180);
    }

    .content p {
        text-align: center;
        line-height: tovmin(30);
        margin-bottom: tovmin(30)
    }

    .content p:last-child {
        margin-top: tovmin(118);
    }

    .content p span:first-child {
        margin-right: tovmin(170);
    }

    p.active {
        color: $middle-blue;
    }
</style>