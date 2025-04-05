<script lang="ts" setup>
import { NCollapse, NCollapseItem, NInput } from 'naive-ui';

import { useVmsStore } from '@/store/modules/vms';

const vmsStore = useVmsStore();
</script>

<template>
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
