import { data } from "autoprefixer";
import http from "./request";

// 添加广告
export let adverts_create=(data)=>{
    return http.post("/adverts",data)
}

// 修改是否显示

export let adverts_update=(id,data)=>{
    return http.put("/adverts/"+id,data)
}