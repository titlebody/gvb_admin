import http from "./request";

// 获取菜单详情
export const getMenuDetail = (id) => {
  return http.get(`/menus/${id}`);
};
// 获取菜单列表
export const getMenuList = () => {
  return http.get("/menus");
};

// 获取菜单路径名称
export const getMenuName = () => {
  return http.get("/menu_names")
}

// 根据path获取菜单详情
export const getMenuPathDetail = (params) => {
  return http.get("/menus/detail", {
    params
  });
};

// 添加菜单
// 参数
// {
//   "title":"首页",
//     "path":"/",
//     "slogan":"晨曦一代博客",
//     "abstract":["晨曦知道","gin-vue-blog"],
//     "abstract_time":7,
//     "banner_time":7,
//     "sort":1,
//     "images_sort_list":[
//   {
//     "image_id":1,
//     "sort":1
//   }
// ]
// }
export const addMenu = (data) => {
  return http.post("/menus", data);
};


//编辑菜单
export const editMenu = (id, data) => {
  return http.put(`/menus/${id}`, data);
};

