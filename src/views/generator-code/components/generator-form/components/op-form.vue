<script lang="ts" setup>
import { NCheckbox, NCheckboxGroup, NFormItemGi, NGrid, NInput, NSpace } from 'naive-ui';

import SelectButtonGroup from '@/views/generator-code/components/generator-form/components/select-button-group.vue';
import {
  formOption,
  formValue,
  serverOptions,
  webOptions,
} from '@/views/generator-code/components/generator-form/option';
</script>

<template>
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

          <!-- 选择按钮 -->
          <select-button-group
            v-model:selected="formOption.generatorServer"
            :data="serverOptions"
            id-key="name"
          />
        </n-space>
      </n-checkbox-group>
    </n-form-item-gi>
    <n-form-item-gi :span="8" label="生成前端" path="generatorWeb">
      <n-checkbox-group v-model:value="formOption.generatorWeb">
        <n-space>
          <n-checkbox v-for="(item, index) in webOptions" :key="index" v-model:value="item.name">
            {{ item.label }}
          </n-checkbox>

          <!-- 选择按钮 -->
          <select-button-group
            v-model:selected="formOption.generatorWeb"
            :data="webOptions"
            id-key="name"
          />
        </n-space>
      </n-checkbox-group>
    </n-form-item-gi>
  </n-grid>
</template>
