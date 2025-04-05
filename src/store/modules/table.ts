import { useMessage } from 'naive-ui';
import { defineStore } from 'pinia';

import { getAllTableMetaData, getColumnInfo, getTableMetaData } from '@/api/table';

export const useTableStore = defineStore('tableStore', {
  state: () => ({
    // 数据库所有的表
    tableList: [],
  }),
  getters: {},
  actions: {
    /* 获取所有数据表 */
    async getAllTableMetaData() {
      const message = useMessage();
      const result = await getAllTableMetaData();
      if (result.code !== 200) {
        message.error(result.message);
      }

      this.tableList = result.data;
    },

    /* 获取表属性 */
    async getTableMetaData(tableName: string) {
      const message = useMessage();
      const result = await getTableMetaData({ tableName });
      if (result.code !== 200) {
        message.error(result.message);
        return {};
      }

      return result.data;
    },

    /* 获取表属性 */
    async getColumnInfo(tableName: string) {
      const message = useMessage();
      const result = await getColumnInfo({ tableName });
      if (result.code !== 200) {
        message.error(result.message);
        return {};
      }

      return result.data;
    },
  },
});
