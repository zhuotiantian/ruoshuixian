<template>
  <div class="container">
    <div class="fog" v-if="showFog"></div>
    <alertBox :text="text" v-if="showFog" @hideFog="hideFog" @confirm="confirm"></alertBox>
    <CardTitle :seconds="seconds" :minutes="minutes" type="作答完成" @finish="finish">
    </CardTitle>
    <div class="list">
      <p class="list-title">
        <span>序号</span>
        <span>时间</span>
        <span style="flex:5;">事件</span>
      </p>
      <p><span>1</span><span><input type="text" class="input" @focus="focus" @blur="blur"></span><span
          style="flex:5;">事件事件</span>
      </p>
    </div>
    <Keybord :showKeybord="showKeybord"></Keybord>
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
      return {
        seconds: 0,
        minutes: 15,
        showKeybord: false,
        showFog: false,
        text: "确定结束作答吗？"
      }
    },
    methods: {
      focus: function () {
        this.showKeybord = true;
      },
      blur: function () {
        this.showKeybord = false;
      },
      finish: function () {
        this.showFog = true;
      },
      hideFog: function () {
        this.showFog = false;
      },
      confirm: function () {
        wx.navigateTo({
          url: "../result/main"
        })
      }
    }
  };

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
    height: calc(100% - 150rpx);
    margin: tovmin(150) tovmin(30) auto tovmin(30);
  }

  .list p {
    display: flex;
    align-items: center;
    text-align: center;
    height: tovmin(86);
  }

  .list p span {
    flex: 1;
    text-align: center;
  }

  .list-title {
    color: $yellow;
  }

  .input {
    width: tovmin(164);
    height: tovmin(66);
    border: tovmin(2) solid $blue-border;
    border-radius: tovmin(8);
    margin: 0 auto;
  }

</style>
