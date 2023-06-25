<script setup lang="ts">
import RefreshPng from '@/assets/imgs/refresh.png';

defineProps<{ visible: boolean }>();
defineEmits(['update:visible']);
</script>

<template>
  <div :class="Classes.container">
    <img :src="RefreshPng" alt="" :class="Classes.img" />

    <div v-if="$slots.title" :class="Classes.title"><slot name="title"></slot></div>
    <div v-if="$slots.default" :class="Classes.subtitle"><slot></slot></div>
    <slot v-if="$slots.footer" name="footer"> </slot>
  </div>
</template>

<style lang="less" module="Classes">
.container {
  text-align: center;
}
.img {
  width: 210px;
  height: 118px;
}
.title {
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 18px;
  color: #2c3241;
}
.subtitle {
  height: 18px;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: @text-color-secondary;
  margin-bottom: 22px;
}
.confirm-btn {
  width: 164px;
  height: 30px;
}
</style>
