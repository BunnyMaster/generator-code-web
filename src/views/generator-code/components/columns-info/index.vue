<script lang="ts" setup>
import { NDataTable } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useTableStore } from '@/store/modules/table';
import { columns } from '@/views/generator-code/components/columns-info/columns';

const route = useRoute();
const tableStore = useTableStore();

// 数据库中当前表的列信息
const datalist = ref([]);

/* 数据库列信息 */
const getColumnInfo = async () => {
  const tableName: any = route.query.tableName;
  datalist.value = await tableStore.getColumnInfo(tableName);
};

onMounted(() => {
  getColumnInfo();
});
</script>

<template>
  <n-data-table :bordered="true" :columns="columns" :data="datalist" />
</template>

<style scoped></style>
