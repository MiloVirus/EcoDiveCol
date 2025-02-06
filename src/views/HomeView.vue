<script setup>
import { ref } from 'vue';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
const searchQuery = ref('');
const searchResult = ref('');

const handleSearch = () => {
  if (searchQuery.value.trim() !== '') {
    searchResult.value = `Searching for diving centers related to: ${searchQuery.value}`;

  } else {
    searchResult.value = '';
  }
};
</script>

<template>
  <NavBar />
  <div class="diving-search">
    <h1>Encuentra un centro de buceo sostenible</h1>
    <div class="search-container">

      <input type="text" v-model="searchQuery" @input="handleSearch" placeholder="Search for diving centers...">
      <button @click="handleSearch">Search</button>
    </div>
    <p v-if="searchResult" class="search-result">{{ searchResult }}</p>
  </div>
  <Footer />
</template>


<style>
.diving-search {
  font-family: 'Montserrat', serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1682687982501-1e58ab814714');
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
  width: 80%;
  max-width: 600px;

}

input {
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
  margin-top: 20px;
  font-size: 1.2rem;
  text-align: center;
}
</style>
