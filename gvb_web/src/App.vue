<script setup>
import { useUserStore } from "./stores/user";
import APlayer from "@/components/APlayer.vue";
import { useAppStore } from "@/stores/app.js";
import { useStore } from "./stores/store";


const app = useAppStore();

const user = useUserStore();
const store = useStore();

store.loadTheme()

user.loadUserInfo();
</script>

<template>
<weather></weather>
  <router-view></router-view>
  <a-config-provider :theme="app.themeConfig">
  </a-config-provider>
  <APlayer></APlayer>
</template>

<style lang="scss">
@import "assets/css/iconfont.css";
@import "./assets/css/theme.css";
@import "font-awesome/css/font-awesome.min.css";
@import "./assets/css/style.css";

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

:root {
  --active: #2184fc;
  --text: #555;
}
a {
  text-decoration: none;
}
</style>
