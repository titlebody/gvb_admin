import { createRouter, createWebHistory } from 'vue-router';
import NProgress from "nprogress";
import 'nprogress/nprogress.css';
import { message } from 'ant-design-vue';
import { articleDetail } from '@/api/article_api';
import { ref } from 'vue'; // 引入 ref 用于创建响应式数据

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
        description: "管理后台首页，提供系统管理和用户管理功能。",
        keywords: "后台管理, 系统管理, 用户管理, 胡晨曦, 晨曦, 胡晨曦的博客"
      },
      children: [
        {
          path: "home",
          name: "home",
          component: () => import("../views/admin/home/home.vue"),
          meta: {
            title: "首页",
            description: "后台管理首页，展示系统概况和统计信息。",
            keywords: "首页, 管理, 统计, 胡晨曦, 晨曦, 胡晨曦的博客"
          }
        },
        {
          name: "personal-center",
          path: "personal_center",
          meta: {
            title: "个人中心",
            description: "用户个人中心，管理个人信息和设置。",
            keywords: "个人中心, 用户信息, 胡晨曦, 晨曦, 胡晨曦的博客"
          },
          children: [{
            path: "user_center",
            name: "user_center",
            component: () => import( "../views/admin/user_mgr/user_center.vue"),
            meta: {
              title: "个人信息",
              description: "查看和编辑个人信息。",
              keywords: "个人信息, 编辑, 胡晨曦, 晨曦, 胡晨曦的博客"
            }
          },]
        },
        {
          name: "user-management",
          path: "user-management",
          meta: {
            title: "用户管理",
            description: "管理系统用户，查看用户列表和权限设置。",
            keywords: "用户管理, 用户列表, 胡晨曦, 晨曦, 胡晨曦的博客"
          },
          children: [
            {
              path: "user_list",
              name: "user_list",
              component: () => import("../views/admin/user_mgr/user_list.vue"),
              meta: {
                title: "用户列表",
                description: "查看系统用户列表，进行用户管理。",
                keywords: "用户列表, 管理, 胡晨曦, 晨曦, 胡晨曦的博客"
              }
            },
          ]
        },
        {
          name: "article-management",
          path: "article-management",
          meta: {
            title: "文图管理",
            description: "管理系统文章和图片，进行文章添加、管理和图片管理。",
            keywords: "文图管理, 文章管理, 图片管理, 胡晨曦, 晨曦, 胡晨曦的博客"
          },
          children: [
            {
              path: "artice_add",
              name: "artice_add",
              component: () => import("../views/admin/artice_mgr/artice_add.vue"),
              meta: {
                title: "添加文章",
                description: "添加新的文章，进行文章管理和编辑。",
                keywords: "添加文章, 文章管理, 编辑, 胡晨曦, 晨曦, 胡晨曦的博客"
              }
            },
            {
              path: "artice_center",
              name: "artice_center",
              component: () => import("../views/admin/artice_mgr/artice_center.vue"),
              meta: {
                title: "文章管理",
                description: "管理系统文章，进行文章管理和编辑。",
                keywords: "文章管理, 文章, 管理, 编辑, 胡晨曦, 晨曦, 胡晨曦的博客"
              }
            },
            {
              path: "image_list",
              name: "image_list",
              component: () => import("../views/admin/image_mgr/image_list.vue"),
              meta: {
                title: "图片管理",
                description: "管理系统图片，进行图片管理和编辑。",
                keywords: "图片管理, 图片, 管理, 编辑, 胡晨曦, 晨曦, 胡晨曦的博客"
              }
            },
            {
              path: "comment_center",
              name: "comment_center",
              component: () => import("../views/admin/comment_mgr/comment_center.vue"),
              meta: {
                title: "评论管理",
                description: "管理系统评论，进行评论管理和编辑。",
                keywords: "评论管理, 评论, 管理, 编辑, 胡晨曦, 晨曦, 胡晨曦的博客"
              }
            },
            {
              path: "adverts_list",
              name: "adverts_list",
              component: () => import("../views/admin/adverts_mgr/adverts_list.vue"),
              meta: {
                title: "广告管理",
                description: "管理系统广告，进行广告管理和编辑。",
                keywords: "广告管理, 广告, 管理, 编辑, 胡晨曦, 晨曦, 胡晨曦的博客"
              }
            },
            {
              path: "menus_list",
              name: "menus_list",
              component: () => import("@/views/admin/menus_mgr/mens_list.vue"),
              meta: {
                title: "菜单管理",
                description: "管理系统菜单，进行菜单管理和编辑。",
                keywords: "菜单管理, 菜单, 管理, 编辑, 胡晨曦, 晨曦, 胡晨曦的博客"
              }
            },
          ]
        },
        {
          name: "system-management",
          path: "system-management",
          meta: {
            title: "系统管理",
            description: "管理系统配置，进行系统配置和管理。",
            keywords: "系统管理, 系统配置, 管理, 胡晨曦, 晨曦, 胡晨曦的博客"
          },
          children: [
            {
              path: "system_config",
              name: "system_config",
              component: () => import("../views/admin/system_mgr/system_list.vue"),
              meta: {
                title: "系统配置",
                description: "管理系统配置，进行系统配置和管理。",
                keywords: "系统配置, 系统, 配置, 管理, 胡晨曦, 晨曦, 胡晨曦的博客"
              }
            },
          ]
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login.vue"),
      meta: {
        title: "登录",
        description: "用户登录页面，输入凭证以访问系统。",
        keywords: "登录, 用户认证, 胡晨曦, 晨曦, 胡晨曦的博客"
      }
    },
    {
      path: "/",
      name: "index_base",
      component: () => import("../views/web/web.vue"),
      children: [
        {
          path: '',
          name: "index",
          component: () => import("../views/web/index.vue"),
          meta: {
            title: "晨曦的博客首页 - 学习与分享",
            description: "欢迎来到我的博客，分享编程、技术和生活的点滴。",
            keywords: "博客, 编程, 技术, 教程, 学习, 胡晨曦, 晨曦, 胡晨曦的博客"
          }
        },
        {
          path: 'news',
          name: "news",
          component: () => import("../views/web/news_view.vue"),
          meta: {
            title: "新闻",
            description: "最新的技术新闻和动态。",
            keywords: "新闻, 技术动态, 胡晨曦, 晨曦, 胡晨曦的博客"
          }
        },
        {
          path: 'article/:id',
          name: "article",
          component: () => import("../views/web/article_item.vue"),
          meta: {
            title: "文章详情",
            description: "查看文章的详细内容。",
            keywords: "文章, 详情, 胡晨曦, 晨曦, 胡晨曦的博客"
          }
        }
      ]
    },

  ]
});

// 创建响应式的文章标题数据
const articleTitle = ref('默认文章标题（可替换为合适的通用标题）');

// 路由守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start();  // 开始进度条

  // 判断是否登录
  const token = localStorage.getItem('token');

  // 检查目标路径是否需要 token
  const requiresAuth = to.path.startsWith('/admin');

  if (requiresAuth &&!token) {
    // 如果需要 token 但没有，重定向到登录页面
    message.warn("用户失效，请重新登录");
    next('/login');
  } else {
    // 如果目标路径是文章详情页
    if (to.name === 'article') {
      try {
        const article = await articleDetail(to.params.id); // 确保这是一个异步调用
        if (article && article.data && article.data.title) {
          articleTitle.value = article.data.title; // 更新响应式标题数据
          // 同样可以在这里处理其他 meta 信息的更新，更新对应的响应式数据，然后在组件的合适生命周期钩子（如 mounted）里操作 DOM 设置 meta
        } else {
          console.error("获取文章详情成功，但文章数据结构不符合预期，无法设置标题");
        }
      } catch (error) {
        console.error("获取文章失败:", error);
      }
    }
    next(vm => {
      // 在组件实例创建完成后，将响应式的标题数据赋值给 document.title，利用 Vue 的响应式更新机制确保标题正确显示
      document.title = vm.articleTitle.value; 
    });
  }
});

router.afterEach((to, from) => {
  NProgress.done();  // 完成进度条
});

export default router;