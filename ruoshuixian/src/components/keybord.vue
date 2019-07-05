<template>
  <div :class="{down:showKeybord,up:!showKeybord,keybord:true}">
    <div class="number">
      <span class="item" v-for="item in number" :key="item">{{item}}</span>
    </div>
    <span class="item delete">X</span>
  </div>
</template>
<script>
  export default {
    props: ["showKeybord"],
    data() {
      return {
        number: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        showKeybord: false,
      }
    }
  }

</script>
<style lang="scss" scoped>
  .keybord {
    position: fixed;
    height: tovmin(240);
    width: 100%;
    background: white;
    z-index: 101;
    bottom: tovmin(-500)
  }

  .number {
    width: 28%;
    display: grid;
    grid-template-columns: 19% 19% 19% 19% 19%;
    grid-template-rows: tovmin(80) tovmin(80);
    grid-gap: tovmin(30);
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    position: relative;
    height: 100%;
    transform: translateY(10%);
  }

  .item {
    background: $middle-blue;
    color: white;
    height: tovmin(80);
    width: tovmin(80);
    border-radius: tovmin(10);
    text-align: center;
    line-height: tovmin(80);
  }

  .delete {
    background: white;
    color: $black;
    position: absolute;
    top: tovmin(26);
    right: tovmin(380);
    border: tovmin(2) solid #363636;
    box-sizing: border-box;
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
      bottom: tovmin(-500);
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
      bottom: tovmin(-500);
      display: none;
    }
  }

</style>
