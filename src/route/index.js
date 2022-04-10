import { createRouter, createWebHistory } from 'vue-router'
const map = () => import('../components/map/index.vue')
const routes = [
  {
    path: '/',
    component: map
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
