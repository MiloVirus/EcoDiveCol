<script setup lang="ts">
import { useUsersStore } from '../stores/users';
import router from '@/router';
import { ref } from 'vue';

const store = useUsersStore();
const emit = defineEmits(['updateView']);
const activeLink = ref('dashboard'); // Variable reactiva para el enlace activo

const { name, lastName } = defineProps({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const logOut = async () => {
  await store.logOut();
  router.push({ name: 'login' });
};

const updateView = (view: string) => {
  activeLink.value = view;
  if (view === 'home') {
    router.push({ name: 'home' });
  } else {
    emit('updateView', view);
  }
};
</script>

<template>
  <aside class="sidebar">
    <div class="user-info">
      <img src="https://via.placeholder.com/50" alt="User" class="user-avatar" />
      <div>
        <h2 class="user-name">{{ name }}</h2>
      </div>
    </div>
    <nav class="menu">
      <a href="#" 
         class="menu-item" 
         :class="{ active: activeLink === 'dashboard' }" 
         @click.prevent="updateView('dashboard')">Dashboard</a>
      <a href="#" 
         class="menu-item" 
         :class="{ active: activeLink === 'misViajes' }" 
         @click.prevent="updateView('misViajes')">Mis Viajes</a>
      <a href="#" 
         class="menu-item" 
         :class="{ active: activeLink === 'reclamoDePuntos' }" 
         @click.prevent="updateView('reclamoDePuntos')">Reclamo de puntos</a>
         <a href="#" 
         class="menu-item" 
         :class="{ active: activeLink === 'centrosDeBuceo' }" 
         @click.prevent="updateView('centrosDeBuceo')">Centros de Buceo</a>
         <a href="#" 
         class="menu-item" 
         :class="{ active: activeLink === 'home' }" 
         @click.prevent="updateView('home')">Home</a>
    </nav>
    <button @click="logOut" class="logout-button">Log out</button>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
    width: 20%;
    background-color: #2c2c2c;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    position: fixed;
    height: 100vh;
}

.user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}

.user-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.menu {
    display: flex;
    flex-direction: column;
}

.menu-item {
    text-decoration: none;
    color: #555;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.menu-item:hover,
.menu-item.active {
    background-color: #eaeaea;
}

.logout-button {
    background-color: blueviolet;
    border-radius: 10%;
    border: none;
    padding: 10px;
    color: white;
    cursor: pointer;
}

.logout-button:hover {
    background-color: rgb(91, 18, 160);   
}
</style>