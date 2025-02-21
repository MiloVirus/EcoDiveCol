<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    name:{
        type: String,
        required: true
    },
    descripcion:
    {
        type: String,
        required: true
    },
    puntos:
    {
        type: Number,
        required: true
    },
    imagen:
    {
        type: String,
        required: true
    },
    uploadImage:
    {
        type: Function,
        required: true
    },
    completado:
    {
        type: Boolean,
        required: true
    },
    logroId:
    {
        type: String,
        required: true
    },
})
const operation = "add"



const selectedFile = ref<File | null>(null);

const handleFileUpload = (event: Event) =>
{
    const target = event.target as HTMLInputElement
    console.log(props.logroId)
    if(target.files && target.files[0])
    {
        selectedFile.value = target.files[0]
        console.log(props.logroId)
        props.uploadImage(target.files[0], props.logroId, props.puntos, operation)
    }
    
}

</script>

<template>
    <div :class="{cardContainerTrue: completado, cardContainerFalse: !completado}">
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
.cardContainerFalse
{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    border: solid 1px rgb(34, 34, 34);;
    padding: 20px;
}

.cardContainerTrue
{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    border: solid 1px rgb(34, 34, 34);;
    padding: 20px;
    background-color: gray;

}

.customUploadButton {
  display: inline-block;
  padding: 10px 10px;
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
  display: none; /* Oculta el input real */
}

.uploadButton {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}
.greenCheck img
{
    height: 60px;
    width: 60px;
}
.uploadButton:hover {
  background-color: #0056b3;
}

.imageContainer
{
    width: 10%;
}
.nameContainer
{
    width: 80%;
    margin-left: 20px;
}
.puntosContainer
{
    display: flex;
    width: 10%;
}
.imageContainer__img
{
    border-radius: 50%;
    height: 60px;
    width:  60px;
    background-color: rgb(194, 236, 222);
}
.uploadContainer {
    display: inline-block;
    margin: 10px;
}

.uploadContainer input[type="file"] {
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    max-width: 300px;
    transition: border-color 0.3s;
}

.uploadContainer input[type="file"]:hover {
    border-color: #007bff;
}

</style>