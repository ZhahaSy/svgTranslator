<template>
  <a-modal
    :visible="visible"
    :mask-closable="false"
    :body-style="bodyStyle"
    :width="computedWidth || '500px'"
    class="modalWrapper"
    v-bind="$attrs"
  >
    <template #title>
      <PrefixTitle v-bind="titleProps">
        <template #default>
          {{ title }}
        </template>
        <template v-if="$slots.extra" #extra>
          <slot name="extra" />
        </template>
      </PrefixTitle>
    </template>
    <slot name="content"></slot>
    <template v-if="$slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from 'vue';

interface Props {
  visible: boolean;
  title: string;
  bodyStyle?: CSSProperties;
  width: string | number;
  titleProps?: Record<string, unknown>;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  title: '',
  width: '',
  bodyStyle: undefined,
  titleProps: undefined,
});

const computedWidth = computed(() => {
  const type = typeof props.width;
  if (type === 'number') {
    return `${props.width}px`;
  }
  return props.width;
});
</script>

<style lang="less" module="Classes">
//弹窗
.sub-title {
  font-size: 14px;
  color: #333333;
  margin-left: 10px;
  font-weight: normal;
}
</style>

<style lang="less">
.modalWrapper {
  .ant-modal-header {
    border-bottom: 0;
  }
}
</style>
