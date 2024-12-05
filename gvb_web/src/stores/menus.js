import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMenuName } from "@/api/menu_api";


export const useMenuStore = defineStore('menu', () => {
    let menuNameList = ref([])

    async function loadMenuNameList() {
        let res = await getMenuName();
        menuNameList.value = res.data;
    }



    




    return { menuNameList,loadMenuNameList }

},{ persist: true })