<script lang="ts" setup>
import { NCard, NTabPane, NTabs } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useTableStore } from '@/store/modules/table';
import { useVmsStore } from '@/store/modules/vms';
import Index from '@/views/generator-code/components/column-field/index.vue';
import GeneratorForm from '@/views/generator-code/components/generator/index.vue';

const router = useRouter();
const route = useRoute();
const tableStore = useTableStore();
const vmsStore = useVmsStore();
const { formValue, formOption } = storeToRefs(vmsStore);

// 数据库表信息
const tableInfo = reactive({
  /* 表名称 */
  tableName: '',
  /* 注释内容 */
  comment: '',
  /* 数据库内容 */
  tableCat: '',
  /* 通常是 "TABLE" */
  tableType: '',
});

/* 获取数据库表属性 */
const getTableData = async () => {
  const tableName: any = route.query.tableName;
  const tableMetaData = await tableStore.getTableMetaData(tableName);
  Object.assign(tableInfo, tableMetaData);

  // 设置 生成表单注释值
  formValue.value.comment = tableInfo.comment;
};

onMounted(() => {
  getTableData();
});
</script>
<template>
  <n-card>
    <template #header>
      <n-card title="数据库信息">
        <span class="color-blue cursor-pointer" @click="router.push('/')">回到首页</span>
        <ul>
          <li>表名：{{ route.query.tableName }}</li>
          <li>表注释：{{ tableInfo.comment }}</li>
          <li>数据库名：{{ tableInfo.tableCat }}</li>
          <li>类型：{{ tableInfo.tableType }}</li>
        </ul>
      </n-card>
    </template>

    <n-tabs animated type="line">
      <n-tab-pane name="generator-code" tab="生成">
        <generator-form />
      </n-tab-pane>

      <n-tab-pane name="columns-info" tab="列字段">
        <index />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
