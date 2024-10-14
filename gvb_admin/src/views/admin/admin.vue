<template>
    <div class="gvb_admin">
        <gvb_aside></gvb_aside>

        <div class="main">
            <header>
                <div class="left">
                    <a-breadcrumb>
                        <a-breadcrumb-item>首页</a-breadcrumb-item>
                        <a-breadcrumb-item><a href="#">个人中心</a></a-breadcrumb-item>
                        <a-breadcrumb-item>用户列表</a-breadcrumb-item>
                    </a-breadcrumb>
                </div>
                <div class="right">
                    <div class="icon_actions">
                        <i class="fa fa-home"></i>
                        <gvb_theme></gvb_theme>
                        <gvb_full_screen></gvb_full_screen>
                        
                    </div>
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
            </header>
            <div class="tabs"></div>
            <main>
                11111111111111
            </main>
        </div>
    </div>
</template>

<script setup>

import { useRouter } from 'vue-router';
import gvb_theme from '../../components/gvb_theme.vue';
import gvb_aside from '../../components/admin/gvb_aside.vue';
import gvb_full_screen from '@/components/gvb_full_screen.vue';


let router = useRouter()


function onClick({ key }) {
    if (key == "logout") {
        alert("退出登录")
        return
    }
    router.push({ name: key })

}





</script>

<style lang="scss">
.gvb_admin {
    width: 100%;
    display: flex;
    color: var(--textColor);

    .main {
        width: calc(100% - 240px);

        header {
            height: 60px;
            background-color: var(--bg);
            display: flex;
            justify-content: space-between;
            padding: 0 20px;

            .left {
                align-content: center;
            }

            .right {
                display: flex;
                align-items: center;

                .icon_actions {
                    margin-right: 20px;
                    background-color: var(--bg);

                    i {
                        margin-left: 10px;
                        cursor: pointer;
                    }

                    i:hover {
                        color: var(--active);
                    }
                }

                .avatar {
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                    }
                }

                .drop_menu {
                    margin-left: 20px;

                    a {
                        color: var(--active);
                    }
                }
            }
        }

        .tabs {
            height: 30px;
            border: 1px solid var(--order);
            background-color: var(--bg);
        }

        main {
            height: calc(100vh - 90px);
            background-color: var(--order);

        }
    }
}
</style>