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
    this.level = this.$store.state.level;
    this.rule = this.$store.state.rule.rules_of_the_game.filter(e => {
      return e.game_level == this.level
    })[0];;
    this.token = this.$store.state.userInfo.token;
    this.startTime = new Date().getTime();
    this.game_records_id = this.rule.game_records_id;
  },
  methods: {
    finishAnwser: function (data) {
      let result = this.$refs.answer.result;
      this.showFog = true;
    },
    hideFog: function () {
      this.showFog = false;
    },
    confirm: function () {
      this.endTime = new Date().getTime();
      let allResults = this.$refs.answer.allResult;
      let params = [];
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
