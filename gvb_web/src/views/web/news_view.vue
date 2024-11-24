<template>
  <div class="web_news">
    <gvb_nav isShow></gvb_nav>
    <gvb_banner></gvb_banner>

    <div class="gvb_center">
      <div class="web_conter justify-center">
        <div class="news_left flex flex-col items-center">
          <h1 style="margin-top: 20px">热搜分类</h1>
          <div>
            <img src="@/assets/img/微博.svg" alt="" @click="getHot('weibo')" />
          </div>
          <div>
            <img src="@/assets/img/知乎.svg" alt="" @click="getHot('zhihu')" />
          </div>
          <div>
            <img
              src="@/assets/img/哔哩哔哩.svg"
              alt=""
              @click="getHot('bilibili')"
            />
          </div>
          <div>
            <img src="@/assets/img/抖音.svg" alt="" @click="getHot('douyin')" />
          </div>
        </div>
        <div class="news_right">
          <gvb_hot></gvb_hot>
        </div>
      </div>
    </div>
    <div class="gvb_footer"></div>
  </div>
</template>

<script setup>
import gvb_nav from "@/components/web/gvb_nav.vue";
import gvb_banner from "@/components/web/gvb_banner.vue";
import gvb_hot from "@/components/web/gvb_hot.vue";
import { useHotStore } from "@/stores/hot";

let hotStore = useHotStore();

function getHot(name) {
  hotStore.loadHotList(name);
}
</script>

<style lang="scss">
.web_news {
  .gvb_center {
    .web_conter {
      display: flex;
      .news_left {
        width: 200px;
        border: 1px solid var(--order);
        border-radius: 20px;
        margin-right: 20px;
        background-color: var(--card_bg);
        height: 607px;
        

        img {
          width: 80px;
          margin-bottom: 20px;
        }
      }
      .news_right {
        width: 900px;
      }
    }
  }
}
</style>