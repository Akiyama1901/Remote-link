import { createRouter, createWebHistory } from "vue-router";
import MeetingView from "../views/meeting/index.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MeetingView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
