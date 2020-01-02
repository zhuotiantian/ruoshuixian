<template>
  <div class="container">
    <div class="fog" v-if="showFog"></div>
    <alertBox :text="text" v-if="showFog&&!showTip" @hideFog="hideFog" @confirm="confirm"></alertBox>
    <GameTitle :showTips="true" :showIntervalTime='true' :showFinishAnwserBtn="true" @finishAnwser="finishAnwser"></GameTitle>
    <Answer ref="answer" />
  </div>
</template>
<script>
import GameTitle from "@/components/gameTitle_new"
import alertBox from "@/components/alertBox"
import Answer from "@/components/answer"
export default {
  components: {
    GameTitle,
    Answer,
    alertBox
  },
  data () {
    return {
      showFog: false,
      showBtnGroup: false,
      game_records_id: 1,
    }
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data())
    this.init();
  },
  methods: {
    init: function () {
      this.startTime = new Date().getTime();
    },
    finishAnwser: function (data) {
      let result = this.$refs.answer.result;
      this.showFog = true;
    },
    hideFog: function () {
      this.showFog = false;
    },
    confirm: function () {
      this.endTime = new Date().getTime();
      let allResults = this.$refs.answer.allResult,
        params = [],
        game_records_id = this.$store.state.ruleList.game_records_id,
        token = this.$store.state.userInfo.token;
      for (var i = 0; i < allResults.length; i++) {
        let item = [];
        for (var j = 0; j < allResults[i].length; j++) {
          item.push({
            index: allResults[i][j].columnIndex,
            color: allResults[i][j].rowIndex,
          })
        };
        params.push(item)
      }
      this.$http.post({
        url: "/api/wxapp.game/submitTheGame",
        data: {
          game_records_id,
          game_time: (this.endTime - this.startTime) / 1000,
          content: JSON.stringify(params)
        },
        header: {
          token
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
    }
  }
}
</script>
<style lang="scss" scoped>
.hidden {
  visibility: hidden;
}

.container {
  padding-top: tovmin(140);
  color: white;
  text-align: center;
}
</style>
