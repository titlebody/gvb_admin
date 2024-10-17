import http from "./request";


export function baseListApi(url,data){
    return http.get(url,data)
}