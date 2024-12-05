<script setup>


import Gvb_table from "@/components/admin/gvb_table.vue";
import {addTags,editTags} from "@/api/tags_api.js"
import {reactive, ref} from "vue";
import {message} from "ant-design-vue";
const data=reactive({
  addOpen:false,
  editOpen:false,
  baseUrl:'/tags',
  columns:[
    {
      title: 'ID',
      dataIndex:'id',
      key:'id',
      width:50,
      align:'center'
    },
    {
      title:'标签名称',
      dataIndex:'title',
      key:'title',
      width:150,
      align:'center'
    },
    {
      title:'文章数',
      dataIndex:'article_count',
      key:'article_count',
      align:'center'
    },
    {
      title:'创建时间',
      dataIndex:'created_at',
      key:'created_at',
      align:'center'
    },
    {
      title:'操作',
      dataIndex:'action',
      key:'action',
      align:'center',
      width:400,
      scopedSlots:{customRender:'action'}
    }
  ]

})

// 获取dom 元素
let gvbTable=ref(null)

// 添加标题
let formData={
  title:''
}
async function addOk(){
  let res=await addTags(formData)
  if (res.code===0){
    message.success(res.msg)
    await gvbTable.value.getdata()
    data.addOpen=false
  }else {
    message.error(res.data)
  }
}
// 编辑
let editData={
  id:'',
  title:''
}
async function editOpen(record){
  data.editOpen=true
  editData=record
}

async function editOk(){
  let res=await editTags(editData.id,editData)
  if (res.code===0){
    message.success(res.msg)
    await gvbTable.value.getdata()
    data.editOpen=false
  }else {
    message.error(res.data)
  }
}
</script>

<template>
  <div>
    <a-card title="标签管理">
      <a-modal v-model:open="data.addOpen" title="添加标签" @ok="addOk">
        <a-form :model="formData">
          <a-form-item
              label="标签名称"
              :rules="[{ required: true, message: '请填写标签名!' }]"
          >
            <a-input
                v-model:value="formData.title"
            ></a-input>
          </a-form-item>
        </a-form>
      </a-modal>
      <a-modal v-model:open="data.editOpen" title="编辑标签" @ok="editOk">
        <a-form :model="formData">
          <a-form-item>
            <a-input v-model:value="editData.title"></a-input>
          </a-form-item>
        </a-form>
      </a-modal>
      <gvb_table
          :baseUrl="data.baseUrl"
          :columns="data.columns"
          isDel
          like_title="搜索标签名称"
          ref="gvbTable"
          defaultDelFun
      >
        <template #add>
          <a-button type="primary" @click="data.addOpen=true">添加标签</a-button>
        </template>
        <template #edit="{record}">
          <a-button type="primary" class="mr-2" @click="editOpen(record)">编辑</a-button>
        </template>
      </gvb_table>
    </a-card>
  </div>


</template>

<style scoped lang="scss">

</style>