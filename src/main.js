import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

if(localStorage.getItem('userInfo') !== undefined) {
  Vue.prototype.$userInfo = JSON.parse(localStorage.getItem('userInfo'));
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
