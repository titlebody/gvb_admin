<template>
  <div>
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <MenuUnfoldOutlined v-if="state.collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
    <a-menu
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="state.collapsed"
      :items="items"
      @click="goto"
    ></a-menu>
  </div>
</template>

<script setup>
import { reactive, h,watch } from "vue";
import { useRoute } from "vue-router";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
  SettingOutlined,
  FileImageOutlined,
} from "@ant-design/icons-vue";
let route = useRoute();

const state = reactive({
  collapsed: false,
  selectedKeys: [route.name],
});
const items = reactive([
  {
    key: "home", //路由名称
    icon: () => h(PieChartOutlined),
    label: "首页",
    title: "首页",
    path: "home",
  },
  {
    key: "sub1",
    icon: () => h(UserOutlined),
    label: "用户管理",
    title: "用户管理",
    children: [
      {
        key: "user_list",
        label: "用户列表",
        title: "用户列表",
        path: "user_list",
      },
    ],
  },
  {
    key: "sub3",
    icon: () => h(FileImageOutlined),
    label: "图片管理",
    title: "图片管理",
    children: [
      {
        key: "image_list",
        label: "图片列表",
        title: "图片列表",
        path: "image_list",
      },
    ],
  },
  {
    key: "sub2",
    icon: () => h(SettingOutlined),
    label: "系统管理",
    title: "系统管理",
    children: [
      {
        key: "system_config",
        label: "系统配置",
        title: "系统配置",
        path: "system_config",
      },
    ],
  },
]);

const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
};
import { useRouter } from "vue-router";
import { useStore } from "@/stores/store";
let router = useRouter();
let store = useStore();

function goto({ item }) {
  // 加入到useStore.tabs中
  store.addTabs(item)
  router.push({ name: item.path });
}

// 监听路由变化对selectedKeys从新赋值route.name
watch(
  () => route.name,
  (newName) => {
    if (newName) {
      state.selectedKeys = [newName];
    }
  },
  { immediate: true }
);

</script>

<style lang="scss">
</style>