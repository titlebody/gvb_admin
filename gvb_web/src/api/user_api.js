import http from "@/api/request";

// 获取用户列表
export const getUserList = (params) => {
    return http.get("/user_list",
        params
    );
};


// 添加用户
export const userCreate = (data) => {
    return http.post('/user_create', data)
}

// 删除用户
export const userDelete = (id_list) => {
    return http.delete('/user', {
        data: {
            id_list
        }
    })
}

// 更新用户信息
export const userUpdate = (data) => {
    return http.put('/user_role', data)
}

// 获取用户信息
export const getUserDetail = (id) => {
    return http.get('/user_detail/'+id)
}
// 修改密码
export const userUpdatePwd = (data) => {
    return http.put('/user_password', data)
}

// 绑定邮箱
export const userBindEmail = (data) => {
    console.log(data)
    return http.post('/user_bind_email', data,{
        withCredentials: true
    })
}