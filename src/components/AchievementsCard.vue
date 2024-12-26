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
        <img class="cardContainer__img" src="../assets/img/beach-cleaning.webp" alt="">
        <div>
            <h2>{{ name}}</h2>
            <p>{{ descripcion }}</p>
        </div>
        <img src="" alt="">
        <h1>+5</h1>
    </div>
</template>



<style scoped>
.cardContainer
{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border: solid 1px rgb(34, 34, 34);;
    padding: 20px;
    background-color: rgb(34, 34, 34);
}
.cardContainer__img
{
    border-radius: 50%;
    height: 100px;
    width: 100px;
    background-color: rgb(194, 236, 222);
}
</style>