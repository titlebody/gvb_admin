<template>
  <a-card>
    <div aria-hidden="true">
      <a-modal title="上传图片" v-model:open="data.addopen" @ok="addOk">
        <a-upload
          v-model:file-list="data.fileList"
          action="/api/images"
          list-type="picture-card"
          name="images"
          @preview="handlePreview"
          multiple
        >
          <plus-outlined />
        </a-upload>
        <a-modal
          :open="previewVisible"
          :title="previewTitle"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-modal>
      <a-modal v-model:open="data.open" title="编辑图片" @ok="updateOk">
        <a-form
          :model="updateState"
          name="basic"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          :rules="uprules"
          ref="refUpdae"
        >
          <a-form-item label="图片名称" name="name">
            <a-input v-model:value="updateState.name" placeholder="图片名称" />
          </a-form-item>
          <a-form-item label="图片预览">
            <img
              :src="'/' + updateState.path"
              alt=""
              height="80"
              style="border-radius: 10px"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </div>

    <gvb_table
      ref="gvbTable"
      @delete="Del"
      :columns="data.columns"
      :list="data.list"
      like_title="请输入图片名称"
      base-url="images"
      isDel
      isDels
      :page_size="1"
      defaultDelFun
    >
      <template #add>
        <a-button type="primary" @click="data.addopen = true"
          >上传图片</a-button
        >
      </template>
      <template #edit="{ record }">
        <a-button class="gvb_btn update" type="primary" @click="upModal(record)"
          >编辑</a-button
        >
      </template>
      <template #cell="{ column, record }">
        <template v-if="column.key === 'path'">
          <img
            :src="'/' + record.path"
            height="60"
            style="border-radius: 10px"
          />
        </template>
      </template>
    </gvb_table>
  </a-card>
</template>
    
  <script setup>
import { reactive, ref } from "vue";
import gvb_table from "@/components/admin/gvb_table.vue";
import { imageUpdateName } from "@/api/image_api";
import { message } from "ant-design-vue";
import { PlusOutlined } from "@ant-design/icons-vue";

const data = reactive({
  columns: [
    { title: "id", dataIndex: "id", key: "id" },
    { title: "名称", dataIndex: "name", key: "name" },
    { title: "路径", dataIndex: "path", key: "path" },
    { title: "类型", dataIndex: "image_type", key: "image_type" },
    { title: "上传时间", dataIndex: "created_at", key: "created_at" },
    { title: "操作", dataIndex: "action", key: "action" },
  ], //表格标题
  open: false,
  addopen: false,
  fileList: [],
});

const updateState = reactive({
  id: "",
  name: "",
  path: "",
});
// 接收子组件抛出的方法
let gvbTable = ref(null);

// 删除图片
function Del(id_list) {
  console.log(id_list);
}

// 提交添加
function addOk() {
  data.addopen = false;
  gvbTable.value.getdata();
}

// 编辑图片

function upModal(record) {
  data.open = true;
  updateState.id = record.id;
  updateState.name = record.name;
  updateState.path = record.path;
}

// 校验

let uprules = {
  name: [{ required: true, message: "请输入照片名称", trigger: "change" }],
};

let refForm = ref(null);
let refUpdae = ref(null);

//修改提交

async function updateOk() {
  try {
    refUpdae.value.validate();
    let res = await imageUpdateName(updateState);
    if (res.code) {
      message.error(res.msg);
      return;
    }
    message.success(res.msg);
    data.open = false;
    gvbTable.value.getdata();
  } catch (error) {
    console.log(error);
  }
}
</script>
    
  <style lang="scss">
</style>