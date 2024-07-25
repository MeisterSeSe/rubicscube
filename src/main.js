import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from "pinia"
import vuetify from './plugins/vuetify' // Import from a separate file
import {registerPlugins} from "./plugins/index.js";

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
registerPlugins(app)
app.mount('#app')
