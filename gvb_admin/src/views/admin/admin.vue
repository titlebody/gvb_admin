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
                        <i class="fa fa-home" ></i>
                        <gvb_theme></gvb_theme>
                        <gvb_full_screen ></gvb_full_screen>
                        
                    </div>
                    <gvb_user_info :isAvatar="true"></gvb_user_info>
                </div>
            </header>
            <div class="tabs"></div>
            <main>
                <a-card :loading="loading">
                    <router-view />
                </a-card>
                
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import gvb_theme from '../../components/gvb_theme.vue';
import gvb_aside from '../../components/admin/gvb_aside.vue';
import gvb_full_screen from '@/components/gvb_full_screen.vue';
import gvb_user_info from '@/components/gvb_user_info.vue';

const loading = ref(true);

// 页面加载完触发动
setTimeout(() => {
    handleClick()
},1000)
const handleClick = () => {
  loading.value = !loading.value;
};

const router = useRouter();











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
            padding: 20px;

        }
    }
}
</style>