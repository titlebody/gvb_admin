<script setup>
import { reactive, onMounted } from "vue";
import { login } from "@/api/admin/login/index";
import { ParseToken } from "@/utils/jwt";
import { useUserStore } from "@/stores/user";
import { useRouter, useRoute } from "vue-router";

let data = reactive({
  user_name: "",
  password: "",
});

let userStore = useUserStore();
let router = useRouter();
let route = useRoute();

// 动态导入 ant-design-vue 的 message 组件
let message = null;
onMounted(async () => {
  const { message: msg } = await import("ant-design-vue");
  message = msg;
});

async function loginsubmit() {
  if (data.user_name.trim() == "" || data.password.trim() == "") {
    if (message) {
      message.error("用户名或密码不能为空");
    }
    return;
  }

  await login(data).then((res) => {
    if (res.code) {
      if (message) {
        message.error("用户登录" + res.msg);
      }
      return;
    }

    if (message) {
      message.success("用户登录" + res.msg);
    }

    localStorage.setItem("token", res.data.token);
    let userInfo = ParseToken(res.data.token);
    userStore.setUserInfo(userInfo);

    const redirect_url = route.query.redirect_url;
    if (redirect_url) {
      router.push(redirect_url);
      return;
    }

    setTimeout(() => {
      router.push({ name: "admin" });
    }, 1000);
  });
}
</script>
<template>
  <div class="gvb_login_bg">
    <div class="gvb_login_container">
      <div class="gvb_login_main">
        <div class="gvb_login_title">gvb-admin</div>
        <div class="gvb_login_form">
          <a-input
            v-model:value="data.user_name"
            placeholder="请输入用户名"
            size="large"
            class="gvb_login_input"
          >
            <template #prefix>
              <i class="fa fa-user-o"></i>
            </template>
          </a-input>
          <a-input
            type="password"
            v-model:value="data.password"
            placeholder="请输入密码"
            size="large"
            class="gvb_login_input"
          >
            <template #prefix>
              <i class="fa fa-lock"></i>
            </template>
          </a-input>
          <div class="gvb_login_btn">
            <a-button type="primary" @click="loginsubmit">登录</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.gvb_login_bg {
  background: url("@/assets/img/logo.png")
    50% / cover no-repeat;
  width: 100%;
  height: 100vh;
  .gvb_login_container {
    width: 400px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    background-color: rgba(white, 0.6);
    .gvb_login_main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      .gvb_login_title {
        font-size: 30px;
        color: rgb(88, 139, 241);
        margin-bottom: 80px;
      }
      .gvb_login_form {
        width: 300px;
        .gvb_login_input {
          margin-bottom: 16px;
        }
        .ant-btn-primary {
          width: 100%;
        }
      }
    }
  }
}
</style>