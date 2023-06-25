<script setup lang="ts">
/**
 * 权限 Layout 布局，用于权限管理
 */
// import { onMounted, ref } from 'vue';
// import AppLoading from '@/components/Loading/AppLoading.vue';
// import useCurrentUserStore from '@/store/useCurrentUserStore';

// const userStore = useCurrentUserStore();

// const loading = ref<boolean>(true);

// onMounted(async () => {
//   try {
//     await userStore.getCurrentUser();
//     loading.value = false;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     if (err?.data?.code !== -101) {
//       loading.value = false;
//     }
//   }
// });
</script>

<template>
  <!-- <AppLoading v-if="false" /> -->
  <router-view />
</template>
