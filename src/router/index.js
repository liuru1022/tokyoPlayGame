import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this,location).catch(err=>err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/videonews',
    name: 'Videonews',
    component: () => import(/* webpackChunkName: "videonews" */ '../views/Videonews.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import(/* webpackChunkName: "info" */ '../views/Info.vue')
  },
  {
    path: '/medallist',
    name: 'MedalList',
    component: () => import(/* webpackChunkName: "medallist" */ '../views/MedalList.vue')
  },
  {
    path: '/cngoldlist',
    name: 'CNgoldList',
    component: () => import(/* webpackChunkName: "cngoldlist" */ '../views/CNgoldList.vue')
  },
  {
    path: '/imgnews',
    name: 'Imgnews',
    component: () => import(/* webpackChunkName: "imgnews" */ '../views/Imgnews.vue')
  },
  {
    path: '/like',
    name: 'Like',
    component: () => import(/* webpackChunkName: "like" */ '../views/Like.vue')
  },
  {
    path: '/imgdetail',
    name: 'ImgDetail',
    component: () => import(/* webpackChunkName: "imgdetail" */ '../views/ImgDetail.vue')
  },
  {
    path: '/infodetail',
    name: 'InfoDetail',
    component: () => import(/* webpackChunkName: "infodetail" */ '../views/InfoDetail.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
