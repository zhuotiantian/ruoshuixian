<template>
  <div class="container">
    <div class="fog" v-if="showFog"></div>
    <alertBox :text="text" v-if="showFog&&!showTip" @hideFog="hideFog" @confirm="confirm"></alertBox>
    <GameTitle :startAnwserText="startAnwserText" :showTips="true" :showFinishAnwserBtn="true" @finishAnwser="finishAnwser"></GameTitle>
    <Answer ref="answer" @hideAnwserText="hideAnwserText" />
  </div>
</template>
<script>
import GameTitle from "@/components/gameTitle_new"
import alertBox from "@/components/alertBox"
import Answer from "@/components/answer"
export default {
  components: {
    GameTitle,
    alertBox,
    Answer
  },
  data () {
    return {
      showFog: false,
      showTip: false,
      canAdd: false,
      startAnwserText: true
    }
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data())
    this.token = this.$store.state.userInfo.token;
    this.startTime = new Date().getTime();
    this.game_records_id = this.$store.state.ruleList.game_records_id;
  },
  methods: {
    hideAnwserText: function () {
      console.log("111");
      if (this.startAnwserText) {
        this.startAnwserText = false;
      }
    },
    finishAnwser: function () {
      let result = this.$refs.answer.result;
      this.showFog = true;
    },
    hideFog: function () {
      this.showFog = false;
    },
    confirm: function () {
      this.endTime = new Date().getTime();
      let result = this.$refs.answer.result;
      let params = result.map(e => {
        return {
          index: e.columnIndex,
          color: e.rowIndex
        }
      })
      this.$http.post({
        url: "/api/wxapp.game/submitTheGame",
        data: {
          game_records_id: this.game_records_id,
          game_time: (this.endTime - this.startTime) / 1000,
          content: JSON.stringify(params)
        },
        header: {
          token: this.token
        }
      }).then(result => {
        if (result.code == 1) {
          this.$store.commit("setResult", result.data);

          wx.reLaunch({
            url: "../result/main"
          })
        } else {
          wx.showToast({
            title: result.msg,
            icon: "none"
          });
        }
      })
    },

  }
}
</script>
<style lang="scss" scoped>
.container {
  padding-top: tovmin(120);
  color: white;
  text-align: center;
}

.tips {
  position: fixed;
  top: tovmin(150);
  padding: 0 tovmin(100);
  z-index: 1002;
}

.tips p {
  text-align: left;
}

.tips p:last-child {
  text-align: center;
}

.operationTips {
  text-align: right;
  padding-right: tovmin(30);
  padding-bottom: tovmin(30);
}
</style>
