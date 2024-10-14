import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/admin/admin.vue"),
      children: [

      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login.vue")
    },

  ]
})

export default router
