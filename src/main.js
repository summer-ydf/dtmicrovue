import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import config from "./config";
import router from './router'
import store from './store'
import tool from './utils/tool'
import http from "./utils/request";
import api from './api'
import permission from './utils/permission'

const app = createApp(App);

app.config.globalProperties.$CONFIG = config;
app.config.globalProperties.$TOOL = tool;
app.config.globalProperties.$HTTP = http;
app.config.globalProperties.$API = api;
app.config.globalProperties.$HAS = permission;

app.use(store);
app.use(router);
app.use(ElementPlus, {size: 'small', zIndex: 3000 ,locale: locale});
app.mount('#app');
