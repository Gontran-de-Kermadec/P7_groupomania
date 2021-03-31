import Vue from 'vue'
import VueRouter from 'vue-router'
import Connection from '../views/Connection.vue'
import Signup from '../components/Signup.vue'
import Profil from '../components/Profil.vue'
import Post from '../components/Post.vue'
import Vote from '../components/Vote.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Connection',
    component: Connection
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post
  },
  {
    path: '/vote',
    name: 'Vote',
    component: Vote
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
