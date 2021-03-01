import { START_LOGIN, FINISH_LOGIN } from "../mutations/auth";
import API from "@/api/instanceFactory.js";
import { vm } from "../../main";

export const login = async ({ commit }, credentials) => {
    commit(START_LOGIN, credentials.email);
    let response;
    try {
        response = await API.Authentication().services.login(credentials);
        commit(FINISH_LOGIN, response.data);
        localStorage.setItem("IE-token", response.data.token);
    } catch (e) {
        const errorResponse = e.response;
        if (typeof errorResponse === "undefined") {
            throw e;
        }
        throw e;
    }
};

export const logout = async ({ commit }) => {
    commit("SET_LOADING_STATE", true);
    let response;
    try {
        response = await API.Authentication().services.logout();
        var rememberMe = localStorage.getItem("rememberMe");
        localStorage.clear();
        localStorage.setItem("rememberMe", rememberMe);
        vm.$toast.success(response.data.message);
        vm.$router.push({ name: "SignIn" });
        commit("SET_LOADING_STATE", false);
    } catch (error) {
        if (error.response.status === 401) {
            var rememberMe = localStorage.getItem("rememberMe");
            localStorage.clear();
            localStorage.setItem("rememberMe", rememberMe);
            vm.$router.push({ name: "SignIn" });
        }
        vm.$toast.error(error.response.data.message);
        commit("SET_LOADING_STATE", false);
    }
};
