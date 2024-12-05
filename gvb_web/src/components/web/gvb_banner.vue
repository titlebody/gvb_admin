<template>
  <div class="gvb_banner">
    <div class="web_title">
      <h1>{{ data.slogan }}</h1>
      <div class="slogan">
        <template v-if="props.isArticle">
          <div>{{ data.abstract }}</div>
        </template>
        <template v-else>
          <vuetyped
            v-if="data.abstract.length"
            :strings="data.abstract"
            :loop="true"
            :startDelay="300"
            :type-speed="100"
            :backSpeed="50"
          >
            <div class="typing"></div>
          </vuetyped>
        </template>
      </div>
    </div>

    <div class="dt_banner">
      <a-carousel
        effect="fade"
        autoplay
        :autoplaySpeed="data.banner_time * 1000"
      >
        <div v-for="item in data.banners" :key="item.id">
          <!-- 判断item.path是否以http开头 -->
          <img v-if="item.path.startsWith('http')" :src="item.path" alt="" />
          <img v-else :src="'/' + item.path" alt="" />
        </div>
      </a-carousel>
    </div>

    <!-- 添加波浪效果 -->
    <GvbBolang />
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { getMenuPathDetail } from "@/api/menu_api";
import { useRoute } from "vue-router";
import GvbBolang from "@/components/gvb_bolang.vue";

let route = useRoute();

let props = defineProps({
  object: {
    type: Object,
  },
  // 文章背景图链接
  url: {
    type: String,
  },
  // 对应文章标题
  slogan: {
    type: String,
  },
  // 对应文章简介
  abstract: {
    type: String,
  },
  // 是否是文章页
  isArticle: {
    type: Boolean,
    default: false,
  },
});

let data = reactive({
  bannerList: [],
  abstract: [],
  abstract_time: 6,
  banners: [],
  banner_time: 6,
  slogan: "",
});

async function getData() {
  if (!props.isArticle) {
    let datas = {
      path: route.path,
    };
    let res = await getMenuPathDetail(datas);
    data.abstract = res.data.abstract;
    data.abstract_time = res.data.abstract_time;
    data.banners = res.data.banners;
    data.banner_time = res.data.banner_time;
    data.slogan = res.data.slogan;
    return;
  }
  data.slogan = props.slogan;
  data.abstract = props.abstract;
  data.banners = [
    {
      id: 1,
      path: props.url,
    },
  ];
}

getData();
</script>

<style lang="scss">
.gvb_banner {
  height: 600px;
  width: 100%;
  position: relative;
  .web_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    color: white;
    h1 {
      color: white;
      font-size: 30px;
      font-weight: 400;
      text-align: center;
    }
    .slogan {
      font-size: 18px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .typed-element {
        justify-content: center;
      }
    }
  }
  .dt_banner {
    height: 600px;
    img {
      width: 100%;
      height: 600px;
      object-fit: cover;
    }
  }
}
</style>