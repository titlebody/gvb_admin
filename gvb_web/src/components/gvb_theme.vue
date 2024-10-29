<template>
  <img src="@/assets/img/月亮.svg" alt="" v-if="theme" @click="setTheme">
  <img src="@/assets/img/太阳.svg" alt="" v-else @click="setTheme">
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useStore } from "../stores/store";

const store = useStore();
store.loadTheme();
let theme = storeToRefs(store).theme;

function setTheme() {
  store.setTheme();
}
</script>

<style lang="scss">
img{
  width: 30px;
}
</style>