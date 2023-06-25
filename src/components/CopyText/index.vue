<script setup lang="ts">
import { message } from 'ant-design-vue';
import { copyText } from '@/utils';

// const props = withDefaults(defineProps<{ text: string; iconCode: string }>(), {
//   iconCode: 'icon-copy',
// });
const props = defineProps<{ text: string; iconCode: string }>();

function copyCode() {
  copyText(props.text).then(
    () => {
      message.success('复制成功');
    },
    () => {
      message.error('复制失败');
    },
  );
}
</script>

<template>
  <IconFont :icon="iconCode" @click="copyCode" />
</template>

<style module="Classes"></style>
