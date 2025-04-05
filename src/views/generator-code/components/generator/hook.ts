import { reactive } from 'vue';

import { serverOptions, webOptions } from '@/views/generator-code/components/generator/option';

export const formOption = reactive({
  generatorServer: [],
  generatorWeb: [],
});

export const formValue = reactive({
  author: 'Bunny',
  packageName: 'cn.bunny.services',
  requestMapping: '/api',
  className: '',
  tableName: '',
  simpleDateFormat: 'yyyy-MM-dd HH:mm:ss',
  tablePrefixes: 't_,sys_,qrtz_,log_',
  path: [],
});

/* 初始化表单信息 */
export const formValueInit = (tableName: any) => {
  formValue.tableName = tableName.toString();

  // 替换类名称
  let className: any = tableName as any;
  formValue.tablePrefixes.split(/[,，]/).forEach((item) => {
    className = className.replace(item, '');
  });
  formValue.className = className;
};

/* 全部选择 */
export const selectAll = () => {
  formOption.generatorServer = serverOptions.map((option: any) => option.name);
  formOption.generatorWeb = webOptions.map((option: any) => option.name);
};

/* 全部反选 */
export const selectAllInvert = () => {
  // 反选server
  const serverNames: string[] = serverOptions.map((item) => item['name']);
  const generatorServer = formOption.generatorServer;
  formOption.generatorServer = serverNames.filter(
    (name: string) => !generatorServer.includes(name)
  );

  // 反选web
  const webNames: string[] = webOptions.map((item) => item['name']);
  const generatorWeb = formOption.generatorWeb;
  formOption.generatorWeb = webNames.filter((name) => !generatorWeb.includes(name));
};

/* 取消全部选择 */
export const selectCancelAll = () => {
  formOption.generatorServer = [];
  formOption.generatorWeb = [];
};
