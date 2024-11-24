import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { theme } from 'ant-design-vue'
import variables from "@/assets/css/variables.module.scss";

/**
 * app 配置 开启持久化
 */
// 定义一个名为app的存储器，用于管理应用的主题和暗黑模式状态
export const useAppStore = defineStore(
  'app',
  () => {
    // 主题名称，默认为'red'
    const themeName = ref('blue')
    // 颜色模式，默认为'light'
    const darkMode = ref('light')

    // 计算属性，用于动态设置和获取暗黑模式，同时更新HTML根元素的data-dark属性
    const darkModeComp = computed(() => {
      document.documentElement.setAttribute('data-dark', darkMode.value)
      return darkMode.value
    })

    // 计算属性，用于动态设置和获取主题配置，同时更新HTML根元素的data-theme属性
    const themeConfig = computed(() => {
      document.documentElement.setAttribute('data-theme', themeName.value)
      // 主题配置
      return {
        token: {
          colorPrimary: variables[themeName.value] || '#27ba9b',
          colorSuccess: '#1dc779',
          colorWarning: '#ffb302',
          colorError: '#cf4444',
          colorInfo: variables[themeName.value] || '#27ba9b',
          wireframe: true
        },
        algorithm: darkMode.value === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm
      }
    })

    // 设置主题名称的方法
    const setThemeName = value => {
      themeName.value = value
    }

    // 切换暗黑模式的方法
    const toggleDarkMode = () => {
      darkMode.value = darkMode.value === 'light' ? 'dark' : 'light'
    }

    // 返回定义的属性和方法
    return { themeName, themeConfig, darkMode, darkModeComp, setThemeName, toggleDarkMode }
  },
  {
    // 开启持久化，以便在页面刷新时保留状态
    persist: true
  }
)