import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: () => import("@/views/HomePages/LoginPage.vue"),
  },
  {
    path: "/LandingPage",
    name: "LandingPage",
    component: () => import("@/views/HomePages/LandingPage.vue"),
    children: [
      {
        path: "/tab-one",
        name: "Dashboard",
        component: () => import("@/views/ChildPages/Dashboard.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
