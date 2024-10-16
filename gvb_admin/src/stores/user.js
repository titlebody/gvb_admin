import { ref } from 'vue'
import { defineStore } from 'pinia'
import {message} from "ant-design-vue"
import { useRouter } from 'vue-router'



export const useUserStore = defineStore('user', () => {
    let router=useRouter()
    let userInfo = ref({
        avatar: "",
        exp: 1729155489,
        nick_name: "",
        role: 0,
        user_id: 0,
    })

    let setUserInfo = (data) => {
        userInfo.value = data
    }

    let loadUserInfo = () => {
        let userInfo=localStorage.getItem("user")
        if(userInfo==null){
            return
        }
        // json 解析
        userInfo=JSON.parse(userInfo).userInfo
        let exp=userInfo.exp
        let nowTime=new Date().getTime()
        if((exp*1000)-nowTime<0){
            // token过期
            message.warn("登录过期，请重新登录")
            // 跳转登录界面
            router.push({name:"login"})

            return
        }
    }
    return { userInfo, setUserInfo,loadUserInfo }
},{persist:true})