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
      meta: {
        title: "首页",
      },
      children: [
        {
          path: "home",
          name: "home",
          component: () => import("../views/admin/home/home.vue"),
          meta: {
            title: "首页",
          }
        },
        {
          name: "personal-center",
          path: "personal_center",
          meta: {
            title: "个人中心",
          },
          children: [{
            path: "user_center",
            name: "user_center",
            component: () => import("../views/admin/user_mgr/user_center.vue"),
            meta: {
              title: "个人信息",
            }
          },]
        },
        {
          name: "user-management",
          path: "user-management",
          meta: {
            title: "用户管理",
          },
          children: [
            {
              path: "user_list",
              name: "user_list",
              component: () => import("../views/admin/user_mgr/user_list.vue"),
              meta: {
                title: "用户列表",
              }
            },
          ]
        },
        {
          name: "article-management",
          path: "article-management",
          meta: {
            title: "文图管理",
          },
          children: [
            {
              path: "artice_add",
              name: "artice_add",
              component: () => import("../views/admin/artice_mgr/artice_add.vue"),
              meta: {
                title: "添加文章",
              }
            },
            {
              path: "artice_center",
              name: "artice_center",
              component: () => import("../views/admin/artice_mgr/artice_center.vue"),
              meta:{
                title:"文章管理"
              }
            },
            {
              path: "image_list",
              name: "image_list",
              component: () => import("../views/admin/image_mgr/image_list.vue"),
              meta:{
                title:"图片管理"
              }
            },
            {
              path: "comment_center",
              name: "comment_center",
              component: () => import("../views/admin/comment_mgr/comment_center.vue"),
              meta:{
                title:"评论管理"
              }
            },
          ]
        },
        {
          name: "system-management",
          path: "system-management",
          meta:{
            title:"系统管理"
          },
          children: [
            {
              path: "system_config",
              name: "system_config",
              component: () => import("../views/admin/system_mgr/system_list.vue"),
              meta:{
                title:"系统配置"
              }
            },
          ]
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
