<template>
    <div class="container">
        <div class="fog" v-if="showFog"></div>
        <alertBox :text="text" v-if="showFog" @hideFog="hideFog" @confirm="confirm"></alertBox>
        <CardTitle seconds="900" type="作答完成" @finish="finish">
        </CardTitle>
        <div class="list">
            <p class="list-title">
                <span>序号</span>
                <span>时间</span>
                <span style="flex:5;">事件</span>
            </p>
            <p v-for="(item,index) in numberList" :key="index">
                <span>{{index+1}}</span>
                <input @focus="focus(index)" type="text" :class="{input:true,active:activeIndex==index}">{{item.date}}<span style="flex:5;">{{item.event}}</span>
            </p>
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
            let rule = this.$getStorage("rule");
            let userInfo = this.$getStorage("userInfo");
            Promise.all([level, rule, userInfo]).then(values => {
                this.level = values[0];
                this.rule = values[1].rules_of_the_game.filter(e => {
                    return e.game_level == (this.level || "primary")
                })[0];
                this.token = values[2].token;
                this.numberList = this.rule.list.date.map((e, index) => {
                    return {
                        date: "",
                        event: this.rule.list.event[index]
                    }
                });
                this.startTime = new Date().getTime();
                this.game_records_id = this.rule.game_records_id;
            })
        },
        data() {
            return {
                showFog: false,
                text: "确定结束作答吗？",
                rule: {},
                numberList: [],
                activeIndex: null,
            }
        },
        methods: {
            focus: function(index) {
                this.activeIndex = index;
            },
            finish: function(index) {
                this.showFog = true;
            },
            hideFog: function() {
                this.showFog = false;
            },
            confirm: function() {
                this.endTime = new Date().getTime();
                let date = [];
                let event = [];
                this.numberList.forEach(e => {
                    date.push(e.date);
                    event.push(e.event);
                });
                this.$http.post({
                    url: "/api/wxapp.game/submitTheGame",
                    data: {
                        game_records_id: this.game_records_id,
                        game_time: (this.endTime - this.startTime) / 1000,
                        content: JSON.stringify({
                            date: date,
                            event: event
                        })
                    },
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    if (result.code == 1) {
                        this.$setStorage("result", result.data).then(() => {
                            wx.navigateTo({
                                url: "../result/main"
                            })
                        });
                    } else {
                        wx.showToast({
                            title: result.msg,
                            icon: "none"
                        });
                    }
                })
            },
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
        display: inline-block;
        line-height: tovmin(66);
    }

    .active {
        border: 1px solid red;
        margin-right: tovmin(-1);
        position: relative;
        z-index: 10;
    }
</style>