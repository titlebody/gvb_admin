<template>
    <div class="gvb_user_info">
        <div class="avatar">
                        <img src="https://tse2.mm.bing.net/th/id/OIP.3y3aVa2QU0tVj_-xZ1tZegAAAA?rs=1&pid=ImgDetMain"
                            alt="">
                    </div>
                    <div class="drop_menu">
                        <a-dropdown placement="bottomRight">
                            <a class="ant-dropdown-link" @click.prevent>
                                七夜空间
                                <i class="fa fa-angle-down"></i>
                            </a>
                            <template #overlay>
                                <a-menu @click="onClick">
                                    <a-menu-item key="user_center">
                                        个人中心
                                    </a-menu-item>
                                    <a-menu-item key="my_messages">
                                        我的消息
                                    </a-menu-item>
                                    <a-menu-item key="article_list">
                                        文章列表
                                    </a-menu-item>
                                    <a-menu-item key="logout">
                                        注销退出
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
    </div>
  
</template>

<script setup>

import { useRouter } from 'vue-router';
let router = useRouter()
function onClick({ key }) {
    if (key == "logout") {
        alert("退出登录")
        return
    }
    router.push({ name: key })

}
</script>

<style>
.gvb_user_info{
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>