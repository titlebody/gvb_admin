<template>
  <div class="web_article_item">
    <gvb_nav isShow></gvb_nav>
    <gvb_banner v-if="articleData && articleData.banner_path" :url="articleData.banner_path" :slogan="articleData.title"
      :abstract="articleData.abstract" isArticle :object="articleData"></gvb_banner>
    <a-affix :offset-top="110" class="absolute  top-[620px] right-0 top">
      <a-card title="目录" class="w-[300px]">
        <MdCatalog :editorId="id" :scrollElement="scrollElement" />
      </a-card>
    </a-affix>

    <div class="gvb_center mt-[20px]">
      <div class="web_conter">
        <a-card>
          <MdPreview :editorId="id" :modelValue="text" :theme="appStore.darkMode" />
        </a-card>

        <a-card class="p-[10px]">
          <div class="border-indigo-300 m-[20px] border">
            <div class="copyright-info p-[20px]">
              <div class="item flex items-center w-[100%]">
                <div class="lable">文章作者</div>
                <div class="value">
                  <a href="http://www.baidu.com" target="_blank" class="underline"></a>{{ articleData.nick_name }}
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
                  <a :href="articleData.link" class="underline" target="_blank">
                    {{ articleData.link }}
                  </a>
                </div>
              </div>
              <div class="item flex items-center w-[100%]">
                <div class="lable">声明 </div>
                <div class="value">此文章版权归 {{ articleData.nick_name }} 所有，如有转载，请注明来自原作者</div>
              </div>
            </div>
          </div>

        </a-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import gvb_nav from "@/components/web/gvb_nav.vue";
import gvb_banner from "@/components/web/gvb_banner.vue";
import { useRoute } from "vue-router";
import { articleDetail } from "@/api/article_api"
import { ref } from "vue"
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import { useAppStore } from "@/stores/app";



let appStore = useAppStore()

const id = 'preview-only';
const text = ref('');
const scrollElement = document.documentElement;

let route = useRoute()
let articleData = ref({
  created_at: '',  // 创建时间
  title: '',   // 标题
  abstract: '', // 摘要
  banner_path: '', // 封面
  content: '', // 内容
  look_count: 0, // 浏览量
  like_count: 0, // 点赞量
  comment_count: 0, // 评论量
  category: '',  // 分类
  nick_name: '', // 昵称
  tags: '', // 标签
  link: '', // 链接
})





async function getArticleDetail() {
  let res = await articleDetail(route.params.id)
  articleData.value = res.data
  text.value = res.data.content
  articleData.value.link = window.location.href
}
getArticleDetail()


</script>
<style scoped lang="scss">
.web_article_item {
  .gvb_center {
    .web_conter {
      width: 1000px;
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
</style>
