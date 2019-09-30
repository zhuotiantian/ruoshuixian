<template>
    <div class="container">
        <div class="fog" v-if="showFog"></div>
        <alertBox :text="text" v-if="showFog" @hideFog="hideFog" @confirm="confirm"></alertBox>
        <CardTitle type="作答完成" seconds="7200" @finish="finish"></CardTitle>
        <div class="list">
            <div class="row" v-for="(rows,_index) in number" :key="_index">
                <span class="item" :class="{item:true,selected:item.selected}" v-for="(item,index) in rows" @click="selected(_index,index)" :key="index">{{item.number}}</span>
                <span style="width:50rpx">row&nbsp;&nbsp;{{_index+1}}</span>
            </div>
        </div>
        <Keybord :showKeybord="showKeybord" @selectNumber="selectNumber" @deleteNumber="deleteNumber"></Keybord>
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
        onLoad() {
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

                this.numberList = this.rule.list.map(e => {
                    return {
                        number: "",
                        selected: false
                    }
                });
                this.total = this.rule.number;
                this.per = this.rule.number_per_group;
                let number = [];
                for (var i = 0; i < this.total; i += this.per) {
                    number.push(this.numberList.slice(i, i + this.per));
                };
                this.number = number;
                this.startTime = new Date().getTime();
                this.game_records_id = this.rule.game_records_id;
            })
        },
        data() {
            return {
                showKeybord: true,
                showFog: false,
                text: "确定结束作答吗？",
                number: [],
                total: 0,
                per: 0,
                game_records_id: 1,
                rule: {},
                level: "primary",
                rowIndex: null,
                columnIndex: null
            }
        },
        methods: {
            finish: function() {
                this.showFog = true;
            },
            hideFog: function() {
                this.showFog = false;
            },
            confirm: function() {
                this.endTime = new Date().getTime();
                let result = [];
                this.number.forEach(e => {
                    e.forEach(m => {
                        result.push(m.number);
                    })
                });
                this.$http.post({
                    url: "/api/wxapp.game/submitTheGame",
                    data: {
                        game_records_id: this.game_records_id,
                        game_time: (this.endTime - this.startTime) / 1000,
                        content: JSON.stringify(result)
                    },
                    header: {
                        token: this.token
                    }
                }).then(result => {
                    if (result.code == 1) {
                        this.$setStorage("result", result.data).then(() => {
                            wx.reLaunch({
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
            selected: function(row, column) {
                let number = this.number.map(e => {
                    return e
                });
                number.forEach(e => {
                    e.forEach(m => {
                        m.selected = false;
                    })
                });
                this.number = number;
                this.$set(this.number[row], column, {
                    selected: true,
                    number: this.number[row][column].number
                });
                this.hasSelect = true;
                this.rowIndex = row;
                this.columnIndex = column;
            },
            selectNumber: function(data) {
                if (this.rowIndex == null && this.columnIndex == null) return false;
                let number = this.number;
                number.forEach((e, rowIndex) => {
                    e.forEach((m, columnIndex) => {
                        if (m.selected) {
                            this.rowIndex = rowIndex;
                            this.columnIndex = columnIndex;
                            m.number = data
                        }
                    })
                });
                this.number = number;
                this.$set(this.number[this.rowIndex][this.columnIndex], "selected", false);
                if (this.columnIndex < this.number[this.rowIndex].length - 1) {
                    this.columnIndex++;
                } else if (this.rowIndex < this.number.length - 1 && this.columnIndex == this.number[this.rowIndex].length - 1) {
                    this.rowIndex++;
                    this.columnIndex = 0;
                }
                this.$set(this.number[this.rowIndex][this.columnIndex], "selected", true);
            },
            deleteNumber: function() {
                if ((this.rowIndex == null && this.columnIndex == null)) return false;
                let number = this.number;
                number.forEach((e, rowIndex) => {
                    e.forEach((m, columnIndex) => {
                        if (m.selected) {
                            this.rowIndex = rowIndex;
                            this.columnIndex = columnIndex;
                            m.number = ""
                        }
                    })
                });
                this.$set(this.number[this.rowIndex][this.columnIndex], "selected", false);
                this.number = number;
                if (this.rowIndex == 0 && this.columnIndex == 0) {

                } else {
                    if (this.columnIndex == 0) {
                        this.rowIndex--;
                        this.columnIndex = this.number[this.rowIndex].length - 1;
                    } else {
                        this.columnIndex--;
                    };
                }
                this.$set(this.number[this.rowIndex][this.columnIndex], "selected", true);
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
        margin-bottom: tovmin(300);
    }

    .row {
        display: flex;
        width: 80%;
        margin: 0 auto;
        margin-bottom: tovmin(30);
    }

    .item {
        flex: 1;
        border: tovmin(2) solid $middle-blue;
        border-right: none;
        height: tovmin(40);
        width: tovmin(28);
        text-align: center;
    }

    .item:nth-last-child(2) {
        border-right: tovmin(2) solid $middle-blue;
        margin-right: tovmin(20);
    }

    .selected {
        border: 1px solid red;
        margin-right: tovmin(-1);
        position: relative;
        z-index: 10;
    }
</style>