<template>
    <div class="card">
        <img :src="image" alt="Diveshop Image" class="card-image" />
        <div class="card-content">
            <h2 class="card-title">{{ name }}</h2>
            <p class="card-city">{{ city }}</p>
            <button class="card-button">Learn More</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DiveshopCard',
    props: {
        name: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.card {
    border: 1px solid #ddd;
    background-color: #eceaea;
    color: #333;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
    width: 350px;
    height: 300px; 
    display: flex;
    flex-direction: column;
}

.card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-image {
    width: 100%;
    height: 120px; 
    object-fit: cover;
}

.card-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex-grow: 1; 
    overflow: hidden;
}

.card-title {
    font-size: 1em;
    margin: 0;
}

.card-description {
    color: #666;
    margin-top: 8px;
    flex-grow: 1; 
    overflow-y: auto; 
}

.card-button {
    margin-top: 8px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    align-self: center;
}

</style>