<template>
  <div>
    <a-card title="菜单列表">
      <a-modal v-model:open="data.addOpen" title="添加菜单" @ok="addOk">
        <a-form
            :model="modelForm.addFormState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
        >
          <a-form-item
              label="菜单名称"
              name="title"
              :rules="[{ required: true, message: '请填写菜单名!' }]"
          >
            <a-input v-model:value="modelForm.addFormState.title" />
          </a-form-item>
          <a-form-item
              label="菜单路径"
              name="title"
              :rules="[{ required: true, message: '请填写菜单路径!' }]"
          >
            <a-input v-model:value="modelForm.addFormState.path" />
          </a-form-item>
          <a-form-item
              label="菜单简介"
              name="title"
              :rules="[{ required: true, message: '请填写菜单简介!' }]"
          >
            <a-input v-model:value="modelForm.addFormState.slogan" />
          </a-form-item>
          <a-form-item
              label="菜单介绍( , 分割)"
              name="title"
              :rules="[{ required: true, message: '请填写菜单介绍!' }]"
          >
            <a-input v-model:value="modelForm.addFormState.abstract" />
          </a-form-item>
          <a-form-item
              label="菜单图片id"
              name="title"
              :rules="[{ required: true, message: '请填写菜单图片!' }]"
          >
            <a-input v-model:value="modelForm.addFormState.images_sort_list[0].image_id" />
          </a-form-item>
        </a-form>
      </a-modal>
      <a-modal v-model:open="editOpen" title="编辑菜单" @ok="editOk(modelForm.editFormState.id)">
        <a-form
            :model="modelForm.editFormState"
            name="basic"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
        >
          <a-form-item
              label="菜单名称"
              name="title"
              :rules="[{ required: true, message: '请填写菜单名!' }]"
          >
            <a-input v-model:value="modelForm.editFormState.title" />
          </a-form-item>
          <a-form-item
              label="菜单路径"
              name="title"
              :rules="[{ required: true, message: '请填写菜单路径!' }]"
          >
            <a-input v-model:value="modelForm.editFormState.path" />
          </a-form-item>
          <a-form-item
              label="菜单简介"
              name="title"
              :rules="[{ required: true, message: '请填写菜单简介!' }]"
          >
            <a-input v-model:value="modelForm.editFormState.slogan" />
          </a-form-item>
          <a-form-item
              label="菜单介绍( , 分割)"
              name="title"
              :rules="[{ required: true, message: '请填写菜单介绍!' }]"
          >
            <a-input v-model:value="modelForm.editFormState.abstract" />
          </a-form-item>
          <a-form-item
              label="菜单图片id"
              name="title"
              :rules="[{ required: true, message: '请填写菜单图片!' }]"
          >
            <a-input v-model:value="modelForm.editFormState.banners[0].id" />
          </a-form-item>
        </a-form>

      </a-modal>
      <gvb_table
          :columns="data.columns"
          :base-url="data.baseUrl"
          isDel
          isDels
          defaultDelFun
          ref="gvbTable"
      >
        <template #add>
          <a-button type="primary" @click="data.addOpen=true">添加菜单</a-button>
        </template>
        <template #edit="{record}">
          <a-button type="primary" @click="editOpenModel(record)">编辑</a-button>
        </template>
      </gvb_table>

    </a-card>

  </div>

</template>
<script setup>
import gvb_table from '@/components/admin/gvb_table.vue';
import {reactive, ref} from 'vue';
import {addMenu,editMenu} from "@/api/menu_api.js";
import {message} from "ant-design-vue";


let data=reactive({
    addOpen:false,
    baseUrl:"menus",
    columns:[
        { title: "序号", dataIndex: "index", key: "index" },
        { title: "名称", dataIndex: "title", key: "title" },
        { title: "路径", dataIndex: "path", key: "path" },
        { title: "简介", dataIndex: "slogan", key: "slogan" },
        { title: "背景", dataIndex: "banners", key: "banners" },
        { title: "介绍语", dataIndex: "abstract", key: "abstract" },
        { title: "操作", dataIndex: "action", key: "action" },
    ],
})

// 接收子组件抛出的方法
let gvbTable = ref(null);

let editOpen =ref(false)

// 添加表单

const modelForm=reactive({
  addFormState:{
    title:"",
    path:"",
    slogan:"",
    abstract:[],
    sort:1,
    images_sort_list:
      [{
        image_id:0,
        sort:1
      }]
  },
  editFormState:{
    id:'',
    title:"",
    path:"",
    slogan:"",
    abstract:[],
    sort:1,
    banners:
        [{
          image_id:0,
          sort:1
        }]
  }
})

// 添加okmodel
const addOk= async ()=>{
  modelForm.addFormState.images_sort_list[0].image_id=Number(modelForm.addFormState.images_sort_list[0].image_id)
  let res=await addMenu(modelForm.addFormState)
  if (res.code === 0){
    message.success(res.msg)
    gvbTable.value.getdata()
  }else {
    message.error(res.msg)
  }
  data.addOpen=false
}

// 打开修改model
const editOpenModel=(e)=>{
  editOpen.value=true
  modelForm.editFormState.title=e.title
  modelForm.editFormState.path=e.path
  modelForm.editFormState.slogan=e.slogan
  modelForm.editFormState.abstract=e.abstract.join(',')
  modelForm.editFormState.sort=e.sort
  modelForm.editFormState.banners=e.banners
  modelForm.editFormState.id=e.id
}

// 编辑okmodel
const editOk=async (id)=>{
  let data={
    title:modelForm.editFormState.title,
    path:modelForm.editFormState.path,
    slogan:modelForm.editFormState.slogan,
    abstract:modelForm.editFormState.abstract.split(',').map(item=>item.trim()),
    sort:modelForm.editFormState.sort,
    images_sort_list:[
        {
          image_id:Number(modelForm.editFormState.banners[0].id),
          sort:1
        }
    ]

  }
  let res=await editMenu(id,data)
  if (res.code === 0){
    await gvbTable.value.getdata()
    message.success(res.msg)
  }else {
    message.error(res.msg)
  }
  editOpen.value=false

}


</script>
<style lang="less" scoped>
</style>