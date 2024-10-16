<script setup>

import { useUserStore} from './stores/user'

const user = useUserStore()
user.loadUserInfo()

</script>

<template>
  <router-view></router-view>

</template>

<style lang="scss">
@import 'assets/css/iconfont.css';
@import './assets/css/theme.css';
@import 'font-awesome/css/font-awesome.min.css';

*{
  padding:0;
  margin:0;
  box-sizing: border-box;
}

:root {
  --active:#2184fc;
  --text:#555;
}



</style>
