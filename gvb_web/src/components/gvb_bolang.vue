<template>
  <div class="waves-effect">
    <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
         viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
      <defs>
        <path id="gentle_wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
      <g class="parallax">
        <use xlink:href="#gentle_wave" x="48" y="0" :fill="waveColors[0]" />
        <use xlink:href="#gentle_wave" x="48" y="3" :fill="waveColors[1]" />
        <use xlink:href="#gentle_wave" x="48" y="5" :fill="waveColors[2]" />
        <use xlink:href="#gentle_wave" x="48" y="7" :fill="waveColors[3]" />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const waveColors = ref([
  'var(--wave-color-1)',
  'var(--wave-color-2)',
  'var(--wave-color-3)',
  'var(--wave-color-4)'
]);
</script>

<style>
.waves-effect {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 2;
}

.waves {
  position: relative;
  width: 100%;
  height: 15vh;
  min-height: 100px;
  max-height: 150px;
}

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
  width: 100%; /* 确保use元素有宽度 */
}

.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
</style>