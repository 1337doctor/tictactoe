import { createApp } from 'vue'
import App from './src/App.vue'
import { store } from './src/state'

const app = createApp(App)
app.use(store)
app.mount('#ttt-container')
