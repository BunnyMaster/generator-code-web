<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules">
    <generator-form />

    <n-form-item>
      <n-grid class="justify-items-center" cols="3" x-gap="24">
        <n-gi>
          <n-button attr-type="button" type="success" @click="selectAll">全部选择</n-button>
          <n-button attr-type="button" type="warning" @click="selectAllInvert">全部反选</n-button>
          <n-button attr-type="button" type="error" @click="selectCancelAll">全选取消</n-button>
        </n-gi>

        <n-gi>
          <n-button attr-type="button" type="success" @click="onSubmit">开始生成</n-button>
          <n-button attr-type="button" type="error" @click="vmsStore.clearGenerators()">
            清空已生成
          </n-button>
          <n-button
            :disabled="!(vmsStore.generators.length > 0)"
            attr-type="button"
            type="primary"
            @click="downloadAll"
          >
            下载全部 {{ vmsStore.generators.length }}
          </n-button>
        </n-gi>

        <n-gi class="w-full">
          <n-button
            :disabled="hasDownloadZip"
            attr-type="button"
            class="w-full"
            type="success"
            @click="downloadZipFile"
          >
            下载zip
          </n-button>
        </n-gi>
      </n-grid>
    </n-form-item>
  </n-form>

  <!-- 生成好的数据 -->
  <generator-preview />
</template>

<script lang="tsx" setup>
import { NButton, NForm, NFormItem, NGi, NGrid, useMessage } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { computed, toRaw } from 'vue-demi';
import { useRoute } from 'vue-router';

import { downloadByZip } from '@/api/vms';
import { useVmsStore } from '@/store/modules/vms';
import { downloadBlob, downloadTextAsFile } from '@/utils/file';
import GeneratorForm from '@/views/generator-code/components/generator/components/generator-form.vue';
import GeneratorPreview from '@/views/generator-code/components/generator/components/generator-preview.vue';
import {
  formValueInit,
  selectAll,
  selectAllInvert,
  selectCancelAll,
  validateFormValue,
} from '@/views/generator-code/components/generator/hook';
import { formOption, formValue, rules } from '@/views/generator-code/components/generator/option';

const route = useRoute();
const vmsStore = useVmsStore();
const message = useMessage();
const formRef = ref();
const hasDownloadZip = computed(
  () => !(formOption.generatorWeb.length > 0 || formOption.generatorServer.length > 0)
);

/* 提交表单 */
const onSubmit = (e: MouseEvent) => {
  e.preventDefault();

  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      validateFormValue();

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

/* 下载全部 */
const downloadAll = () => {
  vmsStore.generators.forEach((vms) => {
    const code = vms.code;
    const path = vms.path.split('/')[1];

    downloadTextAsFile(code, path);
  });
};

/* 下载zip文件 */
const downloadZipFile = async () => {
  validateFormValue();

  const result = await downloadByZip(toRaw(formValue));
  downloadBlob(result);
};

onMounted(() => {
  // 初始化表名称
  const tableName: any = route.query.tableName;
  formValueInit(tableName);

  vmsStore.getVmsPathList();
});
</script>
