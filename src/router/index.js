import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/Auth/RegisterView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import { useAuthStore } from '@/stores/auth.js'
import BookAppointmentView from '@/views/BookAppointmentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { guest: true}
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
       meta: { guest: true}
    },
    {
      path: '/book',
      name: 'book',
      component: BookAppointmentView,
       meta: { auth: true}
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()
  await authStore.getUser()
  if(authStore.user && to.meta.guest){
    return { name: "home"}
  }
})
export default router
