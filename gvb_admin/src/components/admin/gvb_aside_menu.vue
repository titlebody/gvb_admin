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

import { reactive,h } from "vue";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
  SettingOutlined
} from "@ant-design/icons-vue";

const state = reactive({
  collapsed: false,
  selectedKeys: ["home"],
});
const items = reactive([
  {
    key: "home",   //路由名称
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
    key: "sub2",
    icon: () => h(SettingOutlined),
    label: "系统管理",
    title: "系统管理",
    children: [
      {
        key: "system_config",
        label: "系统配置",
        title: "系统配置",
        path:"system_config"
      }
    ],
  },
]);

const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
};
import { useRouter } from "vue-router";
let router = useRouter()
function goto({item}){
    router.push({name:item.path})
}

</script>

<style lang="scss">

</style>