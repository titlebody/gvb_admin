import http from "./request";


export function baseListApi(url, params) {
    

    
    return http.get(url, { params })
}

export function baseDeleteApi(url, id_list) {
    return http.delete(url, {
        data: {
            id_list
        }
    })
}