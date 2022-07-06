import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'

import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')


