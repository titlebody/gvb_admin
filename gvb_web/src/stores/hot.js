import { defineStore } from "pinia";
import { getHotList } from "../api/web_hot";
import {ref} from 'vue'



export const useHotStore = defineStore('hot', () => {
    let hotList = ref([])
    let hotLoading = ref(true)
    let newsTop = ref({})
// name:bilihot&zhihu&weibo&douyin&history
    async function loadHotList(name="weibo") {
        hotLoading.value=true
        await getHotList(name).then(res => {
            hotList.value = res.data.data.slice(0,20)
            newsTop.value=hotList.value[0]
            hotLoading.value=false
        })
    }
    return{
        hotList,loadHotList,hotLoading,newsTop
    }


})