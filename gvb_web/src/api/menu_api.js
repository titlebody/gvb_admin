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

