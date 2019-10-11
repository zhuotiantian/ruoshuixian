import Vue from 'vue'
import App from './App'
import http from "./untils/request"
import Store from "./store/index"
Vue.config.productionTip = false
Vue.config._mpTrace = true
App.mpType = 'app'
const app = new Vue(App);
app.$mount();
let pixelRatio = 0
wx.getSystemInfo({
    success: function(res) {
        pixelRatio = Math.floor(res.pixelRatio)
    },
    fail: function() {
        pixelRatio = 0
    }
});
Vue.prototype.$store = Store;
Vue.prototype.$http = http;
let _store = Vue.prototype.$store;
Vue.prototype.$toGame = (id, url, fn) => {
    _store.commit("setGameId", id);
    _store.commit("setLevel", "primary");
    let userInfo = _store.state.userInfo;
    let token = userInfo.token;
    http.get({
        url: "/api/wxapp.game/getGame",
        data: {
            game_id: id
        },
        header: {
            token: token
        }
    }).then(result => {
        _store.commit("setRule", result.data);
        if (fn) {
            fn();
        } else {
            wx.redirectTo({
                url
            })
        }
    });
}
export default {
    config: {
        "pages": [
            "pages/record/details/main",
            "pages/rePassword/main",
            "pages/marathonPocker1/memary/main",
            "pages/marathonPocker1/main",
            "pages/marathonPocker1/recall/main",
            "pages/marathonPocker1/ready/main",
            "pages/marathonPocker1/result/main",
            "pages/marathonPocker1/answer/main",
            "pages/firstPage/main",
            "pages/regist/main",
            "pages/flashPocker/main",
            "pages/flashPocker/answer/main",
            "pages/flashPocker/recall/main",
            "pages/flashPocker/memary/main",
            "pages/flashPocker/result/main",
            "pages/my/hongbao/main",
            "pages/my/main",
            "pages/my/record/main",
            "pages/my/message/main",
            "pages/my/ranking/main",
            "pages/binaryNumber/main",
            "pages/binaryNumber/answer/main",
            "pages/binaryNumber/memary/main",
            "pages/binaryNumber/result/main",
            "pages/fastPocker/main",
            "pages/fastPocker/result/main",
            "pages/fastPocker/answer/main",
            "pages/fastPocker/ready/main",
            "pages/fastPocker/memary/main",
            "pages/fastPocker/recall/main",
            "pages/indexPage/main",
            "pages/randomWords/main",
            "pages/randomWords/result/main",
            "pages/randomWords/answer/main",
            "pages/randomWords/memary/main",
            "pages/peoplePic/main",
            "pages/peoplePic/result/main",
            "pages/peoplePic/memary/main",
            "pages/peoplePic/answer/main",
            "pages/marathonNumber/main",
            "pages/marathonNumber/result/main",
            "pages/marathonNumber/answer/main",
            "pages/marathonNumber/memary/main",
            "pages/marathonPocker/recall/main",
            "pages/marathonPocker/memary/main",
            "pages/marathonPocker/ready/main",
            "pages/marathonPocker/main",
            "pages/marathonPocker/result/main",
            "pages/marathonPocker/answer/main",
            "pages/listenAndRemember/answer/main",
            "pages/listenAndRemember/result/main",
            "pages/listenAndRemember/main",
            "pages/listenAndRemember/listen/main",
            "pages/abstractPic/answer/main",
            "pages/abstractPic/memary/main",
            "pages/abstractPic/result/main",
            "pages/abstractPic/main",
            "pages/fastNumber/answer/main",
            "pages/fastNumber/main",
            "pages/fastNumber/result/main",
            "pages/fastNumber/memary/main",
            "pages/help/main",
            "pages/virtualEvents/memary/main",
            "pages/virtualEvents/main",
            "pages/virtualEvents/result/main",
            "pages/virtualEvents/answer/main",
            "pages/index/main",
            "pages/record/main",
            "pages/hongbao/main"
        ]
    }
}