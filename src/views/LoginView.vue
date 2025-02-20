<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue';
import { useUsersStore } from '@/stores/users';
import router from '@/router';

const store = useUsersStore()

const email = ref<string>('')
const password = ref<string>('')

const handleLogin = async (e: Event) => {
    e.preventDefault()
    try {
        await store.signIn({ "email": email.value, "password": password.value })
        email.value = ''
        password.value = ''
        router.push({ name: 'dashboard' });
    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <section class="mainContainer">
        <section class="imageContainer">
            <img class="backgroundImg" src="../assets/img/loginImg.jpg" alt="">
        </section>
        <div class="mainLoginContainer">
            <div class="mainLoginContainer__logoContainer">
                <img class="logoContainer__logo" src="../assets/img/ecodivecol-white.png" alt="logo">
                <a href="/">Home</a>
            </div>
            <section class="loginContainer">
                <h1>
                    Bienvenido de vuelta
                </h1>
                <h4>Por favor ingresa tus datos</h4>
                <form class="loginContainer__form">
                    <label for="form__label" class="form__label">Correo Electrónico</label>
                    <input id="form__input" v-model="email" type="text">
                    <label for="form__label" class="form__label">Password</label>
                    <input id="form__input" v-model="password" type="password">
                    <button class="form__button" @click="handleLogin">Sign In</button>
                </form>
                <RouterLink to="/register">
                    <h5>¿No estás registrado?</h5>
                </RouterLink>
            </section>
        </div>
    </section>

</template>
<style lang="scss" scoped>
.mainContainer {
    display: flex;
    width: 100vw;
    height: 100vh;
    font-family: 'Montserrat', serif;
    overflow: hidden;
}

.imageContainer {
    width: 60%;
    height: 100vh;
    overflow: hidden;
}

.backgroundImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.mainLoginContainer {
    width: 50%;
    background-color: rgb(134, 45, 218);
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;  /* <-- Se agrega scroll si el contenido es demasiado grande */
}

.loginContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;  /* <-- Permite que el contenedor crezca sin exceder 100vh */
    width: 100%;
}

.mainLoginContainer__logoContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
}

.logoContainer__logo {
    width: 240px;
    margin: 10px;
}

h1 {
    color: white;
    font-size: 34px;
    text-align: center;
}

h5 {
    font-weight: 500;
    text-decoration: underline;
}

.loginContainer__form {
    display: flex;
    flex-direction: column;
    width: 80%;
    padding: 30px;
    text-align: left;
    border-radius: 20px;
}

.form__label,
h4 {
    font-weight: 500;
}

#form__input {
    width: 100%;
    height: 40px;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    box-sizing: border-box;
    margin: 10px 0 10px 0;
    color: rgb(99, 99, 99);
}

.form__button {
    padding: 13px;
    color: white;
    background-color: #551a8b;
    border: none;
    cursor: pointer;
    font-weight: 700;
}

.form__button:hover {
    background-color: #340e57;
}

@media (max-width: 768px) {
    .imageContainer {
        display: none;
    }
    .mainLoginContainer {
        width: 100%;
    }
}

</style>