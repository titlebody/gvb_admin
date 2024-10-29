<template>
    <router-view></router-view>
</template>

<script setup>
import { useMenuStore } from '@/stores/menus';



// 获取菜单
const menuStore = useMenuStore();
menuStore.initMenuNameList();
</script>

<style lang="scss">
.gvb_center {
  width: 100%;
  min-height: 1000px;
  display: flex;
  justify-content: center;
  .web_conter {
    width: 1200px;
    height: 100px;
    margin-top: 20px;
  }
}
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