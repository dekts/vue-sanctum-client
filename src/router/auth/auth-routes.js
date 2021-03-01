export default [
    {
        path: "/sign-in",
        name: "SignIn",
        component: () => import("@/pages/auth/signIn/SignIn.vue"),
        meta: {
            isAuthRequired: false
        }
    },
    {
        path: "/sign-up",
        name: "SignUp",
        component: () => import("@/pages/auth/signUp/SignUp.vue"),
        meta: {
            isAuthRequired: false
        }
    },
];
