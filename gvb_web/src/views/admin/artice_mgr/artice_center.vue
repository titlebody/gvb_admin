<template>
  <a-card title="文章管理">
    <a-modal v-model:open="data.upopen" title="编辑用户" @ok="updateOk">
      <a-form
        :model="update"
        name="basic"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        :rules="uprules"
        ref="refForm"
      >
        <a-form-item label="文章标题" name="title">
          <a-input v-model:value="update.title" placeholder="文章标题" />
        </a-form-item>
        <a-form-item label="文章简介" name="abstract">
          <a-input v-model:value="update.abstract" placeholder="文章简介" />
        </a-form-item>
        <a-form-item label="文章内容" name="content">
          <a-textarea v-model:value="update.content" placeholder="文章内容" />
        </a-form-item>
        <a-form-item label="文章分类" name="category">
          <a-select
            ref="select"
            v-model:value="update.category"
            style="width: 120px"
          >
            <a-select-option :value="item" v-for="(item) in selectOptions" :key="item">{{ item }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="文章标签" name="tags">
          <a-select
            v-model:value="update.tags"
            mode="multiple"
            style="width: 100%"
            placeholder="Please select"
            :options="tagList"
            @change="handleChange"
          ></a-select>
        </a-form-item>
        <a-form-item label="文章封面" name="banner_path">
          <!-- 判断banner_path是否以http开头 -->
          <img
            v-if="update.banner_path.startsWith('http')"
            :src="update.banner_path"
            style="border-radius: 10px; width: 120px"
          />
          <img
            v-else
            :src="'/'+update.banner_path"
            style="border-radius: 10px; width: 120px"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <gvb_table
      :baseUrl="data.baseUrl"
      :columns="data.columns"
      isDel
      :defaultDelFun="true"
      like_title="搜索文章标题"
      ref="gvbTable"
    >
      <template #add>
        <a-button type="primary" @click="router.push({ name: 'artice_add' })"
          >发布文章</a-button
        >
      </template>
      <template #edit="{ record }">
        <a-button class="gvb_btn update" type="primary" @click="upModal(record)"
          >编辑</a-button
        >
      </template>
    </gvb_table>
  </a-card>
</template>

<script setup>
import { reactive, ref } from "vue";
import gvb_table from "@/components/admin/gvb_table.vue";
import { useRouter } from "vue-router";
import { updateArticle } from "@/api/article_api";
import { message } from "ant-design-vue";

let router = useRouter();

const data = reactive({
  baseUrl: "articles",
  upopen: false, // 修改框
  columns: [
    { title: "序号", dataIndex: "index", key: "index" },
    { title: "文章名称", dataIndex: "title", key: "title" },
    { title: "简介", dataIndex: "abstract", key: "abstract" },
    { title: "封面", dataIndex: "banner_path", key: "banner_path" },
    { title: "分类", dataIndex: "category", key: "category" },
    { title: "标签", dataIndex: "tags", key: "tags" },
    { title: "发表人", dataIndex: "nick_name", key: "nick_name" },
    { title: "发布时间", dataIndex: "created_at", key: "created_at" },
    { title: "操作", dataIndex: "action", key: "action" },
  ], //表格标题
});

const update = reactive({
  id: 1,
  title: "前端教程2", // 标题
  abstract: "添加文章功能", // 简介
  content: "头啦", // 内容
  category: "前端", // 分类
  tags: ["Java"], //标签
  banner_id: 9, // 封面id   提交到服务器拿到数据后赋值
  banner_path: "",
});

// 获取form表单，提交触发校验
let refForm = ref(null);

// 拿到gvbtable组件实例
let gvbTable = ref(null);

// 编辑校验规则
let uprules = {
  title: { required: true, message: "请输入文章标题", trigger: "change" },
  abstract: { required: true, message: "请输入文章简介", trigger: "change" },
  content: { required: true, message: "请输入内容", trigger: "change" },
  category: { required: true, message: "请输入文章分类", trigger: "change" },
  tags: { required: true, message: "请输入文章标签", trigger: "change" },
};
// mode框确认提交
let updateOk = () => {
  refForm.value.validate().then(async () => {
    let data = {
      title: update.title,
      abstract: update.abstract,
      content: update.content,
      category: update.category,
      tags: update.tags,
      banner_id: update.banner_id,
    };
    // 提交
    await updateArticle(data, update.id).then((res) => {
      if (res.code) {
        message.error(res.data);
        return;
      }
      message.success(res.msg);
      gvbTable.value.getdata();
    });
  });
  data.upopen = false;
};

// 标签列表

let tagList = reactive([
  { value: "Java", label: "Java" },
  { value: "JavaScript", label: "JavaScript" },
]);

// 分类列表
let selectOptions= ref(["日常","前端","后端","VUE","CSS","UI库","Golang","工具","部署"])

// 修改框打开
let upModal = (record) => {
  data.upopen = true;
  console.log(record);
  update.id = record.id;
  update.title = record.title;
  update.abstract = record.abstract;
  update.content = record.content;
  update.category = record.category;
  update.tags = record.tags;
  update.banner_id = record.banner_id;
  update.banner_path = record.banner_path;
};
</script>

<style lang="scss">
</style>
