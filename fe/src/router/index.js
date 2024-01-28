import { createRouter, createWebHistory } from 'vue-router'
// import VueBodyClass from 'vue-body-class'

import Welcome from '../components/Welcome.vue'


const all_routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: all_routes
})

// const vueBodyClass = new VueBodyClass(all_routes)
// router.beforeEach((to, from, next) => {
//   vueBodyClass.guard(to, next)
// })
