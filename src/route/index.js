import { createRouter, createWebHistory } from 'vue-router'
const map = () => import('../components/map/index.vue')
const lmap = () => import('../components/map/lmap.vue')
const routes = [
  {
    path: '/',
    component: map
  },
  {
    path: '/lmap',
    component: lmap
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
