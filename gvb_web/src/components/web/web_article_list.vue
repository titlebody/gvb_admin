<template>
  <a-card title="文章列表" class="mt-4">
    <template #extra>
      <a-input-search
        v-model:value="page.key"
        placeholder="请输入文章名称"
        enter-button
        @search="onSearch"
      />
    </template>
  </a-card>
  <div class="article-list">
    <template v-if="store.articleLists.length>0">
      <web_article_item v-for="item in store.articleLists" :key="item.id" :data="item" class="web_article_item"/>
    </template>
    <template v-else>
      <a-empty description="暂无数据" class="bg-white m-0 h-[500px] flex items-center justify-center"/>
    </template>
  </div>
  
  <div class="gvb_peage text-center mt-2  rounded-lg p-2">
      <a-pagination
        @change="onChange"
        v-model:current="page.page"
        v-model:page-size="page.limit"
        :total="data.count"
        :show-total="() => `总共 ${store.articleLists.length} 个`"
      />
    </div>
</template>

<script setup>
import { reactive} from "vue";
import web_article_item from "./web_article_item.vue";
import {articleList} from "@/api/article_api"
import {articleStore} from "@/stores/article.js"



// 文章列表
let store=articleStore()



// 分页
let page = reactive({
  page: 1,
  limit: 6,
  key: "",
});
// 分页数据
let data=reactive({
  count:0
})
async function getArticleList(){
  let res=await articleList({
    page:page.page,
    limit:page.limit,
    key:page.key
  })

  store.articleLists=res.data.list
  data.count=res.data.count
}

getArticleList()


// 切换页码
let onChange=()=>{
  getArticleList()
}
const onSearch = () => {
  page.page=1
  getArticleList();
};
</script>

<style lang="scss">
.anticon-search {
  display: block !important;
}
.gvb_peage{
  background-color: var(--bg);
}


.article-list .web_article_item {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 初始阴影 */
}

.article-list .web_article_item:nth-child(n+2):hover {
  transform: translateY(-6px); /* 向上移动10px */
  box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.2), 5px 5px 10px rgba(0, 0, 0, 0.2); /* 左右下阴影 */
}

</style>