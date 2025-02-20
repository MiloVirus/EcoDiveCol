<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import { useDiveShopsStore } from '@/stores/diveshops';
import DiveshopCard from '@/components/DiveshopCard.vue';


const searchQuery = ref('');
const selectedCity = ref('');
const diveShopsStore = useDiveShopsStore();

const cities = ref(['Cali', 'Bogotá', 'Medellín']); 

onMounted(async () => {
  await diveShopsStore.getDiveShops();
});

const diveShops = computed(() => diveShopsStore.diveshops || []);

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

<template>
  <div class="home-container">
    <NavBar />
    <div class="diving-search">
      <h1>Encuentra un centro de buceo sostenible</h1>
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Busca centros de buceo...">
        <select v-model="selectedCity">
          <option value="">Escoge una ciudad</option>
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
      </div>
      <div class="search-result">
          <div v-for="diveshop in filteredDiveshops" :key="diveshop.diveshop_id" class="diveshop-card">
            <DiveshopCard 
            :id="diveshop.diveshop_id"
            :name="diveshop.name" 
            :city="diveshop.city" 
            :image="diveshop.image" />
          </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style>
.home-container
{
  
  height: 100vh;
  
}
.diving-search {
  font-family: 'Montserrat', serif;
  display: flex;
  padding-top:40px;
  padding-bottom: 40px;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: 
        linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)), 
        url('https://images.unsplash.com/photo-1682687982501-1e58ab814714');
  background-size: cover;
  background-position: center;
  color: white;
 
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.search-container {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  max-width: 600px;
}
.diveshop-card
{
  margin: 10px;
}

input, select {
  flex-grow: 1;
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 4px 0 0 4px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.search-result {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 70%;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
  font-size: 1.2rem;
  text-align: center;
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  input,
  select {
    width: 100%;
  }
  h1{
    padding: 5px;
    text-align: center;
    font-size: 1.5rem;
  }
}
</style>
