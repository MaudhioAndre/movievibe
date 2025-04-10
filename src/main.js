import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { Inkline, components } from '@inkline/inkline'
import './css/variables/index.scss'
import '@inkline/inkline/css/index.scss'
import '@inkline/inkline/css/utilities.scss'

import SvgIcon from 'vue3-icon'

const app = createApp(App).use(Inkline, { components })

app.use(createPinia())
app.use(router)
app.component('svg-icon', SvgIcon)

app.mount('#app')
