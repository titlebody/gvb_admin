<template>
  <a-card title="个人中心">
    <a-modal v-model:open="datas.upopen" title="修改昵称" @ok="updateOk">
      <a-form
        :model="datas"
        name="basic"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        :rules="uprules"
        ref="refForm"
      >
        <a-form-item label="昵称" name="nick_name">
          <a-input v-model:value="datas.nick_name" placeholder="昵称" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal v-model:open="datas.openPwd" title="修改密码" @ok="upPwdOk">
      <a-form
        :model="datas"
        name="basic"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        :rules="rulesPwd"
        ref="refForm"
      >
        <a-form-item label="旧密码" name="old_pwd">
          <a-input v-model:value="datas.old_pwd" placeholder="旧密码" />
        </a-form-item>
        <a-form-item label="新密码" name="new_pwd">
          <a-input v-model:value="datas.new_pwd" placeholder="新密码" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal v-model:open="datas.openEma" title="邮箱绑定" @ok="upEmaOk">
      <a-form
        :model="datas"
        name="basic"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        :rules="rulesEma"
        ref="refEmaForm"
      >
        <a-form-item label="邮箱" name="emali">
          <a-input-search
            v-model:value="datas.email"
            placeholder="请输入邮箱"
            enter-button="发送验证码"
            size="large"
            @search="onSearch"
          />
        </a-form-item>
        <a-form-item label="验证码" name="code">
          <a-input v-model:value="datas.code" placeholder="验证码" />
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input v-model:value="datas.password" placeholder="密码" />
        </a-form-item>
      </a-form>
    </a-modal>
    <div class="user_item">
      <div class="user_info">
        <a-form :model="userData">
          <a-form-item label="用户名">
            {{ userData.user_name }}
          </a-form-item>
          <a-form-item label="头像">
            <a-avatar :src="userData.avatar_id"></a-avatar>
          </a-form-item>
          <a-form-item label="昵称">
            {{ userData.nick_name }}
          </a-form-item>
          <a-form-item label="邮箱">
            <span class="email" @click="openEmaMod">{{
              userData.email ? userData.email : "未绑定"
            }}</span>
          </a-form-item>
          <a-form-item label="地址">
            {{ userData.addr }}
          </a-form-item>
          <a-form-item label="电话">
            {{ userData.tel ? userData.tel : "未绑定" }}
          </a-form-item>
          <a-form-item label="IP">
            {{ userData.ip }}
          </a-form-item>
          <a-form-item label="身份">
            {{ userData.role }}
          </a-form-item>
          <a-form-item label="注册来源">
            {{ userData.sign_status }}
          </a-form-item>
          <a-form-item label="注册时间">
            {{ formatTime(userData.created_at) }}
          </a-form-item>
          <a-button
            type="primary"
            style="margin-right: 10px"
            @click="datas.openPwd = true"
            >修改密码</a-button
          >
          <a-button type="primary" @click="upData">修改昵称</a-button>
        </a-form>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { reactive, ref } from "vue";
import {
  getUserDetail,
  userUpdate,
  userUpdatePwd,
  userBindEmail,
} from "@/api/user_api";
import { useUserStore } from "@/stores/user";
import { formatTime } from "@/utils/date";
import { message } from "ant-design-vue";

// 弹窗
let datas = reactive({
  upopen: false,
  nick_name: "",
  openPwd: false,
  old_pwd: "",
  new_pwd: "",
  openEma: false,
  code: "",
  email: "",
  password: "",
});

// 校验
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
};

let rulesPwd = {
  old_pwd: [{ required: true, message: "请输入旧密码", trigger: "change" }],
  new_pwd: [
    { required: true, message: "请输入新密码", trigger: "change" },
    { min: 6, max: 12, message: "密码长度在6到12位", trigger: "blur" },
  ],
};

let rulesEma = {
  code: [{ required: true, message: "请输入验证码", trigger: "change" }],
  password: [{ required: true, message: "请输入新密码", trigger: "change" }],
};

// 用户数据
let userData = ref({
  user_name: "",
  nick_name: "",
  email: "",
  addr: "",
  avatar_id: "",
  tel: "",
  role: "",
  ip: "",
  sign_status: "",
  created_at: "",
});
let userStore = useUserStore();

async function getUser() {
  let id = userStore.userInfo.user_id;
  let res = await getUserDetail(id);
  userData.value = res.data;
}
getUser();

//打开修改昵称mode
function upData() {
  datas.upopen = true;
  datas.nick_name = userData.value.nick_name;
}

let refForm = ref(null);
let refEmaForm = ref(null);
// 修改昵称
async function updateOk() {
  datas.upopen = false;
  if (userData.value.role === "管理员") userData.value.role = 1;
  if (userData.value.role === "用户") userData.value.role = 2;
  if (userData.value.role === "游客") userData.value.role = 3;
  let data = {
    user_id: userStore.userInfo.user_id,
    nick_name: datas.nick_name,
    role: userData.value.role,
  };
  let res = await userUpdate(data);
  if (!res.code) {
    getUser();
    message.success(res.msg);
  }
}

// 邮箱mod框
function openEmaMod() {
  datas.openEma = true;
  console.log(1);
}

// 发送验证码
function onSearch() {
  let data = { email: datas.email };
  userBindEmail(data).then((res) => {
    console.log(res);
    if (res.code) {
      message.error(res.msg);
      return;
    }
    message.success(res.msg);
  });
}

// 邮箱绑定
function upEmaOk() {
  refEmaForm.value.validate().then(() => {
    let data = {
      email: datas.email,
      code: datas.code,
      password: datas.password,
    };
    userBindEmail(data).then((res) => {
      console.log(res);
      if (res.code) {
        message.error(res.msg);
        return;
      }
      message.success(res.msg);
      datas.openEma = false;
    });
  });
}
//修改密码
async function upPwdOk() {
  refForm.value.validate().then(() => {
    let data = {
      old_pwd: datas.old_pwd,
      new_pwd: datas.new_pwd,
    };
    userUpdatePwd(data).then((res) => {
      if (res.code) {
        message.error("旧" + res.data);
        return;
      }
      message.success(res.msg);
      datas.openPwd = false;
    });
  });
}
</script>

<style lang="scss">
.user_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  .user_info {
    width: 300px;
    .email {
      color: #84eb98;
      cursor: pointer;
    }
  }
}
</style>