<template>
    <i class="fa fa-moon-o" v-if="theme" @click="setTheme"></i>
    <i class="fa fa-sun-o" v-else @click="setTheme"></i>

</template>

<script setup>

import { storeToRefs } from 'pinia';
import {useStore} from '../stores/store'


const store=useStore()
let theme=storeToRefs(store).theme

store.loadTheme()

function setTheme(){
    store.setTheme()
}



</script>

<style></style>