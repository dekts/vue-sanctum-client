import { authHTTP } from "../utils/http-request";

const AuthenticationInstance = authHTTP;

const AuthenticationServices = instance => {
    const login = async credentials => instance.post("/login", credentials);
    const logout = async () =>
        instance.get("/logout", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("IE-token")}`
            }
        });
    return {
        login,
        logout
    };
};

const Api = {
    Authentication: () => ({
        services: AuthenticationServices(AuthenticationInstance)
    }),
};

export default Api;
