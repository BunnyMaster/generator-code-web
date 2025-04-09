import { defineStore } from 'pinia';

import { generator, getVmsPathList } from '@/api/vms';

export const useVmsStore = defineStore('vmsStore', {
  state: () => ({
    generators: [],

    // 生成服务端内容
    serverOptions: [],

    // 生成前端内容
    webOptions: [],
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

      this.generators = result.data.map((i) => ({ ...i, path: i.path.replace('.vm', '') }));
      (window as any).$message.success(`生成成功，共 ${this.generators.length} 数据`);
    },

    /* 获取vms文件路径 */
    async getVmsPathList() {
      const result = await getVmsPathList();
      // 需要确保已经在 setup 中执行了 window.$message = message
      if (result.code !== 200) {
        (window as any).$message.error(result.message);
        return {};
      }

      this.webOptions = result.data.web;
      this.serverOptions = result.data.server;
    },

    /* 晴空已生成 */
    clearGenerators() {
      this.generators = [];
    },
  },
});
