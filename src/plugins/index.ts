import type { App } from 'vue';

import { setupRouter } from '@/router';
import { setupStore } from '@/store';

export default {
  install(app: App<Element>) {
    // 设置路由
    setupRouter(app);
    // 设置状态管理
    setupStore(app);
  },
};
