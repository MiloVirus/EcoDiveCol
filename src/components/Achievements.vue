<script setup lang="ts">
import { useLogrosStore } from '@/stores/logros';
import { onMounted } from 'vue';
import AchievementsCard from './AchievementsCard.vue';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import Swal from 'sweetalert2';

const logrosStore = useLogrosStore();


onMounted(async () => {
  await logrosStore.getLogrosCompletados(); 
});

const uploadImage = async (file: File, logroId: string, puntos: number) => {
  if (!file) return;

  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    const formData = new FormData();

    formData.append('file', compressedFile);
    formData.append('logro_id', logroId);
    formData.append('puntos', puntos.toString());
  

    const response = await axios.post('http://localhost:3000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    console.log('Image uploaded successfully:', response.data.message);

    await logrosStore.assignLogroToUser(logroId);

    Swal.fire({
      icon: 'info',
      title: `${response.data.message}`,
    });

    await logrosStore.getLogrosCompletados(); 
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
  <div class="container" v-for="logro in logrosStore.logros" :key="logro.logro_id">
    <AchievementsCard 
      :name="logro.name" 
      :descripcion="logro.descripcion" 
      :puntos="logro.puntos"
      :imagen="logro.imagen"
      :completado="logro.completado"
      :uploadImage="uploadImage"
      :logroId="logro.logro_id"
    />
  </div>
</template>

<style scoped>
.container {
  padding: 5px;
}
</style>
