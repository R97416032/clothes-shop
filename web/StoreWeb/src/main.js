import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import './assets/css/global.css'

import router from './router/index.js'

// import axios from 'axios'
// // 配置请求路径
// axios.defaults.baseURL="http://127.0.0.1:8888/"
// Vue.prototype.$http=axios


Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,	
  render: h => h(App),
}).$mount('#app')
