import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
Vue.prototype.globalData = getApp().globalData;
let pixelRatio = 0
wx.getSystemInfo({
  success: function (res) {
    pixelRatio = res.pixelRatio
  },
  fail: function () {
    pixelRatio = 0
  }
});
getApp().globalData.ratio = pixelRatio;
getApp().globalData.games = [{
  name: "闪视扑克牌",
  url: "../flashPocker/main"
}, {
  name: "快速扑克牌",
  url: "../fastPocker/main"
}, {
  name: "马拉松扑克牌",
  url: "../marathonPocker/main"
}, {
  name: "二进制数字",
  url: "../binaryNumber/main"
}, {
  name: "快速数字",
  url: "../fastNumber/main"
}, {
  name: "马拉松数字",
  url: "../marathonNumber/main"
}, {
  name: "随机词语",
  url: "../randomWords/main"
}, {
  name: "人名头像",
  url: "../peoplePic/main"
}, {
  name: "抽象图形",
  url: "../abstractPic/main"
}, {
  name: "听记数字",
  url: "../listenAndRemember/main"
}, {
  name: "虚拟事件和日期",
  url: "../virtualEvents/main"
}];
