import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      component: () => import("../views/admin/admin.vue"),
      name:"admin",
      redirect:"/admin/home",
      children: [
        {
          path:"home",
          name:"home",
          component: () => import("../views/admin/home/home.vue")
        },
        {
          path:"user_list",
          name:"user_list",
          component: () => import("../views/admin/user_mgr/user_list.vue")
        },
        {
          path:"system_config",
          name:"system_config",
          component: () => import("../views/admin/system_mgr/system_list.vue")
        },
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
