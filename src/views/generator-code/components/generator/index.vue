<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules">
    <generator-form />

    <n-form-item>
      <n-button-group>
        <n-button attr-type="button" type="success" @click="selectAll">全部选择</n-button>
        <n-button attr-type="button" type="warning" @click="selectAllInvert">全部反选</n-button>
        <n-button attr-type="button" type="error" @click="selectCancelAll">全选取消</n-button>
        <n-button attr-type="button" type="info" @click="onSubmit">开始生成</n-button>
      </n-button-group>
    </n-form-item>
  </n-form>

  <!-- 生成好的数据 -->
  <generator-preview />
</template>

<script lang="ts" setup>
import { NButton, NButtonGroup, NForm, NFormItem, useMessage } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { toRaw } from 'vue-demi';
import { useRoute } from 'vue-router';

import { useVmsStore } from '@/store/modules/vms';
import GeneratorForm from '@/views/generator-code/components/generator/components/generator-form.vue';
import GeneratorPreview from '@/views/generator-code/components/generator/components/generator-preview.vue';
import {
  formValueInit,
  selectAll,
  selectAllInvert,
  selectCancelAll,
} from '@/views/generator-code/components/generator/hook';
import { formOption, formValue, rules } from '@/views/generator-code/components/generator/option';

const route = useRoute();
const vmsStore = useVmsStore();
const message = useMessage();
const formRef = ref();

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

onMounted(() => {
  // 初始化表名称
  const tableName: any = route.query.tableName;
  formValueInit(tableName);
});
</script>
