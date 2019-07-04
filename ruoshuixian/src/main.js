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
getApp().globalData.games = ["闪现扑克牌", "快速扑克牌", "马拉松扑克牌", "二进制数字", "快速数字", "马拉松数字", "随机词语", "人名头像", "抽象图形", "听记数字", "虚拟事件和日期"];
export default {
  config: {
    pages: [
      'pages/index/main',
      "pages/login/main",
      "pages/regist/main",
      "pages/hongbao/main",
      "pages/my/main",
      "pages/firstPage/main",
      "pages/my/ranking_not/main",
      "pages/my/hongbao/main",
      "pages/my/record/main",
      "pages/my/message/main",
      "pages/help/main",
      "pages/my/ranking/main",
      "pages/my_teacher/main",
      "pages/my_teacher/students/main",
      "pages/my_teacher/work/main",
      "pages/my_teacher/notice/main",
      "pages/my_teacher/message/main",
      "pages/my_teacher/message/toRecord/main",
      "pages/my_teacher/message/other/main",
      "pages/firstPage/virtualEvents/main",
      "pages/firstPage/virtualEvents/memary/main",
      "pages/firstPage/virtualEvents/anwser/main",
    ]
  }
}
