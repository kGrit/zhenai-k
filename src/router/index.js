import Vue from 'vue'
import VueRouter from 'vue-router'
import premium from 'components/premium/premium.vue'
import descDetail from 'components/descDetail/descDetail.vue'
import healthyInfo from 'components/healthyInfo/healthyInfo'
import Text from 'components/healthyInfo/Text'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'premium',
    component: premium
  },
  {
    path: '/descDetail',
    component: descDetail
  },
  {
    path: '/healthyInfo',
    component: healthyInfo
  },
  {
    path: '/text',
    component: Text
  }

]

const router = new VueRouter({
  routes
})

export default router
