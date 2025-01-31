<script setup lang="ts">
import Achievements from '@/components/Achievements.vue';
import PointsCashout from '@/components/PointsCashout.vue';
import Sidebar from '@/components/Sidebar.vue';
import { useUsersStore } from '@/stores/users';
import { useRewardsStore } from '@/stores/rewards';
import { useLogrosStore } from '@/stores/logros';
import { useDiveShopsStore } from '@/stores/diveshops';
import { ref, onMounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';

const userStore = useUsersStore();
const rewardsStore = useRewardsStore();
const logrosStore = useLogrosStore();
const diveshopStore = useDiveShopsStore();

// Use storeToRefs for reactive store properties
const { users } = storeToRefs(userStore);

const rewards = computed(() => rewardsStore.rewards);
const logros = computed(() => logrosStore.logros);

const currentView = ref<'dashboard' | 'misViajes' | 'reclamoDePuntos'>('dashboard');

// Update computed properties to use the reactive users reference
const name = computed(() => users.value[0]?.first_name || '');
const lastName = computed(() => users.value[0]?.last_name || '');
const email = computed(() => users.value[0]?.email || '');
const puntos = computed(() => users.value[0]?.curr_puntos || '');

// Debug watcher
watch(users, (newUsers) => {
  console.log('Users updated:', newUsers[0]?.curr_puntos);
}, { deep: true });

onMounted(async () => {
  await userStore.getProfile();
  await rewardsStore.getRewards();
  await logrosStore.getLogrosCompletados();
  await diveshopStore.getDiveShops();
});

const updateView = (view: 'dashboard' | 'misViajes' | 'reclamoDePuntos') => {
  currentView.value = view;
};

const viewComponents = {
  dashboard: Achievements,
  misViajes: Achievements, 
  reclamoDePuntos: PointsCashout,
};
</script>

<template>
  <div class="dashboard-container">
    <Sidebar :name="name" :lastName="lastName" :email="email" @updateView="updateView" />

    <main class="main-content">
      <header class="header">
        <h1 class="welcome-message">Hello, {{ name }}</h1>
        <h1>{{ puntos }}</h1>
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
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.welcome-message {
    font-size: 24px;
    font-weight: bold;
}

.add-project-btn {
    background-color: #5a67d8;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.add-project-btn:hover {
    background-color: #4c51bf;
}


.projects {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.project-card {
    background-color: #363636;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    flex: 1;
}

.project-card h2 {
    margin-bottom: 10px;
    font-size: 18px;
}

.progress-bar {
    background-color: #eaeaea;
    height: 8px;
    border-radius: 5px;
    overflow: hidden;
}

.progress {
    height: 8px;
    border-radius: 5px;
}

.purple-progress {
    background-color: #6b46c1;
}

.blue-progress {
    background-color: #3182ce;
}

.orange-progress {
    background-color: #dd6b20;
}

.tasks {
    margin-bottom: 20px;
}

.section-title {
    font-size: 20px;
    margin-bottom: 10px;
}

.task-list {
    list-style: none;
    padding: 0;
}

.task-item {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.task-name {
    font-size: 16px;
}
</style>