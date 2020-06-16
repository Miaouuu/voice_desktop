import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Server from "../views/Server.vue";
import Join from "../views/Join.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/server",
    name: "server",
    component: Server,
  },
  {
    path: "/server/join/:inv",
    name: "server_join",
    component: Join,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
