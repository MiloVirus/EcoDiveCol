<script setup lang="ts">
import CashoutCard from './CashoutCard.vue';

interface Reward {
  reward_id: string;
  name: string;
  descripcion: string;
  puntos: 6000;
  diveshop_id: string; 
}


defineProps<{
  rewards: Reward[];
}>();
</script>

<template>
  <div class="container" v-for="reward in rewards" :key="reward.reward_id">
    <CashoutCard 
    :reward_id="reward.reward_id"
    :name="reward.name"
    :descripcion="reward.descripcion"
    :puntos="reward.puntos"
    :diveshop_id="reward.diveshop_id" />
  </div>
</template>

<style scoped>
.container {
  padding: 5px;
}
</style>