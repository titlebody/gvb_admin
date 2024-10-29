import { createApp } from 'vue'


import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import ActivityCalendar from "vue-activity-calendar";
import "vue-activity-calendar/style.css";

import * as echarts from 'echarts'





import App from './App.vue'
import router from './router'
import pinia from './stores/index'
import vuetyped from "vue3typed";

const app = createApp(App)
//vue3.0取消了Vue.prototype，官方文档推荐使用globalProperties
app.config.globalProperties.$echarts = echarts
app.use(router)
app.use(vuetyped)
app.use(ActivityCalendar)
app.use(Antd)
app.use(pinia)
app.mount('#app')