<template>
    <div id="meteor-container" @mouseenter="stopMeteors" @mouseleave="startMeteors">
      <div v-for="meteor in meteors" :key="meteor.id" 
           class="meteor" 
           :style="{
             left: meteor.x + 'px',
             animationDuration: meteor.duration + 's',
             animationDelay: meteor.delay + 's'
           }"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        meteors: [],
        meteorId: 0,
        meteorInterval: null,
      };
    },
    methods: {
      createMeteor() {
        const meteor = {
          id: this.meteorId++,
          x: Math.random() * window.innerWidth,
          duration: Math.random() * 2 + 1, // 1-3秒之间
          delay: Math.random() * 2, // 0-2秒之间
        };
        this.meteors.push(meteor);
  
        // 在动画结束后移除流星
        setTimeout(() => {
          this.meteors = this.meteors.filter(m => m.id !== meteor.id);
        }, (meteor.duration + meteor.delay) * 1000);
      },
      startMeteors() {
        this.meteorInterval = setInterval(this.createMeteor, 300); // 每300毫秒生成一个流星
      },
      stopMeteors() {
        clearInterval(this.meteorInterval);
      }
    },
    mounted() {
      this.startMeteors();
    },
    beforeDestroy() {
      clearInterval(this.meteorInterval);
    }
  };
  </script>
  
  <style scoped>

  
  .meteor {
    position: absolute;
    width: 2px;
    height: 100px;
    background: linear-gradient(to bottom, white, rgba(255, 255, 255, 0));
    opacity: 0.8;
    animation: fall linear forwards;
  }
  
  @keyframes fall {
    0% {
      transform: translateY(100vh);
    }
    100% {
      transform: translateY(-100px);
    }
  }
  </style>