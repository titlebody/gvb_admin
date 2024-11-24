<template>
  <a-card :class="['weather-card','mt-3']  ">
    <a-spin v-if="loading" tip="加载中..." size="large" />
    <div v-else>
      <h1 class="text-2xl font-bold mb-4">当前天气</h1>
      <a-row :gutter="[16, 16]">
        <a-col :span="12">
          <a-statistic title="城市" :value="weather.city" />
        </a-col>
        <a-col :span="12">
          <a-statistic title="温度" :value="`${weather.temperature}°C`" />
        </a-col>
        <a-col :span="12">
          <a-statistic title="天气" :value="weather.weather" />
        </a-col>
        <a-col :span="12">
          <a-statistic title="风向" :value="weather.wind_direction" />
        </a-col>
        <a-col :span="12">
          <a-statistic title="风力" :value="weather.wind_strength" />
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';

const weather = ref({});
const loading = ref(true);

const getWeather = async (cityCode) => {
  const apiKey = '3a6482f3b3412c77c6cd3e582bd8f6a3'; // 替换为你的高德地图 API Key

  try {
    const response = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo', {
      params: {
        key: apiKey,
        city: cityCode,
        extensions: 'base',
        output: 'JSON'
      }
    });

    const data = response.data.lives[0];
    weather.value = {
      city: data.city,
      temperature: data.temperature,
      weather: data.weather,
      wind_direction: data.winddirection,
      wind_strength: data.windpower
    };
  } catch (error) {
    console.error('获取天气数据失败:', error);
    message.error('获取天气数据失败');
  } finally {
    loading.value = false;
  }
};

const getLocation = async () => {
  const apiKey = '6eb4a2b2953c3bd7bf81480ecabaf3a6'; // 替换为你的高德地图 API Key

  try {
    const response = await axios.get('https://restapi.amap.com/v3/ip', {
      params: {
        key: apiKey,
        output: 'JSON'
      }
    });

    const data = response.data;
    if (data.status === '1' && data.info === 'OK') {
      const cityCode = data.adcode;
      getWeather(cityCode);
    } else {
      message.error('获取位置信息失败');
    }
  } catch (error) {
    console.error('获取位置信息失败:', error);
    message.error('获取位置信息失败');
  }
};

onMounted(() => {
  getLocation();
});
</script>

<style scoped>
.weather-card {
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.text-gray-700 {
  color: #4a5568;
}
</style>