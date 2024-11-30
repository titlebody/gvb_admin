<template>
  <div class="gvb_navs">
    <div class="gvb_conter">
      <div class="logo">
        <div>晨曦知道</div>
        <div>CHENXIZHIDAO</div>
      </div>
      <div class="left">
        <span v-for="item in menuStore.menuNameList" :key="item.id">
          <router-link :to="item.path">
            <span :class="{ active: $route.path === item.path }">
              {{ item.title }}
            </span>
          </router-link></span
        >
        <span class="search"><i class="fa fa-search"></i></span>
      </div>
      <div class="right">
        <span v-if="userStore.userInfo.role === 0">
          <router-link
            :to="{ name: 'login', query: { redirect_url: $route.path } }"
            >登录</router-link
          >
        </span>
        <gvb_user_info isAvatar v-else></gvb_user_info>
        <gvb_theme></gvb_theme>
        <gvb_weather></gvb_weather>
      </div>
    </div>
  </div>
</template>

<script setup >
import gvb_theme from "@/components/gvb_theme.vue";
import gvb_user_info from "@/components/gvb_user_info.vue";
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";
import { useMenuStore } from "@/stores/menus";
import gvb_weather from "@/components/gvb_weather.vue";


let menuStore = useMenuStore();



let userStore = useUserStore();

async function gvb_nav_init() {
  if (props.isShow) {
    await window.addEventListener("scroll", function () {
      let scrollTop = document.documentElement.scrollTop;
      let gvbnavs = document.querySelector(".gvb_navs");
      if (gvbnavs) {
        if (scrollTop > 200) {
          document.querySelector(".gvb_navs").classList.add("web_nav_show");
        } else {
          document.querySelector(".gvb_navs").classList.remove("web_nav_show");
        }
      }
    });
  } else {
    await document.querySelector(".gvb_navs").classList.add("web_nav_show");
  }
}

let props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  gvb_nav_init();
});
</script>

<style lang="less" scoped>
.active {
  color: var(--active) !important; /* 你可以根据需要更改颜色 */
}
.gvb_navs {
  position: fixed;
  top: 0;
  background-color: transparent;
  height: 60px;
  width: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  z-index: 100;
  .gvb_conter {
    width: 1200px;
    display: flex;
    .logo {
      width: 10%;
      transform: scale(0.8);
      div:first-child {
        font-size: 23px;
      }
      div:last-child {
        font-size: 12px;
      }
    }

    .left {
      width: 60%;
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
        a {
          color: white;
          &:hover {
            color: var(--active) !important;
          }
        }
      }
      .search {
        cursor: pointer;
        margin-left: 25px;
        i {
          color: white;
        }
      }
    }
    .right {
      width: 26%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      a {
        color: white;
      }
    }
  }
}
.web_nav_show {
  color: var(--textColor) !important;
  background-color: var(--bg) !important;
  box-shadow: 1px 1px 5px #0003;
  a {
    color: var(--textColor) !important;
  }
  i {
    color: var(--textColor) !important;
  }
}
</style>