import { createApp } from 'vue';
import App from './App.vue';
import components from '@/components';
import router from './router';
import store from './store';

const app = createApp(App);
components(app);
app.use(store).use(router).mount('#app');
