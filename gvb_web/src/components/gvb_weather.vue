<template>
  <div class="flex items-center justify-center">
    {{ weather.city }}
    <img src="@/assets/img/天气.svg" alt="" />
    {{ weather.weather }}
    {{ weather.temperature }}°C
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { message } from "ant-design-vue";

const weather = ref({});
const loading = ref(true);

const getWeather = async (cityCode) => {
  const apiKey = "3a6482f3b3412c77c6cd3e582bd8f6a3"; // 替换为你的高德地图 API Key

  try {
    const response = await axios.get(
      "https://restapi.amap.com/v3/weather/weatherInfo",
      {
        params: {
          key: apiKey,
          city: cityCode,
          extensions: "base",
          output: "JSON",
        },
      }
    );

    const data = response.data.lives[0];
    weather.value = {
      city: data.city,
      temperature: data.temperature,
      weather: data.weather,
      wind_direction: data.winddirection,
      wind_strength: data.windpower,
    };
  } catch (error) {
    console.error("获取天气数据失败:", error);
    message.error("获取天气数据失败");
  } finally {
    loading.value = false;
  }
};

const getLocation = async () => {
  const apiKey = "6eb4a2b2953c3bd7bf81480ecabaf3a6"; // 替换为你的高德地图 API Key

  try {
    const response = await axios.get("https://restapi.amap.com/v3/ip", {
      params: {
        key: apiKey,
        output: "JSON",
      },
    });

    const data = response.data;
    if (data.status === "1" && data.info === "OK") {
      const cityCode = data.adcode;
      getWeather(cityCode);
    } else {
      message.error("获取位置信息失败");
    }
  } catch (error) {
    console.error("获取位置信息失败:", error);
    message.error("获取位置信息失败");
  }
};

onMounted(() => {
  getLocation();
});
</script>

<style scoped>
</style>