<template>
  <i class="iconfont icon-quanping" @click="openFullscreen" v-if="!FullScreen"></i>
  <i class="iconfont icon-tuichuquanping" @click="exitFullScreen" v-else></i>
</template>

<script setup>
import { ref } from 'vue'

// 全屏
// 获取要全屏的元素
var FullScreen=ref(false)
var element = document.documentElement;


function openFullscreen() {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
    FullScreen.value=true
}

// 退出全屏

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
    FullScreen.value=false
}


</script>

<style>

</style>