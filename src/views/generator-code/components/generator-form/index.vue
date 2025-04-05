<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" inline>
    <n-form-item label="姓名" path="user.name">
      <n-input v-model:value="formValue.name" placeholder="输入姓名" />
    </n-form-item>
    <n-form-item label="年龄" path="user.age">
      <n-input v-model:value="formValue.age" placeholder="输入年龄" />
    </n-form-item>
    <n-form-item label="电话号码" path="phone">
      <n-input v-model:value="formValue.phone" placeholder="电话号码" />
    </n-form-item>
    <n-form-item>
      <n-button attr-type="button" @click="handleValidateClick">验证</n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { FormRules, NButton, NForm, NFormItem, NInput, useMessage } from 'naive-ui';
import { reactive, ref } from 'vue';

const rules: FormRules = {
  input: {
    required: true,
    trigger: ['focus', 'input'],
    renderMessage: () => {
      return localeRef.value === '语言1'
        ? '抽离透传归因分析作为抓手为产品赋能'
        : '方法论是组合拳达到平台化标准';
    },
  },
};
const message = useMessage();
const formRef = ref();
const formValue = reactive({});

const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault();
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      message.success('验证成功');
    } else {
      console.log(errors);
      message.error('验证失败');
    }
  });
};
</script>
