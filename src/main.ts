import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './style.css';

// Create Pinia store
const pinia = createPinia();

// Create app
const app = createApp(App);

// Use plugins
app.use(pinia);
app.use(router);

// Mount app
app.mount('#app');