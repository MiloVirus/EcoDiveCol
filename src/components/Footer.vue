    <script setup>
</script>

<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>About Us</h3>
                <p>DiveQuest is your gateway to the world's best diving centers.</p>
            </div>
            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#centers">Diving Centers</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Contact Us</h3>
                <p>Email: info@divequest.com</p>
                <p>Phone: +1 (123) 456-7890</p>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; 2023 DiveQuest. All rights reserved.
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: blueviolet;
    color: white;
    padding: 2rem 0;
}

.footer-content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
}

.footer-section {
    margin-bottom: 1rem;
}

.footer-section h3 {
    margin-bottom: 0.5rem;
}

.footer-section ul {
    list-style: none;
}

.footer-section a {
    color: white;
    text-decoration: none;
}

.footer-section a:hover {
    text-decoration: underline;
}

.footer-bottom {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>