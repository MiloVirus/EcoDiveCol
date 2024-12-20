import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUsersStore } from '@/stores/users'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/UserDashboardView.vue'),
      meta: { requiresAuth: true },  
    },
  ],
});


router.beforeEach(async (to, from, next) => {
  const authStore = useUsersStore();
  await authStore.checkAuth();


  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      return next({ name: 'login' });
    }
  }


  if (to.name && ['login', 'register'].includes(to.name as string)) {
    if (authStore.isAuthenticated) {
      return next({ name: 'dashboard' });
    }
  }

  next();
});

export default router;
