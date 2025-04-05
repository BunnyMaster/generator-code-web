<script lang="tsx" setup>
import { NCard, NDataTable, NTag } from 'naive-ui';
import { onMounted } from 'vue';

import { useTableStore } from '@/store/modules/table';
import { columns } from '@/views/home/columns';

const tableStore = useTableStore();

onMounted(() => {
  tableStore.getAllTableMetaData();
});
</script>

<template>
  <n-card class="my-2" title="提示">
    <p>
      点击
      <n-tag>表名</n-tag>
      或
      <n-tag>注释内容</n-tag>
      跳转
    </p>
    <p class="mt-2">
      数据库共
      <n-tag type="info">{{ tableStore.tableList.length }}</n-tag>
      张表
    </p>
  </n-card>

  <n-data-table :bordered="true" :columns="columns()" :data="tableStore.tableList" />
</template>

<style scoped></style>
