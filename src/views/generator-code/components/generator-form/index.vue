<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules">
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="8" label="作者名称" path="author">
        <n-input v-model:value="formValue.author" placeholder="输入姓名" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="requestMapping名称" path="requestMapping">
        <n-input v-model:value="formValue.requestMapping" placeholder="输入年龄" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="表名称" path="tableName">
        <n-input v-model:value="formValue.tableName" placeholder="电话号码" />
      </n-form-item-gi>
    </n-grid>

    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="8" label="类名称" path="className">
        <n-input v-model:value="formValue.className" placeholder="电话号码" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="包名称" path="packageName">
        <n-input v-model:value="formValue.packageName" placeholder="电话号码" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="时间格式" path="simpleDateFormat">
        <n-input v-model:value="formValue.simpleDateFormat" placeholder="电话号码" />
      </n-form-item-gi>
    </n-grid>

    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="8" label="去除开头前缀" path="tablePrefixes">
        <n-input v-model:value="formValue.tablePrefixes" placeholder="电话号码" />
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="生成后端" path="generatorServer">
        <n-checkbox-group v-model:value="formOption.generatorServer">
          <n-space>
            <n-checkbox v-for="(item, index) in serverOptions" :key="index" :value="item.name">
              {{ item.label }}
            </n-checkbox>
          </n-space>
        </n-checkbox-group>
      </n-form-item-gi>
      <n-form-item-gi :span="8" label="生成前端" path="generatorWeb">
        <n-checkbox-group v-model:value="formOption.generatorWeb">
          <n-space>
            <n-checkbox v-for="(item, index) in webOptions" :key="index" v-model:value="item.name">
              {{ item.label }}
            </n-checkbox>
          </n-space>
        </n-checkbox-group>
      </n-form-item-gi>
    </n-grid>

    <n-form-item>
      <n-button attr-type="button" class="w-full" type="primary" @click="onSubmit">
        开始生成
      </n-button>
    </n-form-item>
  </n-form>

  <!-- 生成好的数据 -->
  <n-collapse>
    <n-collapse-item
      v-for="(item, index) in vmsStore.generators"
      :key="index"
      :name="item.path"
      :title="item.path"
    >
      <n-input
        :autosize="{ minRows: 3 }"
        :placeholder="item.comment"
        :value="item.code"
        type="textarea"
      />
    </n-collapse-item>
  </n-collapse>
</template>

<script lang="ts" setup>
import {
  NButton,
  NCheckbox,
  NCheckboxGroup,
  NCollapse,
  NCollapseItem,
  NForm,
  NFormItem,
  NFormItemGi,
  NGrid,
  NInput,
  NSpace,
  useMessage,
} from 'naive-ui';
import { onMounted, reactive, ref } from 'vue';
import { toRaw } from 'vue-demi';
import { useRoute } from 'vue-router';

import { useVmsStore } from '@/store/modules/vms';
import {
  rules,
  serverOptions,
  webOptions,
} from '@/views/generator-code/components/generator-form/generatorOptions';

const route = useRoute();
const vmsStore = useVmsStore();
const message = useMessage();
const formRef = ref();

const formOption = reactive({
  generatorServer: [],
  generatorWeb: [],
});
const formValue = reactive({
  author: 'Bunny',
  packageName: 'cn.bunny.services',
  requestMapping: '/api',
  className: '',
  tableName: '',
  simpleDateFormat: 'yyyy-MM-dd HH:mm:ss',
  tablePrefixes: 't_,sys_,qrtz_,log_',
  path: [],
});

/* 提交表单 */
const onSubmit = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      // 选择要生成的模板
      const generatorWeb = formOption.generatorWeb;
      const generatorServer = formOption.generatorServer;

      // 整理好路径
      const server = generatorServer.map((server: string) => `server/${server}`);
      const web = generatorWeb.map((server: string) => `web/${server}`);

      // 整理好数据
      formValue.path = [...server, ...web];
      if (formValue.path.length <= 0) {
        message.error(`选择要生成的模板`);
        return;
      }

      // 生成代码
      await vmsStore.generator(toRaw(formValue));
    } else {
      errors.forEach((error: any) => {
        error.forEach((err: any) => {
          message.error(`${err.message}->${err.field}`);
        });
      });
    }
  });
};

/* 初始化表单信息 */
const formValueInit = () => {
  // 初始化表名称
  const tableName = route.query.tableName;
  formValue.tableName = tableName.toString();

  // 替换类名称
  let className: any = tableName as any;
  formValue.tablePrefixes.split(/[,，]/).forEach((item) => {
    className = className.replace(item, '');
  });
  formValue.className = className;
};

onMounted(() => {
  formValueInit();
});
</script>
