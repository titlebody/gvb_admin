<template>
  <a-card title="标签云" style="width: 430px" class="mt-3">
    <div class="tags-cloud">
      <a-tag
          v-for="(item, index) in tags"
          :key="index"
          :color="item.color"
          class="tag-item"
          @click="store.tagFilter(item.title)"
          :style="{ fontSize: `${item.fontSize}px`, transform: `rotate(${item.rotate}deg)` }"
      >
        {{ item.title }} ({{ item.article_count }})
      </a-tag>
    </div>
  </a-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getTags } from '@/api/tags_api.js'; // 导入 getTags 方法
import { message } from 'ant-design-vue';
import {articleStore} from "@/stores/article.js"
const tags = ref([]);

let store = articleStore()

const fetchTags = async () => {
  try {
    const response = await getTags(); // 调用 getTags 方法
    const data = response.data.list;
    tags.value = data.map((tag, index) => ({
      ...tag,
      color: ['#108ee9', '#f50', '#87d068', '#2db7f5', '#ff4d4f'][index % 5], // 循环使用颜色
      fontSize: 12 + Math.random() * 10, // 随机字体大小
      rotate: -20 + Math.random() * 40, // 随机旋转角度
    }));
  } catch (error) {
    console.error('获取标签数据失败:', error);
    message.error('获取标签数据失败');
  }
};
// 筛选
const tags111 = (title) => {
  store.tagFilter(title)
};

onMounted(() => {
  fetchTags();
});
</script>

<style lang="scss" scoped>
.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
}

.tag-item {
  margin: 5px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  user-select: none; // 禁止选中文本

  &:hover {
    transform: scale(1.2) !important;
  }
}

</style>
