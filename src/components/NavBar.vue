<template>
    <nav class="navbar">
        <div class="logo">eco dive colombia</div>
        <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#centers">Diving Centers</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="login">Login</a></li>
        </ul>
    </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>
.navbar {
    font-family: 'Montserrat', serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: blueviolet;
    color: white;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-links {
    display: flex;
    list-style: none;
}

.nav-links li {
    margin-left: 1rem;
}

.nav-links a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
}

.nav-links a:hover {
    color: #00FFFF;
}
</style>