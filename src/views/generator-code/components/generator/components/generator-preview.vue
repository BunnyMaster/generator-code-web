<script lang="tsx" setup>
import { NButton, NCollapse, NCollapseItem, NInput, useDialog, useMessage } from 'naive-ui';
import { ref } from 'vue';

import { useVmsStore } from '@/store/modules/vms';
import { downloadTextAsFile } from '@/utils/file';

const dialog = useDialog();
const message = useMessage();
const vmsStore = useVmsStore();

const download = (code: string, filename: string) => {
  filename = filename.split('/')[1];
  const inputValue = ref(filename);

  dialog.info({
    title: '修改文件名',
    positiveText: '下载',
    negativeText: '取消',
    content: () => (
      <NInput
        placeholder="Tiny Input"
        clearable
        value={inputValue.value}
        onInput={(value: any) => (inputValue.value = value)}
      />
    ),
    onPositiveClick: () => {
      downloadTextAsFile(code, inputValue.value);
    },
    onNegativeClick: () => {
      message.info('取消下载');
    },
  });
};
</script>

<template>
  <n-collapse>
    <n-collapse-item
      v-for="(item, index) in vmsStore.generators"
      :key="index"
      :name="item.path"
      :title="item.path"
    >
      <template #header-extra>
        <n-button quaternary type="info" @click="download(item.code, item.path)">下载</n-button>
      </template>
      <n-input
        :autosize="{ minRows: 3 }"
        :placeholder="item.comment"
        :value="item.code"
        type="textarea"
      />
    </n-collapse-item>
  </n-collapse>
</template>
