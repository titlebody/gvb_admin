<template>
  <a-card title="今日热搜" style="width: 750px" :loading="hotStore.hotLoading" class="web_card">
    <template #extra v-if="props.isShowExtra"
      ><a href="/news">查看更多</a></template
    >
    <template v-if="!props.isIndex">
      <div
        class="web_hot_list"
        v-for="(item, index) in hotStore.hotList"
        :key="item"
      >
        <span class="web_index">{{ index + 1 }}.</span>
        <a :href="item.url" class="web_title">{{ item.title }}</a>
        <span class="web_hot"
          ><i class="iconfont icon-huo"></i>{{ item.hot }}</span
        >
      </div>
    </template>
    <template v-else>
      <div class="web_hot_list">
        <span class="web_index">1.</span>
        <a :href="hotStore.newsTop.url" class="web_title">{{
          hotStore.newsTop.title
        }}</a>
        <span class="web_hot"
          ><i class="iconfont icon-huo"></i>{{ hotStore.newsTop.hot }}</span
        >
      </div>
    </template>
  </a-card>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useHotStore } from "@/stores/hot";

// 获取最新热榜
let hotStore = useHotStore();

let props = defineProps({
  isShowExtra: {
    type: Boolean,
    default: false,
  },
  isIndex: {
    type: Boolean,
    default: false,
  },
});
hotStore.loadHotList();
</script>

<style lang="scss" scoped>
.web_hot_list {
  display: flex;
  .web_index {
    flex: 0.3;
  }
  .web_title {
    flex: 7.7;
  }
  .web_hot {
    flex: 1;
  }
}
.web_card{
    background-color: var(--card_bg) !important;
    border: var(--order) 1px solid;
    color: var(--textColor) !important;
}


</style>