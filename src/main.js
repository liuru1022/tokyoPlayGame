import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/font/iconfont.css'

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import axios from 'axios'
axios.defaults.baseURL='http://localhost:3000/'
Vue.prototype.axios=axios;


import moment from 'moment'
import 'moment/locale/zh-cn'
Vue.prototype.moment = moment;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
