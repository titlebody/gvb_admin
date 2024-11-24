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
              meta: {
                title: "文章管理"
              }
            },
            {
              path: "image_list",
              name: "image_list",
              component: () => import("../views/admin/image_mgr/image_list.vue"),
              meta: {
                title: "图片管理"
              }
            },
            {
              path: "comment_center",
              name: "comment_center",
              component: () => import("../views/admin/comment_mgr/comment_center.vue"),
              meta: {
                title: "评论管理"
              }
            },
            {
              path: "adverts_list",
              name: "adverts_list",
              component: () => import("../views/admin/adverts_mgr/adverts_list.vue"),
              meta: {
                title: "广告管理"
              }
            },
          ]
        },
        {
          name: "system-management",
          path: "system-management",
          meta: {
            title: "系统管理"
          },
          children: [
            {
              path: "system_config",
              name: "system_config",
              component: () => import("../views/admin/system_mgr/system_list.vue"),
              meta: {
                title: "系统配置"
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
    {
      path: "/",
      name: "index_base",
      component: () => import("../views/web/web.vue"),
      children:[
        {
          path:'',
          name:"index",
          component:()=>import("../views/web/index.vue")
        },
        {
          path:'news',
          name:"news",
          component:()=>import("../views/web/news_view.vue")
        },
        {
          path:'article/:id',
          name:"article",
          component:()=>import("../views/web/article_item.vue")
        }
      ]
    },

  ]
})


const whiteList = ['/login', '/', '/article/:id','/news']; // 不需要登录即可访问的路径

router.beforeEach((to, from, next) => {
  NProgress.start();  // 开始进度条

  // 判断是否登录
  const token = localStorage.getItem('token');

  if (whiteList.includes(to.path) || to.matched.some(record => record.path === '/article/:id')) {
    // 如果目标路径是登录页面或文章详情页，直接放行
    next();
  } else if (!token) {
    // 如果没有 token 且目标路径不是登录页面，重定向到登录页面
    message.warn("用户失效，请重新登录");
    next('/login');
  } else {
    // 如果有 token，继续导航
    next();
  }
});

router.afterEach((to, from, next) => {
  NProgress.done();  // 完成进度条
});

export default router;
