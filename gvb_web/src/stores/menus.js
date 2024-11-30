import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMenuName } from "@/api/menu_api";


export const useMenuStore = defineStore('menu', () => {
    let menuNameList = ref([])

    async function loadMenuNameList() {
        let res = await getMenuName();
        menuNameList.value = res.data;
    }


    function initMenuNameList(){
        let locMenu=JSON.parse(localStorage.getItem("menu"))
        if(!locMenu){
            loadMenuNameList()
            return
        }
        menuNameList.value=locMenu.menuNameList
    }

    




    return { menuNameList,initMenuNameList }

},{ persist: true })