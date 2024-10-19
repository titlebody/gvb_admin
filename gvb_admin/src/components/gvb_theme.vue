<template>
  <i class="fa fa-moon-o" v-if="theme" @click="setTheme"></i>
  <i class="fa fa-sun-o" v-else @click="setTheme"></i>
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

<style></style>