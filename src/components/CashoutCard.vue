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

const rewardsStore = useRewardsStore();

const cashoutReward = async (reward_id: string) => {
  await rewardsStore.claimReward(reward_id);
};
</script>

<template>
  <div class="cardContainer">
    <div class="cardContent" :class="{ completed: completado }">
      <div class="cardText">
        <h3>{{ name }}</h3>
        <p>{{ descripcion }}</p>
      </div>
      <div class="cardPoints">
        <h3>{{ puntos }}</h3>
        <button v-if="!completado" class="cashoutButton" @click="cashoutReward(reward_id)">Reclamar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardContainer {
  padding: 10px;
  border-radius: 4px;
  background-color: #212121;
  text-align: left;
  margin-bottom: 10px;
}

.cardContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cardContent.completed {
  color:rgb(75, 75, 75) ;
  text-decoration: line-through;
}

.cardText {
  flex: 1;
  margin-right: 10px;
}

.cardPoints {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.cashoutButton {
  background-color: #6200ff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.cashoutButton:hover {
  background-color: #4a00c0;
}
</style>