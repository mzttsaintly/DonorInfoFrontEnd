import './assets/reset.css'
import './assets/app.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 使用中文组件
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue'
import router from './router'

// vue3打印组件
import print from 'vue3-print-nb'

// import './mock/mockback'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(createPinia())
app.use(router)
app.use(print)
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
