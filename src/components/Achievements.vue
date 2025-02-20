<script setup lang="ts">
import AchievementsCard from './AchievementsCard.vue';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import Swal from 'sweetalert2';
import { useLogrosStore } from '@/stores/logros';
import { useUsersStore } from '@/stores/users';
import {API_URL} from '../utils/constant';


interface Logro {
  logro_id: string;
  name: string;
  descripcion: string;
  puntos: number;
  imagen: string;
  completado: boolean;
}

defineProps<{
  logros: Logro[];
}>();

const logrosStore = useLogrosStore();
const userStore = useUsersStore();

const uploadImage = async (file: File, logroId: string, puntos: number, operation: string) => {
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
    formData.append('operation', operation)

    const response = await axios.post(`${API_URL}upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    const logro = logrosStore.logros.find(l => l.logro_id === logroId);
    if (logro) {
      logro.completado = true;
    }

    if (userStore?.users && userStore.users[0] && userStore.users[0].curr_puntos !== undefined) {
      userStore.users[0].curr_puntos += puntos;
    }

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
  <div class="container" v-for="logro in logros" :key="logro.logro_id">
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
