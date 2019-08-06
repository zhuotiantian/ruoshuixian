<template>
    <div class="contanier">
        <CardTitle type="记忆完成" @finishMemary="finishMemary"></CardTitle>
        <div v-if="ratio" class="content">
            <image class="play" :src="'/static/images/firstPage/play@'+ratio+'x.png'"></image>
            <image class="slider" :src="'/static/images/firstPage/slider@'+ratio+'x.png'"></image>
            <em></em>
        </div>
        <p class="text">正在播放录音&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;</p>
    </div>
</template>
<script>
    import CardTitle from "@/components/gameTitle"
    export default {
        components: {
            CardTitle
        },
        created() {
            this.level = wx.getStorageSync("level");
            this.rule = wx.getStorageSync("rule").rules_of_the_game.filter(e => {
                return e.game_level == this.level
            })[0];
            // 创建音频播放对象
            this.innerAudioContext = wx.createInnerAudioContext();
        },
        mounted() {
            this.ratio = this.globalData.ratio;
            this.numberList = this.rule.list ? this.rule.list : [];
            let index = -1;
            this.timer = setInterval(() => {
                index++;
                if (index == this.numberList.length - 1) {
                    this.innerAudioContext.src = 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=' + encodeURI("播放完毕")
                    clearInterval(this.timer);
                } else {
                    // 设置音频播放来源
                    this.innerAudioContext.src = 'http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=' + encodeURI(this.numberList[index])
                }
                // 音频进入可以播放状态
                this.innerAudioContext.onCanplay((res) => {
                    this.isPaly = true
                });
                this.innerAudioContext.play();
            }, 2000);
        },
        data() {
            return {
                ratio: 1,
                isPaly: true
            }
        },
        methods: {
            finishMemary: function() {
                clearInterval(this.timer);
                this.innerAudioContext.pause();
                wx.navigateTo({
                    url: "../answer/main"
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .contanier {
        color: white;
        text-align: center;
    }

    .content {
        width: tovmin(692);
        height: tovmin(138);
        text-align: center;
        margin: 0 auto;
        margin-top: tovmin(250);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .play {
        height: tovmin(64);
        width: tovmin(64);
    }

    .slider {
        height: tovmin(24);
        width: tovmin(24);
        position: absolute;
    }

    em {
        height: tovmin(4);
        width: tovmin(538);
        background: $middle-blue;
        margin-left: tovmin(10)
    }

    .text {
        margin-top: tovmin(100)
    }
</style>