<template>
    <div>
        <div class="fog" v-if="showPannel" @click="showPannel=false"></div>
        <div class="title">
            <template v-if="isResult">
                <p>
                    <span v-if="isPocker&&showTime">用时：{{time/1000}}S</span>
                    <span v-else>得分：{{count}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标准分：{{game.length}}</span>
                </p>
                <p style="flex:1;text-align:right">
                    <span class="btn default-btn" style="margin-right:15rpx" v-if="isPocker" @click="showTimeHandle">
                        <span v-if="showTime">显示得分</span>
                        <span v-else>显示用时</span>
                    </span>
                    <span class="btn primary-btn">再次训练</span>
                    <button class="btn default-btn shareBtn" v-if="ratio" open-type="share">
                        <image class="share" :src="'/static/images/redPocket/share@'+ratio+'x.png'" />
                        分享
                    </button>
                </p>
            </template>
            <template v-else>
                <p style="flex:1;text-align:left">
                    <span class="btn default-btn" @click="toHelpPage">帮助</span>
                    <span class="btn default-btn type arrow" v-if="showType" style="margin-left:30rpx" @click="showPannel=true">{{selectType}}</span>
                </p>
                <p style="flex:1;text-align:center" v-if="!(t_minutes==null||t_seconds==null)">
                    00：{{t_minutes<10?'0'+t_minutes:t_minutes}}：{{t_seconds<10?'0'+t_seconds:t_seconds}}</p>
                <div style="flex:1;text-align:right">
                    <p class="btn primary-btn" v-if="type=='跳过'" @click="toNextPage">跳过</p>
                    <p class="btn primary-btn" v-if="type=='下一页'" @click="nextPage">下一页</p>
                    <p class="btn primary-btn" v-if="isInsert" style="margin-right:15rpx" @click="insertPocker">插入空牌</p>
                    <p class="btn submit-btn" v-if="type=='记忆完成'" @click="finishMemary">记忆完成</p>
                    <p class="btn submit-btn" v-if="type=='作答完成'" @click="finish">作答完成</p>
                    <p class="btn submit-btn" v-if="type=='开始'" @click="startGame">开始</p>
                    <p v-else>&nbsp;</p>
                </div>
            </template>
        </div>
        <div :class="{pannel:true,down:showPannel,up:!showPannel}">
            <p>显示方式</p>
            <p v-for="(item,index) in pannelContent" :key="index" @click.stop="group(item,index)" :class="{active:active==index}">{{item}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        props: [
            "seconds",
            "minutes",
            "type",
            "isResult",
            "showType",
            "pannelContent",
            "isPocker",
            "showTime",
            "isInsert",
            "btnType"
        ],
        mounted() {
            this.timer && clearInterval(this.timeout);
            this.showType ? null : this.timer();
            this.ratio = this.globalData.ratio;
            this.game = wx.getStorageSync("game");
            this.result = wx.getStorageSync("result");
            this.time = wx.getStorageSync("time");
            if (wx.getStorageSync("gameid") == 3) {
                for (var i = 0; i < this.result.length; i++) {
                    for (var j = 0; j < this.game.length; j++) {
                        if (this.game[j] === this.result[i]) {
                            this.count++
                        }
                    }
                }
            } else {
                for (var i = 0; i < this.result.length; i++) {
                    for (var j = 0; j < this.game.length; j++) {
                        if (this.game[j].index === this.result[i].index && this.game[j].color === this.result[i].color) {
                            this.count++
                        }
                    }
                }
            };
            let times = wx.getStorageSync("rule").rules_of_the_game;
            switch (this.type) {
                case "记忆完成":
                    this.t_seconds = wx.getStorageSync("memoryTime");
                    this.t_minutes = 0;
                    break;
                case "开始":
                    this.t_seconds = times.filter(e => {
                        return e.type == "recollect_time"
                    })[0].number;
                    this.t_minutes = 0;
                    break;
                case "作答完成":
                    this.t_seconds = 0;
                    this.t_minutes = 15;
                    break;
                case "跳过":
                    this.t_seconds = 60;
                    this.t_minutes = 0;
                    break;
            }

        },
        data() {
            return {
                t_seconds: this.seconds,
                t_minutes: this.minutes,
                showPannel: false,
                selectType: "显示方式",
                showTime: this.showTime,
                active: null,
                ratio: 1,
                event: {
                    "跳过": "toNextPage",
                    "记忆完成": "finishMemary",
                    "作答完成": "finish",
                    "开始": "startGame"
                },
                game: [],
                result: [],
                count: 0,
                time: 0,
                memoryTime: 0,
                recallTime: 0,
            };
        },
        watch: {
            t_seconds: function() {
                if (this.t_minutes == 0 && this.t_seconds == 0) {
                    if (this.btnType == 'none') {
                        this.toNextPage();
                    }
                    this.type && this[this.event[this.type]]("timeout");
                }
            },
            minutes: function(data) {
                this.t_minutes = data - 1;
                this.t_seconds = 60;
            }
        },
        methods: {
            timer: function() {
                if (this.t_minutes) {
                    this.t_seconds = 60;
                    this.t_minutes = this.t_minutes - 1;
                    this.timeout = setInterval(() => {
                        if (this.t_seconds == 0) {
                            if (this.t_minutes > 0) {
                                this.t_minutes--;
                                this.t_seconds = 60;
                            } else {
                                clearInterval(this.timeout);
                            }
                        } else {
                            this.t_seconds--;
                        }
                    }, 1000);
                } else {
                    this.timeout = setInterval(() => {
                        this.t_seconds--;
                        if (this.t_seconds == 0) {
                            clearInterval(this.timeout);
                        }
                    }, 1000);
                }
            },
            finish: function(data) {
                clearInterval(this.timeout);
                this.$emit("finish", data);
            },
            nextPage: function() {
                this.$emit("nextPage");
            },
            group: function(count, index) {
                this.selectType = count;
                this.active = index;
                this.$emit("group", count);
                this.showPannel = false;
                clearInterval(this.timeout);
                this.timer();
            },
            toNextPage: function() {
                clearInterval(this.timeout);
                this.$emit("toNextPage");
            },
            toHelpPage: function() {
                wx.navigateTo({
                    url: "/pages/help/main"
                });
            },
            startGame: function() {
                clearInterval(this.timeout);
                this.$emit("startGame");
            },
            showTimeHandle: function() {
                this.showTime = !this.showTime;
            },
            finishMemary: function() {
                clearInterval(this.timeout);
                this.$emit("finishMemary");
            }
        }
    };
</script>
<style lang="scss" scoped>
    .title {
        font-size: tovmin(30);
        display: flex;
        justify-content: space-between;
        padding: tovmin(40) tovmin(30) tovmin(30) tovmin(30);
        position: fixed;
        top: 0;
        width: calc(100% - 30rpx);
        background: $deep-blue;
        color: white;
        z-index: 999;
    }

    .shareBtn {
        background: white;
        color: $black;
        text-align: right;
        width: tovmin(130);
        vertical-align: middle;
        margin-left: tovmin(26);
    }

    .share {
        width: tovmin(32);
        height: tovmin(26);
        top: tovmin(6);
    }

    .pannel {
        position: fixed;
        width: 100%;
        background: white;
        color: $black;
        z-index: 10001;
        bottom: tovmin(-1000);
        text-align: center;
        // height: 100%;
    }

    .pannel p:first-child {
        height: tovmin(150);
        line-height: tovmin(150);
    }

    .pannel p {
        height: tovmin(120);
        line-height: tovmin(120);
    }

    .pannel p.active {
        background: $light-blue;
    }

    .type {
        width: tovmin(170);
        text-align: center;
        position: absolute;
    }

    .down {
        animation: slide-down 0.5s;
        animation-fill-mode: forwards;
    }

    .up {
        animation: slide-up 0.5s;
        animation-fill-mode: forwards;
    }

    @keyframes slide-down {
        from {
            bottom: tovmin(-1000);
        }

        to {
            bottom: 0;
            display: block;
        }
    }

    @keyframes slide-up {
        from {
            bottom: 0;
        }

        to {
            bottom: tovmin(-1000);
            display: none;
        }
    }
</style>