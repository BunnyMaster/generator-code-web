import { defineStore } from 'pinia';

import { generator } from '@/api/vms';

export const useVmsStore = defineStore('vmsStore', {
  state: () => ({
    generators: [],
  }),
  getters: {},
  actions: {
    /* 获取所有数据表 */
    async generator(data: any) {
      const result = await generator(data);
      // 需要确保已经在 setup 中执行了 window.$message = message
      if (result.code !== 200) {
        (window as any).$message.error(result.message);
      }

      this.generators = result.data;
      (window as any).$message.success(`生成成功，共 ${this.generators.length} 数据`);
    },
  },
});
