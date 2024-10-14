<template>
  <div>
    <div class="gvb_data_preview">
      <a-card class="preview_item" v-for="item in data.sum_data_list" :key="item.tiele">
        <i :class="item.icon"></i>
        <div class="text">
          <div class="title">{{ item.title }}</div>
          <div class="value">{{ item.value }}</div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup>

import { reactive } from 'vue';

const data=reactive({
    sum_data_list:[
        {
            title:'文章总数',
            value:128,
            icon:'iconfont icon-16'
        },
        {
            title:'用户总数',
            value:18,
            icon:'iconfont icon-yonghu'
        },
        {
            title:'今日登录',
            value:8,
            icon:'iconfont icon-zaixian'
        },
        {
            title:'消息总数',
            value:18,
            icon:'iconfont icon-xiaoxi'
        },
    ]

})
</script>

<style lang="scss">
.ant-card{
    background-color: var(--bg);
    color: var(--textColor);
}
.ant-card-bordered{
    border: 1px solid var(--order);
}
.gvb_data_preview{
    display: flex;
    align-items: center;
    justify-content: space-between;

    .preview_item{
        width: 200px;
        i{
            font-size: 40px;
            color: #6998ca;
        }
        .text{
            font-size: 16px;
            color: var(--textColor);
        }
        
    }
    .ant-card-body{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px;
    }
}
</style>