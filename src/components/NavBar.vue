<template>
    <nav class="navbar">
      <div class="logo">eco dive colombia</div>
  
      <button class="hamburger" @click="isOpen = !isOpen">
        <span :class="{ open: isOpen }"></span>
        <span :class="{ open: isOpen }"></span>
        <span :class="{ open: isOpen }"></span>
      </button>
  
    
      <ul :class="['nav-links', { 'show': isOpen }]">
        <li><a href="/">Home</a></li>
        <li v-if="!isAuthenticated"><a href="/login">Login</a></li>
        <li v-if="!isAuthenticated"><a href="/register">Registro</a></li>
        <li v-if="isAuthenticated"><a href="/dashboard">Perfil</a></li>
      </ul>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useUsersStore } from '@/stores/users';
  
  const usersStore = useUsersStore();
  const isAuthenticated = computed(() => usersStore.isAuthenticated);
  
  const isOpen = ref(false);
  </script>
  
  <style scoped>
  
  .navbar {
    font-family: 'Montserrat', serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: blueviolet;
    color: white;
    position: relative;
  }
  
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  
  .nav-links {
    display: flex;
    list-style: none;
  }
  
  .nav-links li {
    margin-left: 1rem;
  }
  
  .nav-links a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .nav-links a:hover {
    color: #00FFFF;
  }
  
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .hamburger span {
    display: block;
    width: 25px;
    height: 3px;
    background: white;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
 
  .hamburger span.open:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  
  .hamburger span.open:nth-child(2) {
    opacity: 0;
  }
  
  .hamburger span.open:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
  

  @media (max-width: 768px) {
    .hamburger {
      display: flex;
    }
  
    .nav-links {
      position: absolute;
      top: 60px;
      right: 0;
      background: blueviolet;
      flex-direction: column;
      width: 100%;
      text-align: center;
      padding: 1rem 0;
      transform: translateY(-200%);
      transition: transform 0.3s ease-in-out;
    }
  
    .nav-links.show {
      transform: translateY(0);
    }
  
    .nav-links li {
      margin: 1rem 0;
    }
  }
  </style>
  