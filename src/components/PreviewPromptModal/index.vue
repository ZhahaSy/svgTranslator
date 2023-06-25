<template>
  <a-modal :visible="visible" :closable="false" :footer="null" :title="null" :width="338">
    <Empty>
      <template #title><slot name="title">无法预览？</slot></template>
      <template #default><slot>请尝试重新上传文件哦～</slot></template>
      <template #footer>
        <slot name="footer">
          <a-button :class="Classes['confirm-btn']" type="primary" @click="$emit('update:visible', false)"
            >我知道了</a-button
          >
        </slot>
      </template>
    </Empty>
  </a-modal>
</template>

<script setup lang="ts">
defineProps<{ visible: boolean }>();
defineEmits(['update:visible']);
</script>

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
