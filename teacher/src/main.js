import Vue from 'vue'
import App from './App'
import http from "./untils/request"
import Store from "./store/index"

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
Vue.prototype.$store = Store;
Vue.prototype.$http = http;
let pixelRatio = 0
wx.getSystemInfo({
    success: function(res) {
        pixelRatio = res.pixelRatio
    },
    fail: function() {
        pixelRatio = 0
    }
});