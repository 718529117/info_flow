import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//router
import router from './router'
//pinia
import pinia from './stores'

const app = createApp(App);

//注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// app.use(ElementPlus, { locale: zhCn })
app.use(ElementPlus)
app.use(router)
app.use(pinia)

app.mount('#app')
