import {createRouter, createWebHashHistory, Router, RouteRecordRaw} from 'vue-router'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/axios',
    name: 'Axios',
    component: () => import('@/views/Axios.vue') // Axios
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
