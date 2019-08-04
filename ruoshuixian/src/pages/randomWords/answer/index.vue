<template>
    <div class="container">
        <div class="fog" v-if="showFog"></div>
        <alertBox :text="text" v-if="showFog" @hideFog="hideFog" @confirm="confirm"></alertBox>
        <CardTitle type="作答完成" @finish="finish" @nextPage="nextPage"></CardTitle>
        <div class="list">
            <span v-for="(item,index) in list" :key="index+1"><span>{{index+1}}</span><input type="text" class="input" v-model="item.text"></span>
        </div>
    </div>
</template>

<script>
    import CardTitle from "@/components/gameTitle"
    import alertBox from "@/components/alertBox"
    export default {
        components: {
            CardTitle,
            alertBox
        },
        created() {
            this.level = wx.getStorageSync("level");
        },
        mounted() {
            let rule = wx.getStorageSync("rule").rules_of_the_game.filter(e => {
                return e.game_level == this.level
            })[0]
            this.list = rule.list.map(e => {
                return {
                    text: ""
                }
            });
            this.startTime = new Date().getTime();
            this.game_records_id = rule.game_records_id;
        },
        data() {
            return {
                list: [],
                showFog: false,
                text: "确定结束作答吗？",
            }
        },
        methods: {
            nextPage: function() {
                this.type = "作答完成"
            },
            finish: function() {
                this.showFog = true;
            },
            hideFog: function() {
                this.showFog = false;
            },
            confirm: function() {
                this.endTime = new Date().getTime();
                let result = [];
                this.list.forEach(e => {
                    result.push(e.text);
                });
                this.$http.post({
                    url: "/api/wxapp.game/submitTheGame",
                    data: {
                        game_records_id: this.game_records_id,
                        game_time: (this.endTime - this.startTime) / 1000,
                        content: JSON.stringify(result)
                    }
                }).then(result => {
                    if (result.code == 1) {
                        wx.navigateTo({
                            url: "../result/main"
                        })
                    } else {
                        wx.showToast({
                            title: result.msg,
                            icon: "none"
                        });
                    }
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

    .title {
        font-size: tovmin(30);
        display: flex;
        justify-content: space-between;
        margin: tovmin(40) tovmin(30) 0 tovmin(30);
    }

    .list {
        margin: tovmin(200) tovmin(30) tovmin(30) tovmin(30);
    }

    .list {
        display: grid;
        grid-template-columns: tovmin(200) tovmin(200) tovmin(200) tovmin(200) tovmin(200);
        grid-gap: tovmin(20);
        font-size: tovmin(26);
        justify-content: center;
        align-items: center;
        color: $grey-text;
    }

    .list>span {
        border: tovmin(2) solid $blue-border;
        text-align: center;
        display: inline-block;
    }

    .input {
        border-bottom: tovmin(2) solid $grey-text;
        display: inline-block;
        width: tovmin(134);
        font-size: tovmin(26);
    }
</style>