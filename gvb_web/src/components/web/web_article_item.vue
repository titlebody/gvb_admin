<template>
  <a-card class="mb-4 hover-effect" @click="goArticle">
    <div class="article_item">
      <div class="left">
        <img :src="props.data.banner_path" alt="" class="image" />
      </div>
      <div class="right">
        <h1 class="text-xl font-bold mb-1">{{ props.data.title }}</h1>
        <div class="abstract text-base">
          {{ props.data.abstract }}
        </div>
        <div class="data">
          <div class="category">
            <a-tag :bordered="false" color="error">{{
              props.data.category
            }}</a-tag>
          </div>
          <div class="date mr-2">
            <span class="mr-2">
              <i class="fa fa-clock-o"></i>
            </span>
            <span>{{ formatTime(props.data.created_at) }}</span>
          </div>
          <div class="article_data">
            <span class="mr-1">
              <i class="fa fa-eye mr-2"></i>{{ props.data.look_count }}
            </span>
            <span class="mr-1">
              <i class="fa fa-thumbs-o-up mr-2"></i
              >{{ props.data.comment_count }}
            </span>
            <span class="mr-1">
              <i class="fa fa-commenting-o mr-2"></i>{{ props.data.digg_count }}
            </span>
            <span class="mr-1">
              <i class="fa fa-star mr-2"></i>{{ props.data.collects_count }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<script setup>
// 文章组件需要传参
// cover   string 文章图片
// title      string 文章标题
// abstract    string 文章简介
// category   string 文章分类
// date       string 文章日期
// look_count string 文章浏览量
// comment_count string 文章评论量
// digg_count string 文章点赞量
// collects_count string 文章收藏量


import { formatTime } from "@/utils/date";
import { useRouter } from "vue-router";

let router = useRouter()

let props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {
        cover: "@/assets/img/文章图片.jpg",
        title: "fai课程介绍",
        abstract:
          "课程介绍 FengFengAI项目（以下简称fai）正式进入预售阶段！预售时间：本文档发布之后——前端完成（9月30日之前）之前大模型很火的时候，就出了博客九代课程，把大模型接入到了博客中",
        category: "GO",
        date: "2022-09-01",
        look_count: "222",
        comment_count: "0",
        digg_count: "11",
        collects_count: "0",
      };
    },
  },
});

const goArticle = () => {
  router.push({
    name:"article",
    params:{id:props.data.id}
  })
}
</script>

<style lang="scss">
.hover-effect {
  
  cursor: pointer;
  .article_item {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .left {
      width: 200px;
      overflow: hidden;
      border-radius: 10px;
      .image {
        width: 200px !important;
        height: 120px;
        border-radius: 10px;
        transition: all 0.3s; /* 平滑过渡效果 */
      }
      .image:hover {
        border-radius: 10px;
        transform: scale(1.1); /* 鼠标悬停时放大1.1倍 */
      }
    }
    .right {
      width: 450px;
      position: relative;
      .data {
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 0px;
      }
      .abstract{
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}

</style>