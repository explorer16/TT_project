import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {useAuthStore} from "./stores/auth.js";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createPinia } from 'pinia'
import { router } from './router'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(ElementPlus)

const auth = useAuthStore()
auth.initAuth()

app.mount('#app')
