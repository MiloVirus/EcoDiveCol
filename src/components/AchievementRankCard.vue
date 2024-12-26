<script setup lang="ts">


</script>
<template>
    <div class="achievement-card">
        <img class="medal" src="../assets/img/1starmedal.png" alt="">
        <h2>Limpiar la playa</h2>
        <p>10 tasks • 96%</p>
        <div class="progress-bar">
            <div class="progress purple-progress" style="width: 96%;"></div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.achievement-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #363636;
    padding: 15px;
    border-radius: 10px;
    flex: 1;
}

.achievement-card h2 {
    margin-bottom: 10px;
    font-size: 18px;
}

.medal {
    width: 50%;
}

.progress-bar {
    background-color: #eaeaea;
    height: 8px;
    border-radius: 5px;
    overflow: hidden;
    width: 100%;
}

.progress {
    height: 8px;
    border-radius: 5px;
}
</style>