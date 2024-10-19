import { createRouter, createWebHistory } from 'vue-router'
import NProgress from "nprogress";
import 'nprogress/nprogress.css'
import { message } from 'ant-design-vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      component: () => import("../views/admin/admin.vue"),
      name: "admin",
      redirect: "/admin/home",
      children: [
        {
          path: "home",
          name: "home",
          component: () => import("../views/admin/home/home.vue")
        },
        {
          path: "user_list",
          name: "user_list",
          component: () => import("../views/admin/user_mgr/user_list.vue")
        },
        {
          path: "image_list",
          name: "image_list",
          component: () => import("../views/admin/image_mgr/image_list.vue")
        },
        {
          path: "system_config",
          name: "system_config",
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


router.beforeEach((to, from, next) => {
  NProgress.start()  //开始进度条
  // 判断是否登录
  if (to.path !== '/login' && !localStorage.getItem('token')) {
    message.warn("用户失效，请重新登录")
    next('/login')
  }
  next()
})
router.afterEach((to, from, next) => {
  NProgress.done()  //完成进度条
})

export default router
