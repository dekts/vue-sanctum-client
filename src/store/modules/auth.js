import { START_LOGIN, FINISH_LOGIN } from "../mutations/auth";
import { login, logout } from "../actions/auth";

const getDefaultState = () => ({
    token: localStorage.getItem("IE-token") || "",
    login: {
        isLoading: false,
        errors: []
    },
});

const authModule = {
    state: getDefaultState(),
    getters: {
        isAuthenticated: state => !!state.token
    },
    mutations: {
        [START_LOGIN]: (state, email) => {
            state.login.isLoading = true;
            state.profile.email = email;
        },
        [FINISH_LOGIN]: (state, response) => {
            state.login.isLoading = false;
            state.login.errors = [];
            state.token = response.data.token;
        },
    },
    actions: {
        login,
        logout
    }
};

export default authModule