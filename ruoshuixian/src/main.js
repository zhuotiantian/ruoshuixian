import Vue from 'vue'
import App from './App'
import http from "./untils/request"
Vue.config.productionTip = false
Vue.config._mpTrace = true
App.mpType = 'app'
const app = new Vue(App);
app.$mount();
Vue.prototype.globalData = getApp().globalData;
Vue.prototype.$http = http;
wx.login({
    success: function(res) {
        Vue.prototype.wxcode = res.code;
    }
});
let pixelRatio = 0
wx.getSystemInfo({
    success: function(res) {
        pixelRatio = res.pixelRatio
    },
    fail: function() {
        pixelRatio = 0
    }
});
getApp().globalData.token = wx.getStorageSync("userInfo").token;
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
    name: "虚拟事件和日期",
    url: "../virtualEvents/main"
}, {
    name: "听记数字",
    url: "../listenAndRemember/main"
}];

export default {
    config: {
        "pages": [
            "pages/firstPage/main",
            "pages/help/main",
            "pages/index/main",
            "pages/login/main",
            "pages/regist/main"
        ],
        "subPackages": [{
                "root": "pages/hongbao/",
                "pages": [
                    "main",
                    "redPocketList/main"
                ]
            }, {
                "root": "pages/record/",
                "pages": [
                    "main"
                ]
            }, {
                "root": "pages/my/",
                "pages": [
                    "main",
                    "hongbao/main",
                    "message/main",
                    "ranking/main",
                    "record/main"
                ]
            }, {
                "root": "pages/my_custom/",
                "pages": [
                    "main",
                    "hongbao/main",
                    "message/main",
                    "ranking/main",
                    "record/main"
                ]
            }, {
                "root": "pages/my_teacher/",
                "pages": [
                    "main",
                    "notice/main",
                    "message/main",
                    "message/other/main",
                    "message/toRecord/main",
                    "students/main",
                    "students/comment/main",
                    "work/main"
                ]
            }, {
                "root": "pages/flashPocker/",
                "pages": [
                    "main",
                    "result/main",
                    "answer/main",
                    "recall/main",
                    "memary/main"
                ]
            }, {
                "root": "pages/marathonPocker/",
                "pages": [
                    "main",
                    "result/main",
                    "answer/main",
                    "recall/main",
                    "memary/main"
                ]
            }, {
                "root": "pages/fastPocker/",
                "pages": [
                    "main",
                    "result/main",
                    "answer/main",
                    "recall/main",
                    "memary/main"
                ]
            }, {
                "root": "pages/peoplePic/",
                "pages": [
                    "main",
                    "result/main",
                    "answer/main",
                    "memary/main"
                ]
            }, {
                "root": "pages/abstractPic/",
                "pages": [
                    "main",
                    "result/main",
                    "answer/main",
                    "memary/main"
                ]
            },
            {
                "root": "pages/binaryNumber/",
                "pages": [
                    "main",
                    "result/main",
                    "answer/main",
                    "memary/main"
                ]
            },
            {
                "root": "pages/marathonNumber/",
                "pages": [
                    "main",
                    "result/main",
                    "answer/main",
                    "memary/main"
                ]
            },
            {
                "root": "pages/fastNumber/",
                "pages": [
                    "main",
                    "result/main",
                    "answer/main",
                    "memary/main"
                ]
            },
            {
                "root": "pages/randomWords/",
                "pages": [
                    "main",
                    "result/main",
                    "answer/main",
                    "memary/main"
                ]
            },
            {
                "root": "pages/listenAndRemember/",
                "pages": [
                    "main",
                    "result/main",
                    "answer/main",
                    "listen/main"
                ]
            },
            {
                "root": "pages/virtualEvents/",
                "pages": [
                    "main",
                    "result/main",
                    "anwser/main",
                    "memary/main"
                ]
            }, {
                "root": "pages/ranking/",
                "pages": [
                    "main"
                ]
            }
        ]
    }
}