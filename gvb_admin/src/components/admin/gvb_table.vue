<template>
  <div class="gvb_container">
    <div class="gvb_search">
      <a-input-search
        v-model:value.trim="page.key"
        placeholder="请输入用户名"
        style="width: 200px"
        @search="onSearch"
      />
    </div>
    <div class="gvb_actions">
      <slot name="add">
        
      </slot>
      <a-button
        class="gvb_btn del"
        danger
        v-if="data.selectedRowKeys.length > 0&&isDels"
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
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'avatar_id'">
              <a-avatar :size="44" :src="record.avatar_id" />
            </template>
            <template v-if="column.key === 'created_at'">
              {{ formatTime(record.created_at) }}
            </template>
            <template v-if="column.key === 'action'">
              <slot name="edit" :record="record">
              </slot>
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
import { reactive, ref } from "vue";
import { formatTime } from "@/utils/date";

import { message } from "ant-design-vue";
import { baseListApi } from "@/api/base_api";
let emit = defineEmits(["delete"]);

const props = defineProps({
  columns: {
    type: Array,
    default: [],
  },
  baseUrl: {
    type: String,
    default: "",
  },
  isDel:{
    type:Boolean,
    default:false
  },
  isDels:{
    type:Boolean,
    default:false
  }
});
// 搜索框
let searchValue = ref("");

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
    data.list = res.data.list;
    data.count = res.data.count;
    data.spinning = false;
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
  page.page=1
  getdata();
  data.spinning = false;
};
// 批量删除
let deleteUser = async () => {
  emit("delete", data.selectedRowKeys);
};
// 删除单个
let deluser = async (id) => {
  emit("delete", [id]);
};

// 分页
let onChange = () => {
  if (searchValue.value) {
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
      margin-right: 4px;
    }
  }

  .gvb_peage {
    text-align: center;
  }
}
</style>