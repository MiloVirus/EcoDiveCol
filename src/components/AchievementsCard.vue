<script setup lang="ts">

const {name, descripcion, puntos, imagen} = defineProps({
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
    }
})

</script>

<template>
    <div class="cardContainer">
        <div class="imageContainer">
            <img class="imageContainer__img" :src="imagen" alt="">
        </div>
        <div class="nameContainer">
            <h2>{{ name}}</h2>
            <p>{{ descripcion }}</p>
        </div>
        <div class="uploadContainer">
            <input type="file"  />
        </div>
        <div class="puntosContainer">
            
            <h1>+{{ puntos }}</h1> 
        </div>
        
    </div>
</template>

<style scoped>
.cardContainer
{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    border: solid 1px rgb(34, 34, 34);;
    padding: 20px;
    background-color: rgb(34, 34, 34);
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
    height: 100px;
    width: 100px;
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