<script setup lang="ts">
import { useLogrosStore } from '@/stores/logros';
import { onMounted, ref } from 'vue';
import AchievementsCard from './AchievementsCard.vue';

const logrosStore = useLogrosStore();
const logrosLol = ref();  

onMounted(async () => {
    await logrosStore.getAllLogros(); 
    logrosLol.value = logrosStore.logros; 
});
</script>

<template>
    <div class="container" v-for="logro in logrosLol">
        <AchievementsCard
        :name="logro.name"
        :descripcion="logro.descripcion"
        :puntos="logro.puntos"
        :imagen="logro.imagen"/>
    </div>
</template>

<style scoped>
.container
{
    padding: 5px;
}
</style>