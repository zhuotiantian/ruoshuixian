<template>
    <div class="container">
        <div class="header">
            <span :class="{active:active=='打卡记录'}" @click="active='打卡记录'">打卡记录</span>
            <span :class="{active:active=='成绩记录'}" @click="active='成绩记录'">成绩记录</span>
        </div>
        <div class="content">
            <ul class="list" v-if="active=='打卡记录'">
                <li>
                    <span>2019.1.25</span>
                    <span>打卡成功</span>
                </li>
                <li>
                    <span>2019.1.25</span>
                    <span>打卡成功</span>
                </li>
                <li>
                    <span>2019.1.25</span>
                    <span>打卡成功</span>
                </li>
                <li>
                    <span>2019.1.25</span>
                    <span>打卡成功</span>
                </li>
                <li>
                    <span>2019.1.25</span>
                    <span>打卡成功</span>
                </li>
                <li>
                    <span>2019.1.25</span>
                    <span>打卡成功</span>
                </li>
            </ul>
            <ul class="list" v-else>
                <li>
                    <span>人名头像</span>
                    <span>
                        <span>66</span>
                        <span>
                            <image class="image" :src="'/static/images/my/share.png'"></image>
                        </span>
                        <span>分享</span>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                active: "打卡记录",

            }
        },
    }
</script>

<style lang="scss" scoped>
    .container {
        height: 100%;
        position: absolute;
        width: 100%;
    }

    .content {
        padding: tovmin(30);
        background: $grey-background;
        height: calc(100% - 172rpx);
        font-size: tovmin(28);
    }

    .header {
        height: tovmin(110);
        background: $deep-blue;
        display: flex;
        justify-content: center;
        color: white;
        align-items: center;
    }

    .header span {
        flex: 1;
        text-align: center;
    }

    .header span.active {
        color: $middle-blue;
        position: relative;
    }

    .header span.active::after {
        content: "";
        height: 0;
        width: 0;
        border-color: transparent transparent white transparent;
        border-style: dashed dashed solid dashed;
        border-width: tovmin(20);
        position: absolute;
        top: tovmin(35);
        right: 45%;
    }

    .list {
        background: white;
        padding: 15px;
        height: calc(100% - 30px);
    }

    .list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: tovmin(90);
        border-bottom: tovmin(2) solid $grey-background;
    }

    .list li:last-child {
        border-bottom: none;
    }

    .list li>span {
        flex: 6;
    }

    .list li>span:last-child {
        text-align: right;
    }

    .list li>span:last-child span:first-child {
        margin-right: 5px;
    }

    .image {
        width: tovmin(28);
        height: tovmin(28);
        vertical-align: middle;
    }
</style>