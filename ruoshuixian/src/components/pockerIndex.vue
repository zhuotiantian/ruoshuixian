<template>
    <div class="container">
        <CardTitle :btnType="btnType" :type="titleBtn" @toNextPage="toNextPage">
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
                <span v-for="(item,index) in memaryNumber" :key="index" :class="{active:activeIndex==item}" @click="activeIndex=item">{{item}}</span>
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
                activeIndex: 0,
                btnType: this.btnType,
                memaryTime: [],
                memaryNumber: ["all", "2", "4", "8"]
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
            let rule = wx.getStorageSync("rule").rules_of_the_game;
            if (this.type == "time") {
                this.memaryTime = rule[0].memory_time.split(",");
                this.activeIndex = this.memaryTime[0];
            } else {
                this.activeIndex = this.memaryNumber[0];
            }
        },
        methods: {
            toNextPage: function(data) {
                clearInterval(this.timer);
                if (this.type == "time") {
                    wx.setStorageSync("memoryTime", this.activeIndex);
                }
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