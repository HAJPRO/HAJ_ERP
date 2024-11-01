import { createRouter, createWebHistory } from "vue-router";
import ExploreLayout from "../layouts/ExploreView.vue";
import LandingLayout from "../layouts/LandingView.vue";
import Cookies from "js-cookie";
const routes = [
  // LandingLayout
  {
    path: "/",
    name: "home",
    component: LandingLayout,
    children: [
      {
        path: "/",
        name: "landingPage",
        component: () => import("../pages/Landing/index.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("../pages/Landing/Register.vue"),
      },
      {
        path: "login",
        name: "Login",
        component: () => import("../pages/Landing/Login.vue"),
      },
      {
        path: "login/forget_password",
        name: "ForgetPassword",
        component: () => import("../pages/Landing/ForgetPassword.vue"),
      },
    ],
    beforeEnter(to, from, next) {
      if (Cookies.get("token")) {
        window.location.href = "/explore";
      } else {
        next();
      }
    },
  },

  // ExploreLayout

  {
    path: "/explore",
    name: "Explore",
    component: ExploreLayout,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("../pages/Explore/Dashboard.vue"),
      },
      // Sotuv bo'limi
      {
        path: "sale/legal",
        name: "legal",
        component: () => import("../pages/Explore/Sale/legal.vue"),
      },
      {
        path: "sale/legal/create",
        name: "create",
        component: () => import("../pages/Explore/Sale/legal.create.vue"),
      },
      //Bo'yoqlash bolimi
      {
        path: "department/paint/working/plan",
        name: "pain",
        component: () => import("../pages/Explore/Paint/PlanEco/plan.vue"),
      },
       //Taminot bolimi
       {
        path: "department/provide/working/plan",
        name: "provide",
        component: () => import("../pages/Explore/Provide/PlanEco/plan.vue"),
      },
    ],
    beforeEnter(to, from, next) {
      if (!Cookies.get("token")) {
        window.location.href = "/login";
      } else {
        next();
      }
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("../pages/Explore/NotFound/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
