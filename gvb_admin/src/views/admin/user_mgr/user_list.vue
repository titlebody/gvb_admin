<template>
  <a-card>
    <div aria-hidden="true">
      <a-modal
        v-model:open="data.open"
        title="添加用户"
        @ok="handleOk"
        @Cancel="handCancel"
      >
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          :rules="rules"
          ref="refForm"
        >
          <a-form-item label="用户名" name="user_name">
            <a-input v-model:value="formState.user_name" placeholder="用户名" />
          </a-form-item>
          <a-form-item label="昵称" name="nick_name">
            <a-input v-model:value="formState.nick_name" placeholder="昵称" />
          </a-form-item>
          <a-form-item label="密码" name="password">
            <a-input-password
              v-model:value="formState.password"
              placeholder="密码"
            />
          </a-form-item>
          <a-form-item label="确认密码" name="re_password">
            <a-input-password
              v-model:value="formState.re_password"
              placeholder="确认密码"
            />
          </a-form-item>
          <a-form-item label="权限" name="role">
            <a-select v-model:value="formState.role" placeholder="请选择权限">
              <a-select-option value="1">管理员</a-select-option>
              <a-select-option value="2">用户</a-select-option>
              <a-select-option value="3">游客</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-modal>
      <a-modal v-model:open="data.upopen" title="编辑用户" @ok="updateOk">
        <a-form
          :model="upFormState"
          name="basic"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          :rules="uprules"
          ref="refForm"
        >
          <a-form-item label="昵称" name="nick_name">
            <a-input v-model:value="upFormState.nick_name" placeholder="昵称" />
          </a-form-item>
          <a-form-item label="权限" name="role">
            <a-select v-model:value="upFormState.role" placeholder="请选择权限">
              <a-select-option value="1">管理员</a-select-option>
              <a-select-option value="2">用户</a-select-option>
              <a-select-option value="3">游客</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>

    <gvb_table
      ref="gvbTable"
      @delete="userDel"
      :columns="data.columns"
      :list="data.list"
      base-url="user_list"
      like_title="搜索昵称"
      isDel
      isDels
    >
      <template #add>
        <a-button type="primary" @click="showModal">创建用户</a-button>
      </template>
      <template #edit="{ record }">
        <a-button class="gvb_btn update" type="primary" @click="upModal(record)"
          >编辑</a-button
        >
      </template>
    </gvb_table>
  </a-card>
</template>
  
<script setup>
import { reactive, ref } from "vue";
import gvb_table from "@/components/admin/gvb_table.vue";

import { userCreate, userUpdate, userDelete } from "@/api/user_api";
import { message } from "ant-design-vue";

const data = reactive({
  open: false, // 添加框
  upopen: false, // 修改框
  columns: [
    { title: "id", dataIndex: "id", key: "id" },
    { title: "昵称", dataIndex: "nick_name", key: "nick_name" },
    { title: "头像", dataIndex: "avatar_id", key: "avatar_id" },
    { title: "邮箱", dataIndex: "email", key: "email" },
    { title: "角色", dataIndex: "role", key: "role" },
    { title: "地址", dataIndex: "addr", key: "addr" },
    { title: "ip", dataIndex: "ip", key: "ip" },
    { title: "注册时间", dataIndex: "created_at", key: "created_at" },
    { title: "注册来源", dataIndex: "sign_status", key: "sign_status" },
    { title: "操作", dataIndex: "action", key: "action" },
  ], //表格标题
});

let gvbTable = ref(null);
// 修改用户框form数据
let upFormState = reactive({
  user_id: "",
  nick_name: "",
  role: [],
});

// 创建用户提交
const handleOk = async () => {
  // 提交
  await refForm.value.validate().then(async () => {
    data.open = false;
    let datas = {
      nick_name: formState.nick_name,
      user_name: formState.user_name,
      password: formState.password,
      role: Number(formState.role),
    };
    await userCreate(datas).then(async (res) => {
      gvbTable.value.getdata();
      await message.success(res.msg);
    });
    resetForm();
  });
};

// 修改提交
const updateOk = () => {
  data.upopen = false;
  if (upFormState.role === "管理员") upFormState.role = "1";
  if (upFormState.role === "用户") upFormState.role = "2";
  if (upFormState.role === "游客") upFormState.role = "3";
  upFormState.role = Number(upFormState.role);
  userUpdate(upFormState).then(() => {
    gvbTable.value.getdata();
  });
};

// 添加表单
const formState = reactive({
  nick_name: "",
  user_name: "",
  password: "",
  //确认密码
  re_password: "",
  role: [],
});

// 文本重置操作
const resetForm = () => {
  formState.nick_name = "";
  formState.user_name = "";
  formState.password = "";
  formState.re_password = "";
  formState.role = [];
};

const validatePass = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("请再次输入密码");
  } else if (value !== formState.password) {
    return Promise.reject("两次输入的密码不一样");
  } else {
    return Promise.resolve();
  }
};

// 校验
let rules = {
  user_name: [
    { required: true, message: "请输入用户名", trigger: "change" },
    {
      min: 3,
      max: 9,
      message: "长度在 3 到 9 个字符",
      trigger: "blur",
    },
  ],
  nick_name: [
    { required: true, message: "请输入昵称", trigger: "change" },
    {
      min: 1,
      max: 6,
      message: "长度在 1 到 6 个字符",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "change" },
    {
      min: 6,
      max: 12,
      message: "长度在 6 到 12 个字符",
      trigger: "blur",
    },
  ],
  re_password: [
    {
      required: true,
      validator: validatePass,
      trigger: "change",
    },
  ],
  role: [{ required: true, message: "请选择权限", trigger: "change" }],
};

let uprules = {
  nick_name: [
    { required: true, message: "请输入昵称", trigger: "change" },
    {
      min: 1,
      max: 6,
      message: "长度在 1 到 6 个字符",
      trigger: "blur",
    },
  ],
  role: [{ required: true, message: "请选择权限", trigger: "change" }],
};

let refForm = ref(null);

// 显示添加mode框
const showModal = () => {
  data.open = true;
};
const handCancel = () => {
  data.open = false;
  resetForm();
};
// 显示修改mode框
const upModal = (record) => {
  data.upopen = true;
  upFormState.user_id = record.id;
  upFormState.nick_name = record.nick_name;
  upFormState.role = record.role;
};

// 删除单个用户
function userDel(id) {
  userDelete(id).then((res) => {
    message.success(res.msg);
    gvbTable.value.getdata();
  });
}
</script>
  
<style lang="scss">
</style>