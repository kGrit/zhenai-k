import Vue from 'vue'
import VueRouter from 'vue-router'
import premium from 'components/premium/premium.vue'
import descDetail from 'components/descDetail/descDetail.vue'
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
  }
]

const router = new VueRouter({
  routes
})

export default router
