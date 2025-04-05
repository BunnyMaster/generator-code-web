<template>
  <n-config-provider>
    <n-message-provider>
      <content />
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade-transform'" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </n-message-provider>
  </n-config-provider>
</template>
<script lang="ts" setup>
import { NConfigProvider, NMessageProvider } from 'naive-ui';

import Content from '@/views/content.vue';
</script>
