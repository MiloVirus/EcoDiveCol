<script setup lang="ts">

import {useUsersStore} from '../stores/users'
const store = useUsersStore()

const logOut = () => 
{
    store.logOut()
}

</script>

<template>
   <aside class="sidebar">
            <div class="user-info">
                <img src="https://via.placeholder.com/50" alt="User" class="user-avatar" />
                <div>
                    <h2 class="user-name">Sarah Connor</h2>
                    <p class="user-email">sarahc@gmail.com</p>
                </div>
            </div>
            <nav class="menu">
                <a href="#" class="menu-item active">Dashboard</a>
                <a href="#" class="menu-item">Analytics</a>
                <a href="#" class="menu-item">Task List</a>
                <a href="#" class="menu-item">Tracking</a>
                <a href="#" class="menu-item">Settings</a>
            </nav>
            <button @click="logOut" class="logout-button">Log out</button>
        </aside>
</template>

<style lang="scss" scoped>
.sidebar {
    width: 20%;
    background-color: #2c2c2c;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}

.user-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.menu {
    display: flex;
    flex-direction: column;
}

.menu-item {
    text-decoration: none;
    color: #555;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.menu-item:hover,
.menu-item.active {
    background-color: #eaeaea;
}

.logout-button
{
    background-color: blueviolet;
    border-radius: 10%;
    border: none;
    padding: 10px;
    color: white;
    cursor: pointer;
}
.logout-button:hover
{
    background-color: rgb(91, 18, 160);   
}

</style>