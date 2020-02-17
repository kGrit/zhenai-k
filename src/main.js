import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/reset.css'
import '@/styles/index.less'
import '@/styles/judgeBrowser.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
