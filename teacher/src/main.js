import Vue from 'vue'
import App from './App'
import http from "./untils/request"
Vue.config.productionTip = false
Vue.config._mpTrace = true
App.mpType = 'app'
const app = new Vue(App);
app.$mount();
let pixelRatio = 0
wx.getSystemInfo({
    success: function (res) {
        pixelRatio = Math.floor(res.pixelRatio)
    },
    fail: function () {
        pixelRatio = 0
    }
});
getApp().globalData.ratio = pixelRatio;
Vue.prototype.globalData = getApp().globalData;
Vue.prototype.$http = http;
Vue.prototype.$getStorage = (param) => {
    return new Promise((resolve, reject) => {
        wx.getStorage({
            key: param,
            success: (res) => {
                resolve(res.data);
            },
            fail: (res) => {

                reject(res);
            }
        })
    })
};
Vue.prototype.$setStorage = (key, data) => {
    return new Promise((resolve, reject) => {
        wx.setStorage({
            key: key,
            data: data,
            success: (res) => {
                resolve(res.data);
            },
            fail: (res) => {
                reject(null);
            }
        });
    })
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