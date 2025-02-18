<template>
  <div class="dive-shop-container">
    <NavBar />
    <div class="dive-shop-content">
      <h1>{{ diveShop.name }}</h1>
      <img :src="diveShop.image" alt="Diveshop Image" class="dive-shop-image" />
      <p><strong>City:</strong> {{ diveShop.city }}</p>
      <p><strong>Description:</strong> {{ diveShop.description }}</p>
      <p><strong>Phone:</strong> {{ diveShop.phone }}</p>
      <p><strong>Email:</strong> {{ diveShop.email }}</p>
      <p><strong>Website:</strong> <a :href="diveShop.website" target="_blank">{{ diveShop.website }}</a></p>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDiveShopsStore } from '@/stores/diveshops';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

const route = useRoute();
const diveShopsStore = useDiveShopsStore();
const diveShop = ref({
  name: '',
  city: '',
  description: '',
  phone: '',
  email: '',
  website: '',
  image: '',
  favorite: false,
});


onMounted(async () => {
  const diveShopId = route.params.id;
  await diveShopsStore.getDiveShops();
  const foundDiveShop = diveShopsStore.diveshops.find(shop => shop.diveshop_id === diveShopId);
  if (foundDiveShop) {
    diveShop.value = foundDiveShop;
  }
});
</script>

<style scoped>
.dive-shop-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
  color: #383838
}

.dive-shop-content {
  flex: 1;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.dive-shop-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

p {
  margin: 10px 0;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>