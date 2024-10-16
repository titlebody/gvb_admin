<template>
  <div class="gvb_container">
    <a-modal
      v-model:open="open"
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
    <a-modal v-model:open="upopen" title="编辑用户" @ok="updateOk">
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
    <div class="gvb_search">
      <a-input-search
        v-model:value="searchValue"
        placeholder="请输入用户名"
        style="width: 200px"
        @search="onSearch"
      />
    </div>
    <div class="gvb_actions">
      <a-button type="primary" @click="showModal">创建用户</a-button>
      <a-button
        type="default"
        v-if="data.selectedRowKeys.length"
        @click="deleteUser"
        >批量删除</a-button
      >
    </div>
    <div class="gvb_table">
      <a-spin tip="加载中..." :spinning="data.spinning" >
        <a-table
          :row-selection="rowSelection"
          :dataSource="data.list"
          :columns="data.columns"
          :pagination="false"
          rowKey="id"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'avatar_id'">
              <a-avatar :size="44" :src="record.avatar_id" />
            </template>
            <template v-if="column.key === 'created_at'">
              {{ formatTime(record.created_at) }}
            </template>
            <template v-if="column.key === 'action'">
              <a-button
                class="gvb_btn update"
                type="primary"
                @click="upModal(record.id, record.nick_name, record.role)"
                >编辑</a-button
              >
              <a-button
                class="gvb_btn del"
                danger
                @click="deluser(record.id)"
                v-if="data.selectedRowKeys.length <= 1"
                >删除</a-button
              >
            </template>
          </template>
        </a-table>
      </a-spin>
    </div>
    <div class="gvb_peage">
      <a-pagination
        @change="onChange"
        v-model:current="page.page"
        v-model:page-size="page.limit"
        :total="data.count"
        :show-total="(total) => `总共 ${total} 个`"
      />
    </div>
  </div>
</template>
  
  <script setup>
import { reactive, ref } from "vue";
import { formatTime } from "@/utils/date";
import {
  getUserList,
  userCreate,
  userDelete,
  userUpdate,
  searchUser,
} from "@/api/user_api";
import { message } from "ant-design-vue";



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

// 添加用户框
const open = ref(false);
// 显示添加mode框
const showModal = () => {
  open.value = true;
};
const handCancel = () => {
  open.value = false;
  resetForm();
};
// 显示修改mode框
const upModal = (id, nick_name, role) => {
  upopen.value = true;
  upFormState.user_id = id;
  (upFormState.nick_name = nick_name), (upFormState.role = role);
};
// 创建用户提交
const handleOk = async () => {
  // 提交
  await refForm.value.validate().then(async () => {
    open.value = false;
    let data = {
      nick_name: formState.nick_name,
      user_name: formState.user_name,
      password: formState.password,
      role: Number(formState.role),
    };
    await userCreate(data).then(async (res) => {
      await getdata();
      await message.success(res.msg);
    });
    resetForm();
  });
};
// 修改用户框
let upopen = ref(false);

let upFormState = reactive({
  user_id: "",
  nick_name: "",
  role: [],
});
// 修改提交
const updateOk = () => {
  upopen.value = false;
  console.log(upFormState);
  if (upFormState.role === "管理员") upFormState.role = "1";
  if (upFormState.role === "用户") upFormState.role = "2";
  if (upFormState.role === "游客") upFormState.role = "3";
  upFormState.role = Number(upFormState.role);
  userUpdate(upFormState).then((res) => {
    getdata();
  });
};

// 搜索框
let searchValue = ref("");

let page = reactive({
  page: 1,
  limit: 6,
});

const data = reactive({
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
  ],
  list: [
    {
      key: 3,
      created_at: "2024-10-10T20:25:21.681+08:00",
      updated_at: "2024-10-10T20:25:21.681+08:00",
      nick_name: "小红",
      user_name: "xiaohong",
      avatar_id:
        "https://tse2.mm.bing.net/th/id/OIP.3y3aVa2QU0tVj_-xZ1tZegAAAA?rs=1&pid=ImgDetMain",
      email: "2****@qq.com",
      tel: "",
      addr: "内网地址",
      token: "",
      ip: "127.0.0.1",
      role: "管理员",
      sign_status: "邮箱",
    }
  ],
  selectedRowKeys: [],
  count: 0,
  spinning:false
});

// 选中
const rowSelection = {
  onChange: (selectedRowKeys) => {
    data.selectedRowKeys = selectedRowKeys;
  },
};

// 获取用户列表
let getdata = async () => {
  data.spinning=true
  await getUserList(page).then((res) => {
    data.list = res.data.list;
    data.count = res.data.count;
    data.spinning=false
  });
};

getdata();

// 搜索
let onSearch = async () => {
  data.spinning=true
  if (searchValue.value == "") {
    getdata();
    return;
  }
  await searchUser(searchValue.value, page).then((res) => {
    data.list = res.data.list;
    data.count = res.data.list.length;
  });
  data.spinning=false
  
};
// 批量删除
let deleteUser = async () => {
  await userDelete(data.selectedRowKeys).then(async (res) => {
    await getdata();
    await message.success(res.msg);
  });
};
// 删除单个
let deluser = async (id) => {
  await userDelete([id]).then(async (res) => {
    await getdata();
    await message.success(res.msg);
  });
};

let onChange = (page, limit) => {
  console.log(page, limit);
  if (searchValue.value) {
    console.log("搜索");
    onSearch();
    return;
  }
  getdata();
  console.log("全部");
};
</script>
  
  <style lang="scss">
.gvb_container {
  .gvb_search {
    padding-bottom: 10px;
    border-bottom: 1px solid var(--order);
  }
  .gvb_actions {
    margin: 10px 0px;

    .ant-btn-primary {
      margin-right: 6px;
    }
  }
  .gvb_table {
    margin-bottom: 10px;
    .gvb_btn.update {
      margin-right: 4px;
    }
  }
  .gvb_peage {
    text-align: center;
  }
}
</style>