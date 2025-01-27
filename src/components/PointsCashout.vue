<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { onMounted, ref } from 'vue';
import CashoutCard from './CashoutCard.vue';

const usersStore = useUsersStore();
const userPoints = ref(0);

onMounted(async () => {
  await usersStore.fetchUser();
  userPoints.value = usersStore.users[0]?.curr_puntos || 0;
});
</script>

<template>
  <div class="container">
    <h2>Possible Cashout</h2>
    <CashoutCard :points="userPoints" />
  </div>
</template>

<style scoped>
.container {
  padding: 5px;
}
</style>