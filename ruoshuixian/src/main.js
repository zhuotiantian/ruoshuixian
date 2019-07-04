import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
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
      "pages/firstPage/virtualEvents/main"
    ]
  }
}
