import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';

import App from './App.vue';
import '@/plugins';
import './styles/index';

const app = createApp(App);
// 全局挂载http封装的方法
// app.config.globalProperties.$http = http;

app.use(router);
app.use(createPinia());
app.mount('#app');
