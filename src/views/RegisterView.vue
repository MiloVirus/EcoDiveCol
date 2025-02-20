<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { useUsersStore } from '../stores/users';
import Swal from 'sweetalert2';

const store = useUsersStore();

const name = ref<string>('');
const lastName = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');

const handleRegister = async (e: Event) => {
    e.preventDefault();
    try {
        await store.addUser({
        first_name: name.value,
        last_name: lastName.value,
        email: email.value,
        password: password.value,
        
    });

    name.value = '';
    lastName.value = '';
    email.value = '';
    password.value = '';

    Swal.fire({
        title: 'Registro exitoso',
        text: 'Usuario registrado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
    });
 
    } catch (error) {
        console.log('Registration failed', error);
        Swal.fire({
            title: 'Error',
            text: 'No se pudo registrar el usuario',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }

    
};
</script>

<template>
    <section class="mainContainer">
        <section class="imageContainer">
            <img class="backgroundImg" src="../assets/img/register.jpg" alt="">
        </section>
        <div class="mainLoginContainer">
            <div class="mainLoginContainer__logoContainer">
                <img class="logoContainer__logo" src="../assets/img/ecodivecol-white.png" alt="logo">
                <a href="/">Home</a>
            </div>
            <section class="loginContainer">
                <h1>Registrate a nuestra aplicación</h1>
                <h4>Por favor ingresa tus datos</h4>
                <form class="loginContainer__form" @submit="handleRegister">
                    <label for="name" class="form__label">Nombre</label>
                    <input id="name" v-model="name" type="text" required>
                    <label for="lastName" class="form__label">Apellido</label>
                    <input id="lastName" v-model="lastName" type="text" required>
                    <label for="email" class="form__label">Correo Electrónico</label>
                    <input id="email" v-model="email" type="text" required>
                    <label for="password" class="form__label">Password</label>
                    <input id="password" v-model="password" type="password" required>
                    <button type="submit" class="form__button">Register</button>
                </form>
                <RouterLink to="/login"><h5>¿Ya tienes una cuenta?</h5></RouterLink>
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
    background-color: blueviolet;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
}

.loginContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1; 
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
    padding: 5px;
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
    h1 {
        font-size: 1.5rem;
    }
}
</style>