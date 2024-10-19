<template>
  <div class="gvb_tabs">
    <div class="gvb_tab_left">
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

const store = useStore();
const route = useRoute();
const router = useRouter();

function isActive(item) {
  if (item.name === "home") {
    return "home";
  }
  if (item.name === route.name) {
    return "active";
  }
}
// 跳转
function checkTab(item) {
  router.push({ name: item.name });
}
// 刷新前保存tabs数据
window.onbeforeunload = function () {
  store.saveTabs();
  return undefined;
};
// 删除逻辑
function delTabs(item) {
  store.removeTabs(item);
  // 删除当前页跳转到当前tabs的上一个页面
  if (route.name === item.name) {
    router.push({ name: store.tabs[store.tabs.length - 1].name });
  }
}
// 删除全部
function allDelTabs() {
  store.removeAllTabs();
  router.push({ name: "home" });
}
</script>

<style lang="scss">
.gvb_tabs {
  display: flex;
  justify-content: space-between;
  .gvb_tab_left {
    display: flex;
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