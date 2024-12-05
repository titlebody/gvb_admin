<template>
  <div class="gvb_container">
    <div class="gvb_search" v-if="props.like_title">
      <a-input-search
        v-model:value.trim="page.key"
        :placeholder="props.like_title"
        style="width: 200px"
        @search="onSearch"
      />
    </div>
    <div class="gvb_actions">
      <slot name="add"> </slot>
      <a-button
        class="gvb_btn del"
        danger
        v-if="data.selectedRowKeys.length > 0 && isDels"
        @click="deleteUser"
        >批量删除</a-button
      >
    </div>
    <div class="gvb_table">
      <a-spin tip="加载中..." :spinning="data.spinning">
        <a-table
          :row-selection="rowSelection"
          :dataSource="data.list"
          :columns="props.columns"
          :pagination="false"
          rowKey="id"
          size="middle"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.dataIndex === 'index'">
              {{ index + 1 }}
            </template>
            <template v-if="column.key === 'avatar_id'">
              <a-avatar :size="44" :src="record.avatar_id" />
            </template>
            <template v-if="column.key === 'images'">
              <!-- 判断record.path是否为http开头 -->
              <template v-if="record.images.indexOf('http') !== -1">
                <img
                  :src="record.images"
                  style="border-radius: 10px; width:180px"
                />
              </template>
              <template v-else>
                <img
                  :src="'/' + record.images"
                  style="border-radius: 10px; width:60px"
                />
              </template>
            </template>
            <template v-if="column.key==='is_show'">
              <slot name="is_show" :record="record"></slot>
            </template>
            <template v-if="column.key === 'banner_path'">
              <!-- 判断record.path是否为http开头 -->
              <template v-if="record.banner_path.indexOf('http') !== -1">
                <img
                  :src="record.banner_path"
                  style="border-radius: 10px; width: 180px"
                />
              </template>
              <template v-else>
                <img
                  :src="'/' + record.banner_path"
                  style="border-radius: 10px;width: 180px"
                />
              </template>
            </template>
            <template v-if="column.key==='banners'">
              <a-image
                :width="200"
                :src="'/'+record.banners[0]?.path"
              />
            </template>
            <template v-if="column.key==='abstract'" >
              <span class="ellipsis">{{ record.abstract }}</span>
            </template>
            <template v-if="column.key === 'created_at'">
              {{ formatTime(record.created_at) }}
            </template>
            <template v-if="column.key === 'tags'">
              <a-tag
                :bordered="false"
                v-for="tag in record.tags"
                :key="tag.id"
                :color="
                  tag === 'loser'
                    ? 'volcano'
                    : tag.length > 5
                    ? 'geekblue'
                    : 'green'
                "
                >{{ tag }}</a-tag
              >
            </template>
            <slot name="cell" v-bind="{ column, record }"></slot>
            <template v-if="column.key === 'action'">
              <slot name="edit" :record="record"> </slot>
              <slot name="del" :record="record">
                <a-popconfirm
                  title="是否删除?"
                  ok-text="是"
                  cancel-text="否"
                  @confirm="confirm(record.id)"
                  @cancel="cancel"
                  v-if="isDel"
                >
                  <a-button
                    class="gvb_btn del"
                    danger
                    v-if="data.selectedRowKeys.length <= 1"
                    type="primary"
                    >删除</a-button
                  >
                </a-popconfirm>
              </slot>
            </template>
          </template>
        </a-table>
      </a-spin>
    </div>
    <div class="gvb_peage">
      <a-pagination
        @change="onChange"
        v-model:current="page.page"
        v-model:page-size="page.limit"
        :total="data.count"
        :show-total="(total) => `总共 ${total} 个`"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { formatTime } from "@/utils/date";

import { message } from "ant-design-vue";
import { baseListApi, baseDeleteApi } from "@/api/base_api";
let emit = defineEmits(["delete"]);

const props = defineProps({
  columns: {   //td名称
    type: Array,
    default: [],
  },
  baseUrl: {   // 获取数据地址
    type: String,
    default: "",
  },
  isDel: {   //操作删除按钮
    type: Boolean,
    default: false,
  },
  isDels: {   //批量删除
    type: Boolean,
    default: false,
  },
  like_title: {   //搜索框内容
    type: String,
    default: "",
  },
  page_size: {   // 分页
    type: Number,
    default: 6,
  },
  defaultDelFun: {   //开启删除功能
    type: Boolean,
    default: false,
  },
});
// 搜索框

let page = reactive({
  page: 1,
  limit: 6,
  key: "",
});

const data = reactive({
  list: [], // 表格值
  selectedRowKeys: [], // 选中id
  count: 0, // 表格数据条数
  spinning: false, // 加载
  open: false, // 添加框
  upopen: false, // 修改框
});

// 获取用户列表
let getdata = async () => {
  data.spinning = true;
  await baseListApi(props.baseUrl, page).then((res) => {
    if(res.data.list){
      data.list = res.data.list;
      data.count = res.data.count;
      data.spinning = false;
      return
    }
    data.list = res.data;
    data.spinning = false;
    data.count = res.data.length;
  });
  
};

getdata();

// 选中
const rowSelection = {
  onChange: (selectedRowKeys) => {
    data.selectedRowKeys = selectedRowKeys;
  },
};
// 搜索
let onSearch = async () => {
  data.spinning = true;
  page.page = 1;
  getdata();
  data.spinning = false;
};
// 批量删除
let deleteUser = async () => {
  if (props.defaultDelFun) {
    let res = await baseDeleteApi(props.baseUrl, data.selectedRowKeys);
    if (res.code) {
      message.error(res.msg);
      return;
    }
    getdata();
    message.success(res.msg);
  }
  emit("delete", data.selectedRowKeys);
  data.selectedRowKeys = [];
};
// 删除单个
let deluser = async (id) => {
  if (props.defaultDelFun) {
    let res = await baseDeleteApi(props.baseUrl, [id]);
    if (res.code) {
      message.error(res.data);
      return;
    }
    getdata();
    message.success(res.msg);
  }
  emit("delete", [id]);
};

// 分页
let onChange = () => {
  if (page.key) {
    onSearch();
    return;
  }
  getdata();
};

// 删除提示框
const confirm = (id) => {
  deluser(id);
};

const cancel = () => {
  message.error("取消删除！");
};

defineExpose({
  getdata,
});


</script>

<style lang="scss">
.gvb_container {
  .gvb_search {
    padding-bottom: 10px;
    border-bottom: 1px solid var(--order);
  }

  .gvb_actions {
    margin: 10px 0px;

    .ant-btn-primary {
      margin-right: 6px;
    }
  }

  .gvb_table {
    margin-bottom: 10px;
    .gvb_btn.update {
      margin-right: 10px;
    }
  }

  .gvb_peage {
    text-align: center;
  }
}

.ellipsis {
  white-space: nowrap; /* 防止换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 显示省略号 */
  display: inline-block; /* 确保宽度生效 */
  width: 200px;
}
</style>