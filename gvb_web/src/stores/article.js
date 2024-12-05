import {defineStore} from "pinia";
import {ref} from "vue";
import {articleList} from "@/api/article_api.js"


export let  articleStore = defineStore('article', () => {
    let articleLists = ref([])

    // 标签筛选
    async function tagFilter(title) {
        let res=await articleList()
        articleLists.value=res.data.list
        articleLists.value=articleLists.value.filter(item=>{
            return item.tags.indexOf(title)!==-1
        })
    }
    return {articleLists,tagFilter}
})