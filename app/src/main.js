import { createApp } from 'vue'
import './style.css'
import '../node_modules/primeflex/primeflex.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Listbox from 'primevue/listbox'
import Button from 'primevue/button'
import Chart from 'primevue/chart'
import Card from 'primevue/card'



const app = createApp(App)
app.use(PrimeVue)
app.component('Listbox', Listbox)
app.component('Button', Button)
app.component('Chart', Chart)
app.component('Card', Card)
// createApp(App).mount('#app')

app.mount('#app')
