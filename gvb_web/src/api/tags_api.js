import request from "@/api/request.js";


// 添加标签
export const addTags=(data)=>{
  return request.post('/tags',data)
}

// 查询标签
export const getTags=(data)=>{
  return request.get('/tags',{params:data})
}


// 修改标签
export const editTags=(id,data)=>{
  return request.put('/tags/'+id,data)
}