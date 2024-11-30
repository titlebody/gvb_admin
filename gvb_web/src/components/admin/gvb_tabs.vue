<template>
  <div class="gvb_tabs" @wheel="handleScroll">
    <div class="gvb_tab_left" ref="tabContainer">
      <div
        :class="isActive(item)"
        class="gvb_tab_item"
        @click="checkTab(item)"
        v-for="item in store.tabs"
        :key="item.name"
      >
        {{ item.title }}
        <span
          class="gvb_tab_icon"
          v-if="item.name !== 'home'"
          @click.stop="delTabs(item)"
          >×</span
        >
      </div>
    </div>
    <div class="gvb_tab_right">
      <div class="gvb_tab_del" @click="allDelTabs()">删除全部</div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/stores/store";
import { ref } from "vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
const tabContainer = ref(null); // 引用tab容器

function isActive(item) {
  if (item.name === "home") {
    return "home";
  }
  if (item.name === route.name) {
    return "active";
  }
}

function checkTab(item) {
  router.push({ name: item.name });
}

window.onbeforeunload = function () {
  store.saveTabs();
  return undefined;
};

function delTabs(item) {
  store.removeTabs(item);
  if (route.name === item.name) {
    router.push({ name: store.tabs[store.tabs.length - 1].name });
  }
}

function allDelTabs() {
  store.removeAllTabs();
  router.push({ name: "home" });
}

// 处理鼠标滚动事件
function handleScroll(event) {
  event.preventDefault(); // 防止默认滚动行为
  const scrollAmount = event.deltaY > 0 ? 100 : -100; // 根据滚动方向设置滚动量
  tabContainer.value.scrollLeft += scrollAmount; // 调整滚动条位置
}
</script>

<style lang="scss">
.gvb_tabs {
  display: flex;
  justify-content: space-between;
  .gvb_tab_left {
    display: flex;
    overflow-x: auto; // 保持此行
    white-space: nowrap; // 保持此行
    scrollbar-width: thin; // Firefox
    scrollbar-color: #4a4a4a #e0e0e0; // 滚动条颜色和轨道颜色

    // Webkit浏览器（Chrome, Safari）
    &::-webkit-scrollbar {
      height: 10px; // 滚动条高度
    }
    &::-webkit-scrollbar-track {
      background: #e0e0e0; // 滚动条轨道颜色
      border-radius: 10px; // 轨道圆角
    }
    &::-webkit-scrollbar-thumb {
      background: #4a4a4a; // 滚动条颜色
      border-radius: 10px; // 滚动条圆角
      border: 2px solid transparent; // 添加透明边框以增加可见性
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #6a6a6a; // 滚动条悬停颜色
    }

    &:nth-child(1) {
      margin-left: 20px;
    }
    .home {
      background-color: rgb(90, 90, 231);
      color: white;
    }
    .gvb_tab_item {
      padding: 0 10px;
      text-align: center;
      line-height: 24px;
      height: 28px;
      border: 1px solid black;
      margin: 0 4px;
      border-radius: 10px;
      .gvb_tab_icon {
        cursor: pointer;
      }
    }
    .active {
      background-color: var(--active);
      color: white;
      border-color: var(--active);
    }
  }
  .gvb_tab_right {
    .gvb_tab_del {
      cursor: pointer;
      margin-right: 20px;
      line-height: 28px;
      background-color: rgb(247, 97, 97);
      width: 80px;
      text-align: center;
      border-radius: 10px;
      color: white;
    }
  }
}
</style>