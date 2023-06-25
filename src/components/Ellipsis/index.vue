<script setup lang="ts">
import { ref, computed, StyleValue, onMounted } from 'vue';

const props = defineProps<{
  rows: number;
}>();

const expanded = ref(false);
const isShow = ref(true);
const containerInner = ref<HTMLDivElement>();

const toggle = () => {
  expanded.value = !expanded.value;
};

const contentStyle = computed<StyleValue>(() =>
  expanded.value
    ? { 'white-space': 'pre-line' }
    : {
        display: '-webkit-box',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        '-webkit-line-clamp': props.rows,
        '-webkit-box-orient': 'vertical',
        'white-space': 'pre-line',
      },
);

const containerInnerChange = () => {
  if (!containerInner.value) {
    return;
  }
  const { offsetHeight, scrollHeight, offsetWidth, scrollWidth } = containerInner.value;
  isShow.value = props.rows !== 9999 && (scrollHeight > offsetHeight || scrollWidth > offsetWidth);
};

onMounted(() => {
  containerInnerChange();
});
</script>

<template>
  <div :class="Classes['container']">
    <div ref="containerInner" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
  <slot v-if="isShow" name="trigger">
    <a-divider style="margin: 10px 0px" />
    <a-button type="link" block :class="Classes['toggle-btn']" @click="toggle">
      <span>
        {{ expanded ? '收起' : '展开' }}
        <DownOutlined :class="[Classes['arrow'], Classes[expanded ? 'up' : '']]" size="20" />
      </span>
    </a-button>
  </slot>
</template>

<style lang="less" module="Classes">
.container {
  padding: 8px;
  font-size: 14px;
  color: #18191c;
}

.toggle-btn {
  .arrow {
    transition: 0.2s all;

    &.up {
      transform: rotateZ(180deg);
    }
  }

  .van-hairline-top {
    border-top: 1px solid #f1f2f3;
  }
}
</style>
