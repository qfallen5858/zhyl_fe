import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '/src/assets/styles/index.scss'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
