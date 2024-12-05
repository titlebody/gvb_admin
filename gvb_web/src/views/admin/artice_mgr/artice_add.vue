<template>
  <a-card title="添加文章">
    <a-modal v-model:open="ModeData.open" title="Basic Modal" @ok="handleOk">
      <a-form :model="data" :rules="uprules">
        <a-form-item label="文章标题" name="title">
          {{ data.title }}
        </a-form-item>
        <a-form-item
            label="文章简介"
            name="abstract"
            :rules="[{ required: true, message: '请输入文章简介!' }]"
        >
          <a-input v-model:value="data.abstract" />
        </a-form-item>
        <a-form-item label="文章分类" name="category">
          <a-select
              ref="select"
              v-model:value="data.category"
              style="width: 120px"
          >
            <a-select-option
                :value="item"
                v-for="item in selectOptions"
                :key="item"
            >{{ item }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="文章标签" name="tags">
          <a-select
              v-model:value="data.tags"
              mode="multiple"
              style="width: 100%"
              placeholder="Please select"
              :options="tagList"
              @change="handleChange"
          ></a-select>
        </a-form-item>
        <a-form-item label="文章封面" name="banner_path">
          <a-upload
              v-model:file-list="ModeData.fileList"
              action="/api/images"
              list-type="picture-card"
              name="images"
              multiple
              @change="handleChange"
          >
            <plus-outlined />
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-form :model="data">
      <a-form-item
          label="文章标题"
          name="title"
          :rules="[{ required: true, message: '请输入文章标题!' }]"
          :wrapper-col="{ span: 5 }"
      >
        <div class="input-button-container">
          <a-input v-model:value="data.title" />
          <a-button type="primary" @click="addFun">添加</a-button>
        </div>
      </a-form-item>
    </a-form>
    <LazyMdEditor v-if="showEditor" v-model="data.content" class="md-editor"></LazyMdEditor>
  </a-card>
</template>

<script setup>
import { reactive, ref, defineAsyncComponent } from "vue";
import "md-editor-v3/lib/style.css";
import { PlusOutlined } from "@ant-design/icons-vue";
import { addArticle } from "@/api/article_api";
import { message } from 'ant-design-vue';
import { getTags } from "@/api/tags_api.js";

// 懒加载 MdEditor
const LazyMdEditor = defineAsyncComponent(() => import('md-editor-v3').then(module => module.MdEditor));

let showEditor = ref(false);

let data = reactive({
  title: "",
  abstract: "",
  content: "",
  category: "",
  tags: [],
  banner_path: "",
});

let ModeData = reactive({
  open: false,
  fileList: []
});

// 编辑校验规则
let uprules = {
  title: { required: true, message: "请输入文章标题", trigger: "change" },
  abstract: { required: true, message: "请输入文章简介", trigger: "change" },
  content: { required: true, message: "请输入内容", trigger: "change" },
  category: { required: true, message: "请输入文章分类", trigger: "change" },
  tags: { required: true, message: "请输入文章标签", trigger: "change" },
  banner_path: {
    required: true,
    message: "请上传封面",
    trigger: "change",
  },
};

// 确认添加
const handleOk = async () => {
  let res = await addArticle(data);
  console.log(res);
  if (res.code) {
    message.error(res.data);
  } else {
    message.success(res.msg);
  }

  ModeData.open = false;
};

// 标签列表
let tagList = ref([]);

// 获取标签
let getTagList = async () => {
  try {
    let res = await getTags();
    tagList.value = res.data.list.map((item) => ({
      value: item.title,
      label: item.title,
    }));
  } catch (error) {
    console.error('Failed to fetch tags:', error);
  }
};

let addFun = async () => {
  ModeData.open = true;
  showEditor.value = true; // 显示编辑器
  await getTagList();
};

let handleChange = (e) => {
  if (e.file && e.file.status === "done") {
    data.banner_path = e.file.response.data[0].file_name;
  }
};

// 分类列表
let selectOptions = ref([
  "日常",
  "前端",
  "后端",
  "VUE",
  "CSS",
  "UI库",
  "Golang",
  "工具",
  "部署",
]);
</script>

<style lang="scss">
.input-button-container {
  display: flex;
  align-items: center;
}

.input-button-container .ant-input {
  flex: 1;
  margin-right: 8px; /* 调整输入框和按钮之间的间距 */
}
.md-editor {
  height: 67vh;
}
</style>
