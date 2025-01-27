<script setup lang="ts">
import { defineProps } from 'vue';
import { computed } from 'vue';

const props = defineProps({
  points: {
    type: Number,
    required: true,
  },
});

const cashoutValue = computed(() => {
  // Assuming 1 point = $0.01 for cashout value
  return (props.points * 0.01).toFixed(2);
});
</script>

<template>
  <div class="cardContainer">
    <h3>Your Points: {{ points }}</h3>
    <p>Possible Cashout Value: ${{ cashoutValue }}</p>
  </div>
</template>

<style scoped>
.cardContainer {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  text-align: center;
}
</style>