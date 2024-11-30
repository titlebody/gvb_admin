<template>
    <a-card title="菜单列表">
        <gvb_table
            :columns="data.columns"
            :base-url="data.baseUrl"
            isDel
            isDels
            defaultDelFun
        >
            <template #add>
                <a-button type="primary">添加菜单</a-button>
            </template>
            <template #edit="{record}">
                <a-button type="primary">编辑</a-button>
            </template>
        </gvb_table>

    </a-card>
</template>
<script setup>
import gvb_table from '@/components/admin/gvb_table.vue';
import { reactive } from 'vue';


let data=reactive({
    baseUrl:"menus",
    columns:[
        { title: "序号", dataIndex: "index", key: "index" },
        { title: "名称", dataIndex: "title", key: "title" },
        { title: "路径", dataIndex: "path", key: "path" },
        { title: "简介", dataIndex: "slogan", key: "slogan" },
        { title: "背景", dataIndex: "banners", key: "banners" },
        { title: "介绍语", dataIndex: "abstract", key: "abstract" },
        { title: "操作", dataIndex: "action", key: "action" },
    ]
})
</script>
<style lang="less" scoped>
</style>