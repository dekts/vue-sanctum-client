import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router/index";
import { SET_LOADING_STATE } from "./mutations/sharedMutations";
import authModule from "./modules/auth";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
        isLoading: false
    },
    getters: {
        getLoadingState: state => state.isLoading,
        getToken: _ => localStorage.getItem("IE-token")
    },
    mutations: {
        initialiseUser: (state, payload) => {
            localStorage.setItem("IE-token", payload.data.token);
            router.push({ name: "Home" });
        },
        setLoadingState: (state, payload) => (state.isLoading = payload),
        [SET_LOADING_STATE]: (state, payload) => (state.isLoading = payload)
    },
    actions: {},
    modules: {
        authModule,
    },
    plugins: [
        createPersistedState({
            paths: [
                // "onboardingModule",
                // "profileModule.profile",
                // "tournamentsModule.tournamentInfo.id",
                // "notificationsModule",
                // "streamModule.isBroadCasting"
            ]
        })
    ]
})
