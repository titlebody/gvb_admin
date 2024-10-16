import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('gvb', () => {
  let theme = ref(true)
  

  //切换模式
  let setTheme = () => {
    theme.value = !theme.value
    if (theme.value) {
      // 浅色主题
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      // 深色主题
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }
  // 加载模式
  let loadTheme = () => {
    let themes = localStorage.getItem("theme")
    if (themes == "light") {
      theme.value = false
      setTheme()
      return
    }
    theme.value = true
    setTheme()
  }


  return {
    theme,
    setTheme,
    loadTheme
  }
})
