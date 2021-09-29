import Vue from 'vue'
import VueRouter from 'vue-router'
import List1 from '../views/List1.vue'
import List2 from '../views/List2.vue'
import List3 from '../views/List3.vue'
import List4 from '../views/List4.vue'
import Detail from '../views/Detail.vue'

Vue.use(VueRouter)

// 导航路由名称
const navRoutes = [
  'list1',
  'list2',
  'list3',
  'list4'
]

// 是否为导航路由
export function isNavRoute (routeName) {
  return navRoutes.indexOf(routeName) > -1
}

export const routes = [
  {
    path: '/',
    redirect: '/list1'
  },
  {
    path: '/list1',
    name: 'list1',
    component: List1,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/list2',
    name: 'list2',
    component: List2,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/list3',
    name: 'list3',
    component: List3,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/list4',
    name: 'list4',
    component: List4,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail,
    meta: {
      keepAlive: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
