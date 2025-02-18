<template>
    <div>
        Centros de Buceo
    </div>
    <div class="cards-container">
        <div v-for="diveshop in diveshops.userDiveshops" :key="diveshop.diveshop_id">
            <DiveshopCard :name="diveshop.name" :city="diveshop.city" :favorite="diveshop.favorite" :userAuth="true" :id="diveshop.diveshop_id"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDiveShopsStore } from '@/stores/diveshops';
import DiveshopCard from '@/components/DiveshopCard.vue';

const diveshops = useDiveShopsStore();
</script>

<style scoped>
.cards-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>