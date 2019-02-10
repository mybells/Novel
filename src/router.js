import Vue from "vue";
import Router from "vue-router";
import Content from "./views/Content.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Home.vue")
    },
    {
      path: "/about/:bookTitle/:bookSearchId",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
      children: [
        {
          name: "content",
          path: "/about/:bookTitle/:bookSearchId/:content",
          component: Content
        }
      ]
    }
  ]
});
