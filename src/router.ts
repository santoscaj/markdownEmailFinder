import Vue from "vue";
import Router from "vue-router";
// import ImportPage from "./views/ImportPage.vue";
// import TemplatesPage from "./views/TemplatesPage.vue";
import NotificationsPage from "./views/NotificationsPage.vue";

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: "/",
      name: "home",
      component: NotificationsPage
    },
    {
      path: "/import",
      name: "import",
      // component: ImportPage
      component: () => import("./views/ImportPage.vue")
    },
    {
      path: "/templates",
      name: "templates",
      // component: TemplatesPage
      component: () => import("./views/TemplatesPage.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
