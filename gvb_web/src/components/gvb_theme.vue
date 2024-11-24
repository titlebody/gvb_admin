<template>
  <img src="@/assets/img/月亮.svg" alt="" v-if="theme==='light'" @click="setTheme">
  <img src="@/assets/img/太阳.svg" alt="" v-else @click="setTheme">
</template>

<script setup>
import { storeToRefs } from "pinia";
import {onMounted,nextTick} from "vue";

import {useAppStore} from "../stores/app";
import {useStore} from "@/stores/store"
import {startSakura,stopp} from "@/assets/js/fullScreenFlower";


const store = useAppStore();
const useStores=useStore();

let theme = storeToRefs(store).darkMode;
function setTheme() {
  store.toggleDarkMode();
  useStores.setTheme()
  isShowSakura()
}

function isShowSakura(){
  theme.value==='light'?startSakura():stopp()
}
isShowSakura()

</script>

<style lang="scss">
img{
  width: 30px;
}
</style>