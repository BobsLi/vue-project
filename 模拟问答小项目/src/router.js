import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Item from "@/views/Item.vue";
import Score from "@/views/Score.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/item",
      name: "item",
      component: Item,
    },
    {
      path: "/score",
      name: "score",
      component: Score,
    },
    {
      path: "/about/:id",
      name: "about",
			props: {
				t: null,
			},
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
