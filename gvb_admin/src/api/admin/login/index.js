import http from "@/api/request";

// 用户登录
export const login = (data) => {
  return http.post("/email_login", data);
};

