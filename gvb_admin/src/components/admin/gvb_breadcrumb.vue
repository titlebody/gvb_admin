<template>
  <a-breadcrumb>
    <template v-for="item in route.matched" :key="item">
      <a-breadcrumb-item v-if="item.name!='home'">{{
        item.meta?.title
      }}</a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script setup>
import { useRoute } from "vue-router";
let route = useRoute();
console.log(route);
</script>

<style lang="scss">
</style>