import { createApp } from 'vue'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import App from './App.vue'
import { Quasar } from 'quasar'

const app = createApp(App)

app.use(Quasar, {
  plugins: {}
})

app.mount('#app')
