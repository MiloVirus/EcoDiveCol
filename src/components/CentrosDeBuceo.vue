<template>
    <div class="head-container">
        <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Busca centros de buceo...">
        <select v-model="selectedCity">
          <option value="">Escoge una ciudad</option>
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
      </div>
    </div>
   
    <div class="cards-container">
        <div v-for="diveshop in filteredDiveshops" :key="diveshop.diveshop_id">
            <DiveshopCard :name="diveshop.name" :city="diveshop.city" :favorite="diveshop.favorite" :userAuth="true" :id="diveshop.diveshop_id" :image="diveshop.image"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDiveShopsStore } from '@/stores/diveshops';
import DiveshopCard from '@/components/DiveshopCard.vue';
import {computed, ref} from 'vue'

const diveShopsStore = useDiveShopsStore();
const searchQuery = ref('');
const selectedCity = ref('');
const cities = ref(['Cali', 'Bogotá', 'Medellín', 'Cartagena']); 

const diveShops = computed(() => diveShopsStore.userDiveshops || []);

const filteredDiveshops = computed(() => {
  let filtered = diveShops.value;

  if (searchQuery.value) {
    filtered = filtered.filter((diveshop) => {
      return diveshop.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
  }

  if (selectedCity.value) {
    filtered = filtered.filter((diveshop) => {
      return diveshop.city.toLowerCase().includes(selectedCity.value.toLowerCase());
    });
  }

  return filtered;
});

</script>

<style scoped>
.cards-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
}
.head-container
{
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 20px;
}

.search-container {
  display: flex;
  width: 80%;
  max-width: 600px;
}
</style>