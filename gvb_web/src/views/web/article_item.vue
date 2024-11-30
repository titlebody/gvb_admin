<template>
  <div class="web_article_item">
    <gvb_banner
      v-if="articleData && articleData.banner_path"
      :url="articleData.banner_path"
      :slogan="articleData.title"
      :abstract="articleData.abstract"
      isArticle
      :object="articleData"
    />
    <a-affix :offset-top="110" class="absolute top-[620px] right-0 top">
      <a-card title="目录" class="w-[300px]">
        <div class="catalog-container">
          <MdCatalog
            v-if="articleData.content"
            :editorId="id"
            :scrollElement="scrollElement"
            @item-click="handleItemClick"
          />
        </div>
      </a-card>
      <a-card class="mt-[20px] custom-padding">
        <div class="flex justify-around w-[250px]">
          <i class="iconfont icon-icon text-xl"></i>
          <i class="iconfont icon-shoucang text-xl"></i>
          <i class="iconfont icon-huidaodingbu text-xl" @click="scrollToTop" />
          <i class="iconfont icon-pinglun text-xl"></i>
        </div>
      </a-card>
    </a-affix>

    <div class="gvb_center mt-[20px]">
      <div class="web_conter">
        <a-card class="pt-4">
          <template #title>
            <div class="text-center">
              <h1 class="text-3xl">{{ articleData.title }}</h1>
              <div class="flex justify-center">
                <div class="flex items-center">
                  <i class="fa fa-calendar"> 发布时间 : {{ formatTime(articleData.created_at) }}</i>
                </div>
              </div>
              <div class="mt-1 mb-2">
                <i class="fa fa-folder-o mr-1"> 分类 ： <a-tag color="#2db7f5">{{ articleData.category }}</a-tag></i>
                <i class="fa fa-tag mr-1"> 标签 : 
                  <a-tag
                    :bordered="false"
                    v-for="tag in articleData.tags"
                    :key="tag"
                    color="processing"
                  >{{ tag }} </a-tag>
                </i>
                <i class="fa fa-thumbs-o-up mr-1"> 点赞 ：{{ articleData.digg_count }}</i>
                <i class="fa fa-eye mr-1"> 浏览量：{{ articleData.look_count }}</i>
              </div>
            </div>
          </template>
          <MdPreview
            v-if="text"
            :editorId="id"
            :modelValue="text"
            :theme="appStore.darkMode"
          />
        </a-card>

        <a-card class="p-[10px]">
          <div class="border-indigo-300 m-[20px] border">
            <div class="copyright-info p-[20px]">
              <div class="item flex items-center w-[100%]">
                <div class="lable">文章作者</div>
                <div class="value">
                  <a href="http://www.baidu.com" target="_blank" class="underline">{{ articleData.nick_name }}</a>
                </div>
              </div>
              <div class="item flex items-center w-[100%]">
                <div class="lable">类型</div>
                <div class="value">{{ articleData.category }}</div>
              </div>
              <div class="item flex items-center w-[100%]">
                <div class="lable">原创</div>
                <div class="value">晨曦知道</div>
              </div>
              <div class="item flex items-center w-[100%]">
                <div class="lable">本文链接</div>
                <div class="value">
                  <a :href="articleData.link" class="underline" target="_blank">{{ articleData.link }}</a>
                </div>
              </div>
              <div class="item flex items-center w-[100%]">
                <div class="lable">声明</div>
                <div class="value">
                  此文章版权归 {{ articleData.nick_name }} 所有，如有转载，请注明来自原作者
                </div>
              </div>
            </div>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import gvb_banner from "@/components/web/gvb_banner.vue";
import { useRoute } from "vue-router";
import { articleDetail } from "@/api/article_api";
import { ref, onMounted, defineAsyncComponent } from "vue";
import { useAppStore } from "@/stores/app";
import { formatTime } from "@/utils/date";
import { useHead } from '@vueuse/head';
import "md-editor-v3/lib/style.css";

// 懒加载 MdCatalog 和 MdPreview
const MdCatalog = defineAsyncComponent(() => import('md-editor-v3').then(module => module.MdCatalog));
const MdPreview = defineAsyncComponent(() => import('md-editor-v3').then(module => module.MdPreview));

let appStore = useAppStore();

const id = "preview-only";
const text = ref("");
const scrollElement = document.documentElement;

let route = useRoute();
let articleData = ref({
  created_at: "",
  title: "",
  abstract: "",
  banner_path: "",
  content: "",
  look_count: 0,
  digg_count: 0,
  comment_count: 0,
  category: "",
  nick_name: "",
  tags: [],
  link: "",
});

// 设置默认标题
const defaultTitle = '晨曦的博客 - 文章详情';

// 获取文章详情
async function getArticleDetail() {
  try {
    let res = await articleDetail(route.params.id);
    if (res && res.data) {
      const { data } = res;
      articleData.value = {
        created_at: data.created_at,
        title: data.title,
        abstract: data.abstract,
        banner_path: data.banner_path,
        content: data.content,
        look_count: data.look_count,
        digg_count: data.digg_count,
        comment_count: data.comment_count,
        category: data.category,
        nick_name: data.nick_name,
        tags: data.tags,
        link: window.location.href,
      };
      text.value = data.content;

      const newTitle = articleData.value.title || defaultTitle;
      useHead({
        title: newTitle,
        meta: [
          { name: 'description', content: articleData.value.abstract },
          { name: 'keywords', content: `${articleData.value.category}, ${articleData.value.tags.join(', ')}, 胡晨曦, 晨曦, 胡晨曦的博客` },
          { property: 'og:title', content: newTitle },
          { property: 'og:description', content: articleData.value.abstract },
          { property: 'og:url', content: articleData.value.link },
          { property: 'og:image', content: articleData.value.banner_path },
        ],
      });
    } else {
      console.error("文章详情接口返回数据格式不符合预期");
    }
  } catch (error) {
    console.error("获取文章详情出错:", error);
  }
}

onMounted(() => {
  getArticleDetail();
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleItemClick(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 210;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  } else {
    console.error("Target element not found:", targetId);
  }
}
</script>

<style scoped lang="scss">
.web_article_item {
  .gvb_center {
    .web_conter {
      width: 100%; /* 使用百分比宽度以适应不同屏幕 */
      max-width: 1000px; /* 设置最大宽度 */
      margin: 0 auto;
    }
  }
}

.lable {
  position: relative;
  margin-right: 9px;
}

.lable:before {
  content: ":";
  position: absolute;
  top: 0;
  right: -0.3rem;
}

.catalog-container {
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
}

.custom-padding {
  i:hover {
    color: #409eff;
  }
}

/* 自定义滚动条样式 */
.catalog-container::-webkit-scrollbar {
  width: 8px;
}

.catalog-container::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
  opacity: 0;
}

.catalog-container:hover::-webkit-scrollbar-thumb {
  opacity: 1;
}

.catalog-container::-webkit-scrollbar-track {
  background: transparent;
}
</style>



