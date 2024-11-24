<template>
    <a-card title="广告管理">
        <a-modal v-model:open="data.open" title="添加广告" @ok="handleOk">
            <a-form
            :model="formState"
            ref="refForm"
                >
                <a-form-item label="广告名称" 
                    :rules="[{ required: true, message: '请输入广告名称!',trigger: 'blur'}]"    >
                    <a-input v-model:value="formState.title" />
                </a-form-item>
                <a-form-item label="广告链接"
                    :rules="[{ required: true, message: '请输入广告链接!',trigger: 'blur'}]"    >
                    <a-input v-model:value="formState.href" />
                </a-form-item>
                <a-form-item label="广告封面"
                    :rules="[{ required: true, message: '请上传封面!',trigger: 'blur'}]"    >
                    <a-input v-model:value="formState.images" />
                </a-form-item>
                <a-form-item label="是否显示">
                    <a-switch v-model:checked="formState.is_show" />
                </a-form-item>
            </a-form>
        </a-modal>
        <gvb_table
        :baseUrl="data.baseUrl"
        :columns="data.columns"
        isDel
        like_title="搜索广告标题"
        ref="gvbTable"
        defaultDelFun
        >
        <template #add>
            <a-button type="primary" @click="data.open=true"
            >添加广告</a-button
        >
        </template>
        <template #is_show="{record}">
            <a-switch v-model:checked="record.is_show" @change="isShow(record)"/>
        </template>
        
    </gvb_table>
    </a-card>

</template>
<script setup>
import gvb_table from '@/components/admin/gvb_table.vue';
import { reactive, ref } from 'vue';
import {adverts_create,adverts_update}from '@/api/adverts_api'
import { message } from 'ant-design-vue';


let data=reactive({
    baseUrl:"adverts",
    columns:[
        { title: "序号", dataIndex: "index", key: "index" },
        { title: "广告名称", dataIndex: "title", key: "title" },
        { title: "链接", dataIndex: "href", key: "href" },
        { title: "封面", dataIndex: "images", key: "images" },
        { title: "是否显示", dataIndex: "is_show", key: "is_show" },
        { title: "操作", dataIndex: "action", key: "action" },
    ],
    open:false
})

// form 
let refForm=ref(null)
let gvbTable=ref(null)
// 添加form 数据

let formState=reactive({
    title:"",
    href:"",
    images:"",
    is_show:false,
})

// 控制添加mode的开启关闭
function updateOpen(){
    console
}
// 添加mode ok案件
async function handleOk(){
    let res=await adverts_create(formState)
    if(res.code!=0){
        message.error(res.data)
        return
    }
    data.open=false
    gvbTable.value.getdata();
    await message.success(res.msg);
}

let isShow=async(record)=>{
    let data={
        title:record.title,
        href:record.href,
        images:record.images,
        is_show:record.is_show
    }
    let res=await adverts_update(record.id,data)
    message.success(res.msg)

}


</script>