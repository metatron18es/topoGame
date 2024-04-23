import { createRouter, createWebHistory } from 'vue-router'
import TopoHomeView from '../views/TopoHomeView.vue'
import { useConfigurationStore } from '@/stores/configuration'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TopoHomeView
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/TopoGameView.vue'),
      beforeEnter: (to, from, next) => {
        if (useConfigurationStore().name) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
