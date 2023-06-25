<script lang="ts" setup>
import { CSSProperties } from 'vue';

withDefaults(defineProps<{ style?: CSSProperties; className?: string }>(), {
  style: undefined,
  className: '',
});
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <a-result status="error" :style="style" :class="[Classes['error-text'], className]">
    <template #subTitle>
      <slot>上传失败，请重新上传 (⊙﹏⊙)</slot>
    </template>
    <template #icon>
      <slot name="icon"><img src="@/assets/imgs/load_error.png" :class="Classes['error-img']" /></slot>
    </template>
    <template v-if="$slots.extra" #extra>
      <slot name="extra"></slot>
    </template>
  </a-result>
</template>

<style lang="less" module="Classes">
.error-img {
  width: 280px;
  width: 158px;
}
.error-text {
  padding: 32px;
  :global {
    .ant-result-subtitle {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: @error-color;
    }
  }
}
</style>
