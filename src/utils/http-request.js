import Axios from "axios";
import Router from "../router/index";

const authHTTP = Axios.create({
    baseURL: process.env.MIX_APP_BASE_URL
});

const HTTP = Axios.create({
    baseURL: process.env.MIX_APP_BASE_URL
});

HTTP.interceptors.request.use(
    config => {
        config.headers = {
            authorization: "Bearer " + localStorage.getItem("IE-token"),
            accept: "application/json"
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

HTTP.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        if (error.response.status === 401) {
            Router.push({
                name: "SignIn"
            });
            var rememberMe = localStorage.getItem("rememberMe");
            localStorage.clear();
            localStorage.setItem("rememberMe", rememberMe);
        }
        return Promise.reject(error);
    }
);

export { HTTP, authHTTP };
