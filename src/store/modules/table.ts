import { defineStore } from 'pinia';

import { getColumnInfo, getDbList, getDbTables, getTableMetaData } from '@/api/table';

export const useTableStore = defineStore('tableStore', {
  state: () => ({
    // 数据库所有的表
    tableList: [],
    tableListLoading: false,
    // 数据列表
    dbList: [],
  }),
  getters: {},
  actions: {
    /* 所有的数据库 */
    async getDbList() {
      this.tableListLoading = true;
      const result = await getDbList();

      if (result.code !== 200) {
        (window as any).$message.error(result.message);
        this.tableListLoading = false;
        return;
      }

      // 整理返回数据格式
      const list = result.data.map((db: any) => ({
        label: db.tableCat,
        value: db.tableCat,
        comment: db.comment,
      }));

      // 在开头添加
      list.unshift({ label: '无', value: undefined, comment: '查询全部' });

      this.dbList = list;
      this.tableListLoading = false;
    },

    /* 数据库所有的表 */
    async getDbTables(data: any) {
      const result = await getDbTables(data);
      if (result.code !== 200) {
        (window as any).$message.error(result.message);
      }

      this.tableList = result.data;
    },

    /* 获取表属性 */
    async getTableMetaData(tableName: string) {
      const result = await getTableMetaData({ tableName });
      if (result.code !== 200) {
        (window as any).$message.error(result.message);
        return {};
      }

      return result.data;
    },

    /* 获取表属性 */
    async getColumnInfo(tableName: string) {
      const result = await getColumnInfo({ tableName });
      if (result.code !== 200) {
        (window as any).$message.error(result.message);
        return {};
      }

      return result.data;
    },
  },
});
