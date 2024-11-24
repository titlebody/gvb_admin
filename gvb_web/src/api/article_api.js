import http from "./request";



// 修改文章信息
export function updateArticle(data,id) {
    return http.put("/articles/"+id, data)
}

// 文章添加
export function addArticle(data) {
    return http.post("/articles", data)
}

// 文章列表
export function articleList(params) {
    return http.get("/articles", {params})
}
// 文章详情
export function articleDetail(id) {
    return http.get("/articles/"+id)
}