import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('gvb', () => {
  let theme = ref(false)
  let tabs = ref([
    {
      title: "首页",
      name: "home",
    }
  ])


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
    if (themes == "dark") {
      theme.value = true
      setTheme()
      return
    }
    theme.value = false
    setTheme()
  }
  // 添加tabs的值
  function addTabs(item) {
    if (tabs.value.findIndex((value) => value.name === item.path) === -1) {
      tabs.value.push({
        title: item.title,
        name: item.path,
      });
    }
  }
  //持久化存储tabs
  function saveTabs() {
    localStorage.setItem("tabs", JSON.stringify(tabs.value))
  }
  // 加载tabs
  function getTabs() {
    let _tabs = localStorage.getItem("tabs")
    if (_tabs !== null) {
      tabs.value = JSON.parse(_tabs)
      return
    }
  }

  //删除tabs
  function removeTabs(item) {
    tabs.value = tabs.value.filter(value => value.name != item.name)
  }

  //删除全部tabs 保留home
  function removeAllTabs() {
    tabs.value = tabs.value.filter(value => value.name == "home")
  }


  return {
    theme,
    setTheme,
    loadTheme,
    tabs,
    addTabs,
    saveTabs,
    getTabs,
    removeTabs,
    removeAllTabs
  }
})
