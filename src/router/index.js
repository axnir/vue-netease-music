import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/findmusic',
    children: [
      { path: '/findmusic', component: () => import(/* webpackChunkName: "find" */ '../components/FindMusic.vue') },
      { path: '/songslist', component: () => import(/* webpackChunkName: "find" */ '../components/SongsList.vue') },
      { path: '/latestmusic', component: () => import(/* webpackChunkName: "find" */ '../components/LatestMusic.vue') },
      { path: '/latestmv', component: () => import(/* webpackChunkName: "find" */ '../components/LatestMV.vue') }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  // 路由模式，可选 history hash(默认)
  mode: 'hash',
  routes
})

export default router
