<template>
    <div class="container" v-if="memaryTime.length>0">
        <CardTitle :seconds="seconds" :minutes="minutes" :btnType="btnType" :type="titleBtn" @toNextPage="toNextPage">
        </CardTitle>
        <div class="content" v-if="type=='time'">
            <span class="label">请选择闪视时间：</span>
            <div class="btn-group">
                <span v-for="(item,index) in memaryTime" :class="{active:activeIndex==item}" @click="activeIndex=item" :key="index">{{item}}S</span>
            </div>
        </div>
        <div class="content" v-else>
            <span class="label">请选择显示方式：</span>
            <div class="btn-group">
                <span :class="{active:activeIndex=='all'}" @click="activeIndex='all'">all</span><span :class="{active:activeIndex==2}" @click="activeIndex=2">2</span><span :class="{active:activeIndex==4}" @click="activeIndex=4">4</span><span :class="{active:activeIndex==8}" @click="activeIndex=8">8</span>
            </div>
        </div>
        <div class="btn submit-btn" @click="toNextPage">{{type=='time'?activeIndex+"S":"确定"}}</div>
    </div>
</template>
<script>
    import CardTitle from "@/components/gameTitle"
    export default {
        props: ["type", "titleBtn", "nextPage", "btnType"],
        components: {
            CardTitle
        },
        data() {
            return {
                seconds: 60,
                activeIndex: this.type == 'time' ? 0 : "all",
                minutes: 0,
                btnType: this.btnType,
                memaryTime: [],
            }
        },
        mounted() {
            this.timer && clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.seconds--;
                if (this.seconds == 0) {
                    clearInterval(this.timer);
                }
            }, 1000);
            let memaryTime = wx.getStorageSync("rule").rules_of_the_game;
            this.memaryTime = memaryTime.filter(e => {
                return e.type == "memory_time"
            }).map(e => {
                return e.number
            }).sort(function(a, b) {
                return a - b
            });
            this.activeIndex = this.memaryTime[0];
        },
        methods: {
            toNextPage: function(data) {
                clearInterval(this.timer);
                wx.setStorageSync("memoryTime", this.activeIndex);
                wx.navigateTo({
                    url: this.nextPage
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        background: $deep-blue;
        color: white;
        text-align: center;
    }

    .content {
        margin: tovmin(350) auto auto auto;
        display: flex;
        width: 64%;
        text-align: center;
        justify-content: center;
    }

    .label {
        height: tovmin(56);
        line-height: tovmin(56);
        font-weight: bold;
        font-size: tovmin(28);
    }

    .btn-group span {
        margin-right: tovmin(90);
        width: tovmin(100);
        height: tovmin(56);
        display: inline-block;
        font-size: tovmin(26);
    }

    .btn-group .active {
        border-radius: tovmin(34);
        background: $middle-blue;
        display: inline-block;
        text-align: center;
        line-height: tovmin(56);
    }

    .submit-btn {
        height: tovmin(98);
        width: tovmin(220);
        border-radius: tovmin(50);
        text-align: center;
        line-height: tovmin(98);
        font-size: tovmin(34);
        margin: 0 auto;
        margin-top: tovmin(160);
    }
</style>