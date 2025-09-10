import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: () => import("@/views/HomePages/LoginPage.vue"),
  },
  {
    path: "/landing-page",
    name: "LandingPage",
    component: () => import("@/views/HomePages/LandingPage.vue"),
    children: [
      {
        path: "/my-dashboard",
        name: "Dashboard",
        component: () => import("@/views/ChildPages/Dashboard.vue"),
      },
      {
        path: "/all-admins",
        name: "Admins",
        component: () => import("@/views/ChildPages/AllUsers.vue"),
      },
      {
        path: "/all-members",
        name: "Members",
        component: () => import("@/views/ChildPages/AllMembers.vue"),
      },
      {
        path: "/about-alumni",
        name: "About Alumni",
        component: () => import("@/views/ChildPages/AboutAlumni.vue"),
      },
      {
        path: "/settings",
        name: "Settings",
        component: () => import("@/views/ChildPages/Settings.vue"),
      },
      {
        path: "/approvals",
        name: "Approvals",
        component: () => import("@/views/ChildPages/Approvals.vue"),
      },
      {
        path: "/announcements",
        name: "Announcements",
        component: () => import("@/views/ChildPages/Announcements.vue"),
      },
      {
        path: "/events",
        name: "Events",
        component: () => import("@/views/ChildPages/Events.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
