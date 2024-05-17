import { createRouter, createWebHistory } from "vue-router";
import Render from "../views/Render.vue";
import Logistic from "../views/Logistic.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/main/index.html",
      name: "render",
      component: Render,
    },
    {
      path: "/logistic",
      name: "logistic",
      component: Logistic,
    },
  ],
});

export default router;