import Vue from "vue";
import VueRouter from "vue-router";
import MainLayout from '@/layout/MainLayout'
import authRoutes from "./auth/auth-routes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: MainLayout,
    meta: {
        isAuthRequired: true
    },
  },
  ...authRoutes,
  {
    path: '*',
    name: 'Error404',
    component: () => import('@/pages/error/error404.vue')
  }
];

const router = new VueRouter({
    mode: "history",
    hash: false,
    routes
});

function isSignedIn() {
    return localStorage.getItem("IE-token");
}

router.beforeEach((to, from, next) => {
    if ((to.name === "SignIn" || to.name === 'SignUp') && isSignedIn()) {
        next({ name: "Home" });
    } else if (to.meta.isAuthRequired) {
        // eslint-disable-next-line no-unused-expressions
        isSignedIn() ? next() : next({ name: "SignIn" });
    } else {
        next();
    }
});

export default router;
