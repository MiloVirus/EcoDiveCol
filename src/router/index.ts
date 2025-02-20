import { createRouter, createWebHistory } from 'vue-router';
import { useUsersStore } from '@/stores/users';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import UserDashboardView from '@/views/UserDashboardView.vue';
import DiveShop from '@/views/DiveShop.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/dashboard', name: 'dashboard', component: UserDashboardView, meta: { requiresAuth: true } },
  { path: '/diveshop/:id', name: 'DiveShop', component: DiveShop, props: true },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useUsersStore();
  await authStore.checkAuth();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      return next({ name: 'login' });
    }
  }

  if (to.name && ['login', 'register',].includes(to.name as string)) {
    if (authStore.isAuthenticated) {
      return next({ name: 'dashboard' });
    }
  }

  next();
});

export default router;
