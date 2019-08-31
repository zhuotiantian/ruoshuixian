import Vue from 'vue'
import App from './App'
import http from "./untils/request"


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
Vue.prototype.globalData = getApp().globalData;
Vue.prototype.$http = http;
Vue.prototype.$getParams = (param) => {
    return wx.getStorageSync(param);
};
Vue.prototype.$setStorage = (key, data, fn) => {
    wx.setStorage({
        key: key,
        data: data,
        success: () => {
            fn && fn();
        }
    });
}
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