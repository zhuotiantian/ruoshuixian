import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.config._mpTrace = true
App.mpType = 'app'
const app = new Vue(App);
app.$mount();
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
  name: "闪现扑克牌",
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
  url: "../firstPage/randomWords/main"
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
export default {
  config: {
    pages: [
      "pages/firstPage/main",
      "pages/hongbao/redPocketList/main",
      "pages/hongbao/main",
      "pages/firstPage/ranking/main",

      "pages/firstPage/flashPocker/result/main",
      "pages/firstPage/flashPocker/answer/main",
      "pages/firstPage/flashPocker/recall/main",
      "pages/firstPage/flashPocker/memary/main",
      "pages/firstPage/flashPocker/main",

      "pages/firstPage/marathonPocker/result/main",
      "pages/firstPage/marathonPocker/answer/main",
      "pages/firstPage/marathonPocker/recall/main",
      "pages/firstPage/marathonPocker/memary/main",
      "pages/firstPage/marathonPocker/main",

      "pages/firstPage/fastPocker/result/main",
      "pages/firstPage/fastPocker/answer/main",
      "pages/firstPage/fastPocker/recall/main",
      "pages/firstPage/fastPocker/memary/main",
      "pages/firstPage/fastPocker/main",

      "pages/firstPage/peoplePic/result/main",
      "pages/firstPage/peoplePic/answer/main",
      "pages/firstPage/peoplePic/memary/main",
      "pages/firstPage/peoplePic/main",

      "pages/firstPage/abstractPic/answer/main",
      "pages/firstPage/abstractPic/result/main",
      "pages/firstPage/abstractPic/memary/main",
      "pages/firstPage/abstractPic/main",

      "pages/firstPage/binaryNumber/answer/main",
      "pages/firstPage/binaryNumber/memary/main",
      "pages/firstPage/binaryNumber/result/main",
      "pages/firstPage/binaryNumber/main",

      "pages/firstPage/marathonNumber/memary/main",
      "pages/firstPage/marathonNumber/answer/main",
      "pages/firstPage/marathonNumber/result/main",
      "pages/firstPage/marathonNumber/main",

      "pages/firstPage/fastNumber/result/main",
      "pages/firstPage/fastNumber/answer/main",
      "pages/firstPage/fastNumber/memary/main",
      "pages/firstPage/fastNumber/main",

      "pages/firstPage/randomWords/result/main",
      "pages/firstPage/randomWords/answer/main",
      "pages/firstPage/randomWords/memary/main",
      "pages/firstPage/randomWords/main",

      "pages/firstPage/listenAndRemember/result/main",
      "pages/firstPage/listenAndRemember/answer/main",
      "pages/firstPage/listenAndRemember/listen/main",
      "pages/firstPage/listenAndRemember/main",

      "pages/firstPage/virtualEvents/result/main",
      "pages/firstPage/virtualEvents/anwser/main",
      "pages/firstPage/virtualEvents/memary/main",
      "pages/firstPage/virtualEvents/main",

      "pages/my_custom/ranking/main",
      "pages/my_custom/hongbao/main",
      "pages/my_custom/record/main",
      "pages/my_custom/message/main",
      "pages/my_custom/main",

      "pages/my/record/main",
      "pages/my/message/main",
      "pages/my/ranking/main",
      "pages/my_custom/main",
      "pages/my/main",


      "pages/my_teacher/work/main",
      "pages/my_teacher/notice/main",
      "pages/my_teacher/students/main",
      "pages/my_teacher/message/other/main",
      "pages/my_teacher/message/toRecord/main",
      "pages/my_teacher/message/main",
      "pages/my_teacher/students/comment/main",
      "pages/my_teacher/main",

      "pages/help/main",
      "pages/index/main",
      "pages/login/main",
      "pages/regist/main",
      "pages/record/main"
    ]
  }
}
