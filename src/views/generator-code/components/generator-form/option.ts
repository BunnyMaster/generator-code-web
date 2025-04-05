import type { FormRules } from 'naive-ui';

import { formOption, formValue } from '@/views/generator-code/components/generator-form/hook';

/* 验证生成前后端内容是否合法 */
const validatorFormOption = () => {
  return formOption.generatorServer.length > 0 || formOption.generatorWeb.length > 0;
};

// 生成服务端内容
export const serverOptions = [
  { name: 'controller', label: 'controller' },
  { name: 'mapper', label: 'mapper' },
  { name: 'resourceMapper', label: 'resourceMapper' },
  { name: 'service', label: 'service' },
  { name: 'serviceImpl', label: 'serviceImpl' },
];

// 生成前端内容
export const webOptions = [
  { name: 'api', label: 'api' },
  { name: 'columns', label: 'columns' },
  { name: 'dialog', label: 'dialog' },
  { name: 'hook', label: 'hook' },
  { name: 'index', label: 'index' },
  { name: 'store', label: 'store' },
  { name: 'types', label: 'types' },
];

// 表单验证
export const rules: FormRules = {
  author: { required: true, trigger: ['blur', 'change', 'input'], message: '作者不能为空' },
  packageName: { required: true, trigger: ['blur', 'change', 'input'], message: '包名不能为空' },
  requestMapping: {
    required: true,
    trigger: ['blur', 'change', 'input'],
    message: '请求路径不能为空',
  },
  className: { required: true, trigger: ['blur', 'change', 'input'], message: '类名不能为空' },
  tableName: { required: true, trigger: ['blur', 'change', 'input'], message: '表名不能为空' },
  simpleDateFormat: {
    required: true,
    trigger: ['blur', 'change', 'input'],
    message: '日期格式不能为空',
  },
  generatorServer: [
    {
      required: true,
      trigger: ['blur', 'change', 'input'],
      message: '选择要生成的服务端',
      validator: validatorFormOption,
    },
  ],
  generatorWeb: [
    {
      required: true,
      trigger: ['blur', 'change', 'input'],
      message: '选择要生成的前端',
      validator: validatorFormOption,
    },
  ],
};

export { formOption, formValue };
