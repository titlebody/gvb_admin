
import http from "./request";

// 添加广告
export let adverts_create=(data)=>{
    return http.post("/adverts",data)
}

// 修改是否显示

export let adverts_update=(id,data)=>{
    return http.put("/adverts/"+id,data)
}

// 获取广告列表
export let adverts_list=(data)=>{
    return http.get("/adverts",data)
}