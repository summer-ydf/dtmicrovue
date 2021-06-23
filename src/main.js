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
import errorHandler from './utils/errorHandler'
import scTable from './components/scTable'
import scFilterBar from './components/scFilterBar'
import scUpload from './components/scUpload'
import scUploadMultiple from './components/scUpload/multiple'
import scFormTable from './components/scFormTable'
import scTableSelect from './components/scTableSelect'
import auth from './directives/auth'

const app = createApp(App);

//挂载全局对象
app.config.globalProperties.$CONFIG = config;
app.config.globalProperties.$TOOL = tool;
app.config.globalProperties.$HTTP = http;
app.config.globalProperties.$API = api;
app.config.globalProperties.$AUTH = permission;

app.use(store);
app.use(router);
app.use(ElementPlus, {size: 'small', locale: locale});

//全局代码错误捕捉
app.config.errorHandler = errorHandler

//注册全局组件
app.component('scTable', scTable);
app.component('scFilterBar', scFilterBar);
app.component('scUpload', scUpload);
app.component('scUploadMultiple', scUploadMultiple);
app.component('scFormTable', scFormTable);
app.component('scTableSelect', scTableSelect);

//注册全局指令
app.directive('auth', auth)

//挂载app
app.mount('#app');
