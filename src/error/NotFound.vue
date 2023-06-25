<template>
  <div>404错误</div>
  <a :href="fromUrl">刷新页面</a>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const fromUrl = computed(() => {
  return route.query.fromUrl || '';
});
</script>

<style scoped></style>
