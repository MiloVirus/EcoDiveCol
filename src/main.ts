import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setupAxiosInterceptors } from './utils/axiosConfig'

const app = createApp(App)
setupAxiosInterceptors()

app.use(createPinia())
app.use(router)

app.mount('#app')
