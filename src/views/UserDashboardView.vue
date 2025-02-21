<script setup lang="ts">
import Achievements from '@/components/Achievements.vue';
import PointsCashout from '@/components/PointsCashout.vue';
import Sidebar from '@/components/Sidebar.vue';
import CentrosDeBuceo from '@/components/CentrosDeBuceo.vue';
import { useUsersStore } from '@/stores/users';
import { useRewardsStore } from '@/stores/rewards';
import { useLogrosStore } from '@/stores/logros';
import { useDiveShopsStore } from '@/stores/diveshops';
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';

const userStore = useUsersStore();
const rewardsStore = useRewardsStore();
const logrosStore = useLogrosStore();
const diveshopStore = useDiveShopsStore();

const { users } = storeToRefs(userStore);
const rewards = computed(() => rewardsStore.rewards);
const logros = computed(() => logrosStore.logros);

const currentView = ref<'dashboard' | 'reclamoDePuntos' | 'centrosDeBuceo'>('dashboard');
const isSidebarOpen = ref(false); 

const name = computed(() => users.value?.[0]?.first_name || '');
const lastName = computed(() => users.value?.[0]?.last_name || '');
const email = computed(() => users.value?.[0]?.email || '');
const puntos = computed(() => users.value?.[0]?.curr_puntos || '');

onMounted(async () => {
  await userStore.getProfile();
  await rewardsStore.getRewards();
  await logrosStore.getLogrosCompletados();
  await diveshopStore.getUserDiveshops();
});

const updateView = (view: 'dashboard' | 'reclamoDePuntos' | 'centrosDeBuceo') => {
  currentView.value = view;
  isSidebarOpen.value = false; // Cierra el menú después de seleccionar una vista
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const viewComponents = {
  dashboard: Achievements,
  reclamoDePuntos: PointsCashout,
  centrosDeBuceo: CentrosDeBuceo
};
</script>

<template>
  <div class="dashboard-container">
    <button class="hamburger-btn" @click="toggleSidebar">
      ☰
    </button>

    <Sidebar :name="name" :lastName="lastName" :email="email" @updateView="updateView" :class="{ 'sidebar': isSidebarOpen, 'sidebar-hidden': !isSidebarOpen }" />

    <main class="main-content">
      <header class="header">
        <h1 class="welcome-message">Bienvenido, {{ name }}</h1>
        <div class="puntosContainer">
          <h1>{{ puntos }}</h1>
          <p>Puntos</p>
        </div>
        
      </header>
      <section class="tasks">
        <h2 class="section-title">Tasks for Today</h2>
        <component :is="viewComponents[currentView]" :rewards="rewards" :logros="logros" />
      </section>
    </main>
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  font-family: Arial, sans-serif;
  height: 100vh;
  background-color: #1a1a1a;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 20%;
}
.puntosContainer
{
  text-align: center;
  background-color: #2c2c2c;
  padding: 5px 20px 5px 20px;
  border-radius: 10px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
h1{
  margin:0;
}

.welcome-message {
  font-size: 24px;
  font-weight: bold;
}
.sidebar {
  width: 20%;
  background-color: #2c2c2c;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100vh;
  transition: transform 0.3s;

}

.hamburger-btn {
  display: none;
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
  z-index: 1000;
}


@media (max-width: 768px) {
  .hamburger-btn {
    display: block;
  }
  .sidebar {
  width: 100%;
  background-color: #2c2c2c;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 100vh;
  transition: transform 0.3s;
  }
  .header{
    justify-content: space-around;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .main-content {
    margin-left: 0;
    width: 100%;
  }

  .sidebar-hidden {
    display: none;
    width: 100%;
  }
}
</style>
