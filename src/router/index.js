import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home";
import About from "../views/About";
import UpdateTask from "../components/UpdateTask";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/update/:id",
    name: "UpdateTask",
    component: UpdateTask,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
