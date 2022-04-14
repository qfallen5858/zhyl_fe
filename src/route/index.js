import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
const map = () => import('../components/map/index.vue')
const lmap = () => import('../components/map/lmap.vue')
const login = () => import('../components/login/login.vue')
const routes = [
  {
    path: '/',
    component: lmap,
    name: `default`
  },
  {
    path: '/login',
    component: login,
    name: 'login'
  },
  {
    path: '/lmap',
    component: lmap,
    name: 'lmap'
  },
  {
    path: '/',
    component: map,
    name: 'map'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  let isLogin = store.getters.isLogin
  if (to.name !== 'login' && !isLogin) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
