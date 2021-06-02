import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/lib/theme-chalk/display.css'
import { createApp } from 'vue'
import App from './App.vue'
import config from "./config"
import router from './router'
import store from './store'
import api from './api'
import tool from './utils/tool'
import http from "./utils/request"
import permission from './utils/permission'
import scTable from './components/scTable'
import scFilterBar from './components/scFilterBar'
import scUpload from './components/scUpload'
import scUploadMultiple from './components/scUpload/multiple'
import scFormTable from './components/scFormTable'

const app = createApp(App);

app.config.globalProperties.$CONFIG = config;
app.config.globalProperties.$TOOL = tool;
app.config.globalProperties.$HTTP = http;
app.config.globalProperties.$API = api;
app.config.globalProperties.$HAS = permission;

app.use(store);
app.use(router);
app.use(ElementPlus, {size: 'small', locale: locale});

app.component('scTable', scTable);
app.component('scFilterBar', scFilterBar);
app.component('scUpload', scUpload);
app.component('scUploadMultiple', scUploadMultiple);
app.component('scFormTable', scFormTable);

app.mount('#app');
