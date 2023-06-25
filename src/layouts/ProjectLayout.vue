<script setup lang="ts">
/**
 * 项目 Layout 布局，位于项目最顶层。用于添加全部配置或者功能
 */
import zhCN from 'ant-design-vue/es/locale/zh_CN';
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>
