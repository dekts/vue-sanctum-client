import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

import GlobalBaseLoader from "./components/loader/GlobalBaseLoader.vue";

Vue.config.productionTip = false

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/'

Vue.component("base-loader", GlobalBaseLoader);

// store.dispatch('auth/me').then(() => {
  const vm = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
// })

export { vm };