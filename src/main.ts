import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from '@/router/index'
import { key, store } from '@/store'
import App from './App.vue'
import styleImport from '@/utils/style-import'
import '@/style/basic.styl'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App)
styleImport(app).use(ElementPlus).use(router).use(store, key).mount('#app')
