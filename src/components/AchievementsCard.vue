<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  puntos: {
    type: Number,
    required: true
  },
  imagen: {
    type: String,
    required: true
  },
  uploadImage: {
    type: Function,
    required: true
  },
  completado: {
    type: Boolean,
    required: true
  },
  logroId: {
    type: String,
    required: true
  },
});

const operation = "add";
const selectedFile = ref<File | null>(null);

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
    props.uploadImage(target.files[0], props.logroId, props.puntos, operation);
  }
};
</script>

<template>
  <div :class="{ cardContainerTrue: completado, cardContainerFalse: !completado }">
    <div class="imageContainer">
      <img class="imageContainer__img" :src="imagen" alt="">
    </div>
    <div class="nameContainer">
      <h3>{{ name }}</h3>
      <p>{{ descripcion }}</p>
    </div>
    <div class="uploadContainer">
      <label class="customUploadButton" v-if="!completado">
        Subir evidencia
        <input type="file" @change="handleFileUpload" />
      </label>
      <label class="greenCheck" v-else>
        <img src="../assets/img/greencheckmark.png" alt="">
      </label>
    </div>
    <div class="puntosContainer">
      <h1>+{{ puntos }}</h1>
    </div>
  </div>
</template>

<style scoped>
.cardContainerFalse,
.cardContainerTrue {
  display: flex;
  background-color: #212121;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: solid 1px rgb(34, 34, 34);
  padding: 20px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
}

.cardContainerTrue {
  background-color: gray;
}
h1{
  margin:0;
  font-size: 2rem;
}

.customUploadButton {
  display: inline-block;
  padding: 10px 10px;
  margin: 15px;;
  font-size: 13px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.customUploadButton:hover {
  background-color: #0056b3;
}

.customUploadButton input[type="file"] {
  display: none; 
}

.greenCheck img {
  height: 60px;
  width: 60px;
  margin: 15px;
}

.imageContainer {
  flex: 0 0 60px;
}

.imageContainer__img {
  border-radius: 50%;
  height: 60px;
  width: 60px;
  background-color: rgb(194, 236, 222);
}

.nameContainer {
  flex: 1;
  margin-left: 20px;
}

.puntosContainer {
  flex: 0 0 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .cardContainerFalse,
  .cardContainerTrue {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .nameContainer {
    margin-left: 0;
    margin-top: 10px;
  }

  .puntosContainer {
    margin-top: 10px;
  }
}
</style>