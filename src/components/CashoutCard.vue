<script setup lang="ts">

defineProps({
  reward_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  puntos: {
    type: Number,
    required: true,
  },
  diveshop_id: {
    type: String,
    required: true,
  },
});

</script>

<template>
  <div class="cardContainer">
    <h3>{{ name }}</h3>
    <p>{{ descripcion }}</p>
    <h3>{{ puntos }}</h3>
  </div>
</template>

<style scoped>
.cardContainer {
  padding: 10px;
  border-radius: 4px;
  background-color: #212121;
  text-align: center;
}
</style>