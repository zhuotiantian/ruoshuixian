<template>
  <div class="keybord" v-if="showKeybord">
    <div class="number">
      <span :class="{item:true, active:item==null}" v-for="item in number" :key="item" @click="selectNumber(item)">{{item}}</span>
    </div>
    <span class="item delete" @click="deleteNumber">X删除</span>
  </div>
</template>
<script>
export default {
  props: {
    showKeybord: {
      type: Boolean,
      default: false
    }
  },
  onLoad: function() {
    let number = null;
    let gameName = this.$getGameInfo("name");
    if (gameName == "抽象图形") {
      number = [1, 2, 3, 4, 5];
    } else if (gameName == "二进制数字") {
      number = [0, , , , 1];
    } else {
      number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    }
    this.number = number;
  },
  data() {
    return {
      number: []
    };
  },
  methods: {
    selectNumber: function(data) {
      this.$emit("selectNumber", data);
    },
    deleteNumber: function() {
      this.$emit("deleteNumber");
    }
  }
};
</script>
<style lang="scss" scoped>
.keybord {
  position: fixed;
  width: 100%;
  background: white;
  z-index: 101;
  bottom: tovmin(0);
  padding: tovmin(40);
  display: flex;
  align-items: center;
}

.number {
  width: 28%;
  display: grid;
  grid-template-columns: 19% 19% 19% 19% 19%;
  grid-gap: tovmin(30);
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: relative;
  height: 100%;
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

.item.active {
  color: transparent;
  background: transparent;
}

.delete {
  background: white;
  color: $black;
  position: absolute;
  top: tovmin(40);
  right: tovmin(400);
  border: tovmin(2) solid #363636;
  box-sizing: border-box;
  width: tovmin(100);
}
</style>
