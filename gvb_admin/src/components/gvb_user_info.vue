<template>
    <div class="gvb_user_info">
        <div class="avatar" v-if="props.isAvatar">
            <img :src="userStore.userInfo.avatar">
        </div>
        <div class="drop_menu">
            <a-dropdown placement="bottomRight">
                <a class="ant-dropdown-link" @click.prevent>
                    {{ userStore.userInfo.nick_name }}
                    <i class="fa fa-angle-down"></i>
                </a>
                <template #overlay>
                    <a-menu @click="onClick">
                        <a-menu-item  v-for="(item) in menuList" :key="item.key">
                            {{ item.title }}
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </div>

</template>

<script setup>
import { reactive } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user'


let router = useRouter()
let route = useRoute()
let userStore = useUserStore()


let props = defineProps({
    // 是否显示头像
    isAvatar: {
        type: Boolean,
        default: false,
    }

})
function onClick({ key }) {
    if (key == "logout") {
        alert("退出登录")
        return
    }
    if(key == "login"){
        router.push({
            name:"login",
            query:{
                redirect_url:route.path
            }
        })
        return
    }
    router.push({ name: key })

}

const menuList=reactive([
    {key:"user_center",title:"个人信息"},
    {key:"user_list",title:"用户管理"},
    {key:"artice_center",title:"文章管理"},
    {key:"image_list",title:"图片管理"},
    {key:"comment_center",title:"评论管理"},
    {key:"system_config",title:"系统配置"},
    {key:"login",title:"登录"},
    {key:"logout",title:"退出"}
])
</script>

<style>
.gvb_user_info {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>