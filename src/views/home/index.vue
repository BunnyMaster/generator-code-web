<script lang="tsx" setup>
import type { SelectOption } from 'naive-ui';
import { NCard, NDataTable, NSelect, NTag, NTooltip } from 'naive-ui';
import type { VNode } from 'vue';
import { h, onMounted } from 'vue';

import { useTableStore } from '@/store/modules/table';
import { columns } from '@/views/home/columns';

const tableStore = useTableStore();

/* 数据库所有的表 */
const getDbTables = (dbName: string) => {
  tableStore.getDbTables({ dbName: dbName ?? undefined });
};

/* 为select添加 提示 */
const renderOptions = ({ node, option }: { node: VNode; option: SelectOption }) => {
  return h(NTooltip, null, {
    trigger: () => node,
    default: () => option.comment,
  });
};

onMounted(() => {
  getDbTables(undefined);
  tableStore.getDbList();
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

    <!-- 选择数据库 -->
    <n-select
      :on-update-value="getDbTables"
      :options="tableStore.dbList"
      :render-option="renderOptions"
      class="mt-2 w-[200px]"
      clear-filter-after-select
      clearable
      placeholder="选择数据库"
    />
  </n-card>

  <n-data-table
    :bordered="true"
    :columns="columns()"
    :data="tableStore.tableList"
    :loading="tableStore.tableListLoading"
  />
</template>
