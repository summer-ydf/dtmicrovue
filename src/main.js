import ElementPlus from 'element-plus'
import i18n from './locales'
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
import { permission, rolePermission } from './utils/permission'
import errorHandler from './utils/errorHandler'
import scTable from './components/scTable'
import scFilterBar from './components/scFilterBar'
import scUpload from './components/scUpload'
import scUploadMultiple from './components/scUpload/multiple'
import scFormTable from './components/scFormTable'
import scTableSelect from './components/scTableSelect'
import scPageHeader from './components/scPageHeader'
import scSelect from './components/scSelect'
import auth from './directives/auth'
import role from './directives/role'

const app = createApp(App);

//挂载全局对象
app.config.globalProperties.$CONFIG = config;
app.config.globalProperties.$TOOL = tool;
app.config.globalProperties.$HTTP = http;
app.config.globalProperties.$API = api;
app.config.globalProperties.$AUTH = permission;
app.config.globalProperties.$ROLE = rolePermission;

app.use(store);
app.use(router);

app.use(ElementPlus, {size: 'small'});
app.use(i18n);

//注册全局组件
app.component('scTable', scTable);
app.component('scFilterBar', scFilterBar);
app.component('scUpload', scUpload);
app.component('scUploadMultiple', scUploadMultiple);
app.component('scFormTable', scFormTable);
app.component('scTableSelect', scTableSelect);
app.component('scPageHeader', scPageHeader);
app.component('scSelect', scSelect);

//注册全局指令
app.directive('auth', auth)
app.directive('role', role)

//全局代码错误捕捉
app.config.errorHandler = errorHandler

//挂载app
app.mount('#app');
