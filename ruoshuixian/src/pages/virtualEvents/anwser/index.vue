<template>
    <div class="container">
        <div class="fog" v-if="showFog"></div>
        <alertBox :text="text" v-if="showFog" @hideFog="hideFog" @confirm="confirm"></alertBox>
        <CardTitle :seconds="seconds" :minutes="minutes" type="作答完成" @finish="finish">
        </CardTitle>
        <div class="list">
            <p class="list-title">
                <span>序号</span>
                <span>时间</span>
                <span style="flex:5;">事件</span>
            </p>
            <p v-for="(item,index) in numberList" :key="index"><span>{{index+1}}</span><span><input type="text" v-model="item.date" class="input" @focus="focus" @blur="blur"></span><span style="flex:5;">{{item.event}}</span>
            </p>
        </div>
        <Keybord :showKeybord="showKeybord"></Keybord>
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
        created() {
            this.level = wx.getStorageSync("level");
        },
        onLoad(option) {
            this.rule = wx.getStorageSync("rule").rules_of_the_game.filter(e => {
                return e.game_level == this.level
            })[0];
            this.numberList = rule.list.date.map((e, index) => {
                return {
                    date: "",
                    event: rule.list.avatar[index]
                }
            });
            this.startTime = new Date().getTime();
            this.game_records_id = this.rule.game_records_id;
        },
        data() {
            return {
                showKeybord: false,
                showFog: false,
                text: "确定结束作答吗？",
                rule: {},
                numberList: []
            }
        },
        methods: {
            focus: function() {
                this.showKeybord = true;
            },
            blur: function() {
                this.showKeybord = false;
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
                this.numberList.forEach(e => {
                    result.push(e.date);
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
                        wx.setStorageSync("result", result.data);
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
        height: calc(100% - 150rpx);
        margin: tovmin(150) tovmin(30) auto tovmin(30);
    }

    .list p {
        display: flex;
        align-items: center;
        text-align: center;
        height: tovmin(86);
    }

    .list p span {
        flex: 1;
        text-align: center;
    }

    .list-title {
        color: $yellow;
    }

    .input {
        width: tovmin(164);
        height: tovmin(66);
        border: tovmin(2) solid $blue-border;
        border-radius: tovmin(8);
        margin: 0 auto;
    }
</style>