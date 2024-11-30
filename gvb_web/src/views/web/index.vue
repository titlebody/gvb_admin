<template>
  <div class="index_view">
    <header>
      <gvb_banner
        url="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.vjshi.com%2F2021-06-21%2F097367caadfb7fe119c046641e6361aa%2Fonline%2F70f2606839d1707f7515f68c92282f81.jpg%3Fx-oss-process%3Dstyle%2Fresize_w_720&refer=http%3A%2F%2Fpic.vjshi.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655977977&t=31ed25897d5298d2bca24276d5599fb5"
        slogan="xxx"
        abstract="gorm教程"
        alt="Gorm 教程横幅"
      ></gvb_banner>
    </header>

    <main class="gvb_center">
      <div class="web_conter">
        <div class="web_left">
          <gvb_hot isShowExtra isIndex></gvb_hot>
          <Card title="文章发布" style="margin-top: 20px">
            <ActivityCalendar
              :data="data"
              backgroundColor="rgba(255, 255, 255, 0.2)"
              fontColor="#777777"
            ></ActivityCalendar>
          </Card>
          <web_article_list></web_article_list>
        </div>
        <div class="web_right">
          <introduced></introduced>
          <gvb_adverts></gvb_adverts>
          <gvb_tabs style="height: 200px"></gvb_tabs>
        </div>
      </div>
    </main>
    <footer class="gvb_footer">
      <!-- 页脚内容 -->
    </footer>
  </div>
</template>

<script setup>
import gvb_nav from "@/components/web/gvb_nav.vue";
import gvb_banner from "@/components/web/gvb_banner.vue";
import gvb_hot from "@/components/web/gvb_hot.vue";
import gvb_tabs from "@/components/web/web_tabs.vue";
import introduced from "@/components/introduced.vue";
import web_article_list from "@/components/web/web_article_list.vue";
import gvb_adverts from "@/components/web/gvb_adverts.vue";
import { useHead } from '@vueuse/head';
import { ref, onMounted } from "vue";
import {Card} from 'ant-design-vue'


let data = ref([
  { date: "2024-10-28", count: 1 },
  { date: "2024-10-29", count: 5 },
]);

// 设置默认标题
const defaultTitle = '晨曦的博客首页 - 学习与分享';

// 设置页面的 meta 信息
useHead({
  title: defaultTitle,
  meta: [
    { name: 'description', content: '欢迎来到我的博客，分享编程、技术和生活的点滴。这里有丰富的教程和文章，帮助你提升技能。' },
    { name: 'keywords', content: '博客, 编程, 技术, 教程, 学习, 胡晨曦, 晨曦, 胡晨曦的博客' },
    { name: 'author', content: '胡晨曦' },
    { property: 'og:title', content: defaultTitle },
    { property: 'og:description', content: '欢迎来到我的博客，分享编程、技术和生活的点滴。' },
    { property: 'og:url', content: 'https://www.huchenxi.fun' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: defaultTitle },
    { name: 'twitter:description', content: '欢迎来到我的博客，分享编程、技术和生活的点滴。' },
  ],
});

// 在组件挂载时获取数据
onMounted(() => {
  // 这里可以添加获取数据的逻辑
});
</script>

<style lang="scss">
.index_view {
  .gvb_center {
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: center;
    .web_conter {
      width: 1200px;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .web_left {
        width: 750px;
      }
      .web_right {
        width: 430px;
      }
    }
  }

  .social-share {
    margin-top: 20px;
    text-align: center;
    a {
      margin: 0 10px;
      text-decoration: none;
      color: #007bff;
    }
  }
}

.activityCalendar {
  .left {
    width: 10px !important;
  }
}
</style>