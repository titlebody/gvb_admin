<template>
    <aside class="gvb_aside">
        <div class="gvb_aside_header">
            <div class="gvb_aside_logo">
            </div>
            <div class="gvb_aside_title">
                博客后台系统
            </div>
        </div>
        <div class="gvb_aside_body">

        </div>

    </aside>
</template>

<script setup>

</script>

<style lang="scss">
.gvb_aside {
    width: 240px;
    height: 100vh;
    background-color: var(--bg);

    .gvb_aside_header {
        width: 100%;
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .gvb_aside_logo {
            padding: 40px;
            position: relative;
            &::after {
                content: '';
                background-image: url("https://www.logosc.cn/oss/icons/2022/10/18/80D8logLFn8rAgq.png");
                background-size: cover;
                width: 60px;
                height: 60px;
                display: block;
                position: absolute;
                top: 20px;
                right: 0;
            }
        }
    }

    .gvb_aside_title {
        margin-top: 20px;
        font-size: 18px;
    }
}
</style>