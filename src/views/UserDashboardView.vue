<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue';


</script>

<template>
    <div class="dashboard-container">

        <Sidebar/>

        <main class="main-content">

            <header class="header">
                <h1 class="welcome-message">Hello, Sarah</h1>
                <button class="add-project-btn">Add New Project</button>
            </header>


            <section class="projects">
                <div class="project-card purple">
                    <h2>Web Development</h2>
                    <p>10 tasks • 96%</p>
                    <div class="progress-bar">
                        <div class="progress purple-progress" style="width: 96%;"></div>
                    </div>
                </div>
                <div class="project-card blue">
                    <h2>Mobile App Design</h2>
                    <p>12 tasks • 46%</p>
                    <div class="progress-bar">
                        <div class="progress blue-progress" style="width: 46%;"></div>
                    </div>
                </div>
                <div class="project-card orange">
                    <h2>Facebook Brand UI Kit</h2>
                    <p>22 tasks • 73%</p>
                    <div class="progress-bar">
                        <div class="progress orange-progress" style="width: 73%;"></div>
                    </div>
                </div>
            </section>

            <!-- Tasks for Today -->
            <section class="tasks">
                <h2 class="section-title">Tasks for Today</h2>
                <ul class="task-list">
                    <li class="task-item">
                        <span class="task-name">Prepare Figma file</span>
                        <input type="checkbox" />
                    </li>
                    <li class="task-item">
                        <span class="task-name">Design UX wireframes</span>
                        <input type="checkbox" />
                    </li>
                </ul>
            </section>
        </main>
    </div>
</template>



<style scoped>

.dashboard-container {
    display: flex;
    font-family: Arial, sans-serif;
    height: 100vh;
    background-color: #1a1a1a;
}

.main-content {
    flex: 1;
    padding: 20px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.welcome-message {
    font-size: 24px;
    font-weight: bold;
}

.add-project-btn {
    background-color: #5a67d8;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.add-project-btn:hover {
    background-color: #4c51bf;
}

/* Projects Section */
.projects {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.project-card {
    background-color: #363636;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    flex: 1;
}

.project-card h2 {
    margin-bottom: 10px;
    font-size: 18px;
}

.progress-bar {
    background-color: #eaeaea;
    height: 8px;
    border-radius: 5px;
    overflow: hidden;
}

.progress {
    height: 8px;
    border-radius: 5px;
}

.purple-progress {
    background-color: #6b46c1;
}

.blue-progress {
    background-color: #3182ce;
}

.orange-progress {
    background-color: #dd6b20;
}

/* Tasks Section */
.tasks {
    margin-bottom: 20px;
}

.section-title {
    font-size: 20px;
    margin-bottom: 10px;
}

.task-list {
    list-style: none;
    padding: 0;
}

.task-item {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.task-name {
    font-size: 16px;
}
</style>