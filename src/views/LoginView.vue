<script setup lang = "ts">
import { RouterLink} from 'vue-router' 
import { ref } from 'vue';
import { useUsersStore } from '@/stores/users';

const store = useUsersStore()

const email = ref<string>('')
const password = ref<string>('')

const handleLogin = (e: Event) => 
{
    e.preventDefault()
    store.signIn({"email": email.value, "password": password.value})
    email.value = ''
    password.value = ''
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
                    <RouterLink to="/register"><h5>¿No estás registrado?</h5></RouterLink>
            </section>
        </div>
    </section>

</template>
<style lang="scss" scoped>
.mainContainer {
    display: flex;
    flex-wrap: nowrap;
    width: 100vw;
}
.imageContainer {
    width: 60%;
    height: 100vh; 
    overflow: hidden; 
}
a
{
    text-decoration: none;
}
.backgroundImg {
    width: 100%; 
    height: 100%;
    object-fit: cover;
}

.mainLoginContainer {
    width: 50%;
    background-color: rgb(134, 45, 218);
}
h1
{
    text-align: center;
}
.loginContainer
{
    display: flex;
    align-items: center;
    align-self: center;
    flex-direction: column;
    font-family: 'Montserrat', serif;
    justify-content: center;
    width: 100%;
    height: 90%;
}

.loginContainer__logoContainer {
    height: 30px;
}

.logoContainer__logo {
    text-align: left;
    width: 240px;
    margin-bottom: 140px;
    margin: 10px 10px 10px 10px;
}

h1 {
    color: white;
    font-size: 34px;
}

h5 {
    font-weight: 500;
    text-decoration: underline
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
    padding: 8px;
    color: white;
    background-color: #551a8b;
    border: none;
    padding: 13px;
    cursor: pointer;
    font-weight: 700;
}

.form__button:hover {
    background-color: #340e57;
}
</style>