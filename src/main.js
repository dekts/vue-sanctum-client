import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

import "./plugins/bootstrap-vue";
import "./plugins/vue-loading-overlay";
import "./plugins/vue-toastification";
import GlobalBaseLoader from "./components/loader/GlobalBaseLoader.vue";
import EventBus from "./plugins/event-bus";

// require("./bootstrap");

Vue.prototype.$eventBus = EventBus;

Vue.config.productionTip = false

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/'

const files = require.context("./", true, /\.vue$/i);
files.keys().map(key =>
    Vue.component(
        key
            .split("/")
            .pop()
            .split(".")[0],
        files(key).default
    )
);

Vue.component("base-loader", GlobalBaseLoader);

// store.dispatch('auth/me').then(() => {
  const vm = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
// })

export { vm };