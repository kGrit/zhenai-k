import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/reset.css'
import '@/styles/index.less'
import '@/styles/judgeBrowser.js'

import { Popup, cell, Area, Icon, Cell, CellGroup, DatetimePicker } from 'vant'

Vue.config.productionTip = false
Vue.use(Popup, cell, Icon).use(Area).use(Cell).use(CellGroup).use(DatetimePicker)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
