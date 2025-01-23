<script setup lang="ts">
import { useLogrosStore } from '@/stores/logros';
import { onMounted, ref } from 'vue';
import AchievementsCard from './AchievementsCard.vue';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import Swal from 'sweetalert2';
import { useUsersStore } from '@/stores/users';

const logrosStore = useLogrosStore();
const userStore = useUsersStore()
const logrosLol = ref();

onMounted(async () => {
    await logrosStore.getAllLogros();
    await logrosStore.getLogrosCompletados();
    logrosLol.value = logrosStore.logros;
});

const uploadImage = async (file: File, logroId: string) => {
    if (!file) return;

    try {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        };

        const compressedFile = await imageCompression(file, options);

        const fileType = compressedFile.type;
        console.log('Compressed file type:', fileType);

        const formData = new FormData();
        formData.append('file', compressedFile);
        console.log(logroId)
        formData.append('logroId', logroId);

        const response = await axios.post('http://localhost:3000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Image uploaded successfully:', response.data.message);

        await logrosStore.assignLogroToUser(logroId);

        Swal.fire({
            icon: 'info',
            title: `${response.data.message}`,
        });
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error}`,
        });
    }
};
</script>

<template>
  <div class="container" v-for="logro in logrosLol" :key="logro.id">
    <AchievementsCard 
      :name="logro.name" 
      :descripcion="logro.descripcion" 
      :puntos="logro.puntos"
      :imagen="logro.imagen"
      :uploadImage="uploadImage"
      :logroId ="logro.logro_id"/>
  </div>
</template>

<style scoped>
.container {
    padding: 5px;
}
</style>