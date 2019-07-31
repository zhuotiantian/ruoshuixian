<template>
    <div class="container">
        <div class="fog" v-if="showFog"></div>
        <alertBox :text="text" v-if="showFog" @hideFog="hideFog" @confirm="confirm"></alertBox>
        <CardTitle :seconds="seconds" :minutes="minutes" type="作答完成" @finish="finish"></CardTitle>
        <div class="list">
            <div class="row" v-for="(rows,_index) in number" :key="_index">
                <span :class="{item:true,selected:item.selected}" v-for="(item,index) in rows" :key="index" @click="selected(_index,index)">{{item.number}}</span>
                <span style="width:50rpx">row&nbsp;&nbsp;{{_index+1}}</span>
            </div>
        </div>
        <Keybord :showKeybord="showKeybord" counts="2" @selectNumber="selectNumber" @deleteNumber="deleteNumber"></Keybord>
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
        data() {
            let array = [];
            let array1 = [0, 1];
            for (let i = 0; i < 30; i++) {
                array.push({
                    selected: false,
                    number: ""
                });
            };
            let number = [];
            for (let i = 0; i < 100; i++) {
                let item = array.map(e => {
                    return e
                })
                number.push(item);
            };
            return {
                seconds: 0,
                minutes: 15,
                showKeybord: true,
                showFog: false,
                number: number,
                hasSelect: false,
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
                let number = this.number;
                number.forEach(e => {
                    e.map(m => {
                        return m.number
                    })
                });
                wx.setStorageSync("result", number);
                wx.navigateTo({
                    url: "../result/main"
                });
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
                    number: ""
                });
                this.hasSelect = true;
            },
            selectNumber: function(data) {
                let number = this.number;
                number.forEach(e => {
                    e.forEach(m => {
                        if (m.selected) {
                            m.number = data
                        }
                    })
                });
                this.number = number;
            },
            deleteNumber: function() {
                let number = this.number;
                number.forEach(e => {
                    e.forEach(m => {
                        if (m.selected) {
                            m.number = ""
                        }
                    })
                });
                this.number = number;
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
        margin-bottom: tovmin(180);

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