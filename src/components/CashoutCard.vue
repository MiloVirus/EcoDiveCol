<script setup lang="ts">
import { useRewardsStore } from '../stores/rewards';
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
  completado: {
    type: Boolean,
    required: true,
  },
});

const rewardsStore = useRewardsStore()

const cashoutReward = async (reward_id: string) => {  

    await rewardsStore.claimReward(reward_id);

}
</script>

<template> 
<div class="cardContainer">
    <div class="cardContainerFalse" v-if="!completado">
      <h3>{{ name }}</h3>
      <p>{{ descripcion }}</p>
      <h3>{{ puntos }}</h3>
      <button class="cashoutButton" @click="cashoutReward(reward_id)">Cashout</button>
    </div>
    <div class="cardContainerTrue" v-else>
      <h3>{{ name }}</h3>
      <p>{{ descripcion }}</p>
      <h3>{{ puntos }}</h3> 
    </div>
  </div>
</template>

<style scoped>
.cardContainer {
  padding: 10px;
  border-radius: 4px;
  background-color: #212121;
  text-align: center;
}

.cardContainerFalse {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.cardContainerTrue {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  opacity: 0.5;
  text-decoration: line-through;
}
.cashoutButton {
  background-color: #6200ff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
.cashoutButton:hover {
  background-color: #4a00c0;
}
</style>