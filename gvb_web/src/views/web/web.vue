<template>
    <gvb_nav isShow></gvb_nav>
    <router-view></router-view>
    <gvb_footer></gvb_footer>
    <!-- 流星雨 最低层 可点击图层下的元素 -->
    <transition name="fade"  v-if="isShowMeteor">
      <MeteorShower class="fixed top-0 left-0 w-full h-full z-50 pointer-events-none"></MeteorShower>
    </transition>
    
</template>

<script setup>
import { useMenuStore } from '@/stores/menus';
import gvb_footer from "@/components/web/gvb_footer.vue";
import MeteorShower from "@/components/MeteorShower.vue";
import {useAppStore} from "@/stores/app";
import {computed} from "vue";
import gvb_nav from '@/components/web/gvb_nav.vue';
const appStore = useAppStore();
let isShowMeteor = computed(()=>{
  return appStore.darkMode==='dark'
})


// 获取菜单
const menuStore = useMenuStore();
menuStore.initMenuNameList();
</script>

<style lang="scss">



body{
  background-color: var(--bodyBg) !important;
  position: relative;
  transition: background-color 0.3s,
  color 0.3s;
  html[data-dark='light'][data-theme='red'] & {
    background-color: red;
    color: #000;
  }
}


</style>