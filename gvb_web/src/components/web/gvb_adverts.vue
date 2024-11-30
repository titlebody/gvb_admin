<template>
  <a-card title="文章推荐" class="mt-4">
    <div v-for="item in data.list" :key="item.id" class="mb-4">
      <a :href="item.href" class="relative">
        <div class="relative overflow-hidden rounded-lg">
          <img
            :src="item.images"
            alt=""
            class="w-full transition-transform duration-300 hover:scale-110 rounded-lg"
            style="height:200px"
          />
        </div>
        <div class="absolute bottom-0 left-0 w-full bg-black/20 p-4 text-white">
          <h1 class="text-xl mb-2">{{ item.title }}</h1>
          <p class="text-ellipsis">
            文章简介：暂无
          </p>
        </div>
      </a>
    </div>
  </a-card>
</template>
<script setup>
import { reactive, ref } from "vue";
import { adverts_list } from "@/api/adverts_api";

const data = reactive({
  list: [],
});

async function getAdverts() {
  let res = await adverts_list({ limit: 3, page: 2 });
  data.list = res.data.list;
}

getAdverts();
</script>
<style scoped>
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.transition-transform {
  transition: transform 0.3s ease-in-out;
}

.hover:scale-110 {
  transform: scale(1.1);
}

.rounded-lg {
  border-radius: 10px; /* 根据需要调整圆角大小 */
}
</style>