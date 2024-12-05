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
import { reactive, h, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/stores/store";


import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
  SettingOutlined,
  FileImageOutlined,
  UsergroupDeleteOutlined
} from "@ant-design/icons-vue";

let route = useRoute();
const state = reactive({
  collapsed: false,
  selectedKeys: [route.name],
});

const items = reactive([
  {
    key: "home",
    icon: () => h(PieChartOutlined),
    label: "首页",
    title: "首页",
    path: "home",
  },
  {
    key: "sub4",
    icon: () => h(UserOutlined),
    label: "个人中心",
    title: "个人中心",
    children: [
      {
        key: "user_center",
        label: "个人信息",
        title: "个人信息",
        path: "user_center",
      },
    ],
  },
  {
    key: "sub1",
    icon: () => h(UsergroupDeleteOutlined),
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
    label: "文图管理",
    title: "文图管理",
    children: [
      {
        key: "artice_add",
        label: "添加文章",
        title: "添加文章",
        path: "artice_add",
      },
      {
        key: "artice_center",
        label: "文章管理",
        title: "文章管理",
        path: "artice_center",
      },
      {
        key: "image_list",
        label: "图片管理",
        title: "图片管理",
        path: "image_list",
      },
      {
        key: "comment_center",
        label: "评论管理",
        title: "评论管理",
        path: "comment_center",
      },
      {
        key: "adverts_list",
        label: "广告管理",
        title: "广告管理",
        path: "adverts_list",
      },
      {
        key: "menus_list",
        label: "菜单管理",
        title: "菜单管理",
        path: "menus_list",
      },
      {
        key: "tabs_list",
        label: "标签管理",
        title: "标签管理",
        path: "tabs_list",
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

let router = useRouter();
let store = useStore();

function goto({ item }) {
  store.addTabs(item);
  router.push({ name: item.path });
}

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