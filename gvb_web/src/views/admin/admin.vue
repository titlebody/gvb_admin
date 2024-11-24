<template>
  <div class="gvb_admin">
    <gvb_aside></gvb_aside>

    <div class="main">
      <header>
        <div class="left">
          <gvb_breadcrumb></gvb_breadcrumb>
        </div>
        <div class="right">
          <div class="icon_actions flex justify-center items-center">
            <router-link :to="{name:'index'}"><i class="fa fa-home"></i></router-link>
            <gvb_theme></gvb_theme>
            <gvb_full_screen></gvb_full_screen>
          </div>
          <gvb_user_info :isAvatar="true"></gvb_user_info>
        </div>
      </header>
      <div class="tabs">
        <gvb_tabs></gvb_tabs>
      </div>
      <main>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import gvb_theme from "../../components/gvb_theme.vue";
import gvb_aside from "../../components/admin/gvb_aside.vue";
import gvb_full_screen from "@/components/gvb_full_screen.vue";
import gvb_user_info from "@/components/gvb_user_info.vue";
import gvb_tabs from "@/components/admin/gvb_tabs.vue";
import { useStore } from "@/stores/store";
import gvb_breadcrumb from "@/components/admin/gvb_breadcrumb.vue";

const store = useStore();
store.getTabs()
</script>



<style lang="scss" scoped>
.gvb_admin {
  width: 100%;
  display: flex;
  color: var(--textColor);

  .main {
    width: calc(100% - 240px);
    overflow-y: auto;
    background-color: var(--order);
    overflow-x: hidden;

    header {
      height: 60px;
      background-color: var(--bg);
      display: flex;
      justify-content: space-between;
      padding: 0 20px;

      .left {
        align-content: center;
      }

      .right {
        display: flex;
        align-items: center;

        .icon_actions {
          margin-right: 20px;
          background-color: var(--bg);

          i {
            margin-left: 10px;
            cursor: pointer;
            color: var(--textColor);
          }

          i:hover {
            color: var(--active);
          }
        }

        .avatar {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }

        .drop_menu {
          margin-left: 20px;

          a {
            color: var(--active);
          }
        }
      }
    }

    .tabs {
      height: 30px;
      border: 1px solid var(--order);
      background-color: var(--bg);
    }

    main {
      background-color: var(--order);
      padding: 20px;
    }
  }
}
</style>


<style>
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
/* 组件加载后 */
.fade-enter-to{
    transform: translateX(0px);
    opacity: 1;
}
/* 组件消失后 */
.fade-leave-to{
    opacity: 0;
    transform: translateX(20px);
}

/* 组件消失前后之间 */
/* .fade-leave-active {
  transform: translateX(20px);
  opacity: 0;
} */


/* 加载销毁添加过度 */
.fade-leave-active,.fade-enter-active{
    transition: all .5s ease-out;
}
</style>