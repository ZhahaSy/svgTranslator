<script lang="ts" setup>
import { createFromIconfontCN } from '@ant-design/icons-vue';
import { isBlank } from '@/utils';

interface Props {
  /**
   * Iconfont 中的 symbol 名称
   */
  icon: string;

  /**
   * icon 大小
   *
   * 传入后会自动带上 px 单位，此值会以 style 的形式赋值给 font-size 属性
   *
   * eg：
   * 传入 20，渲染为：:style="{ fontSize: '20px' }"
   *
   * PS:
   * - 如果需要使用其他单位设置 font-size，可以通过 style 或者 class 进行设置。
   * - 在对 Iconfont 自定义样式时，推荐使用 px 作为 font-size 的单位，因为一般来说， icon 不需要根据屏幕进行大小适配。
   */
  size?: number;
}

withDefaults(defineProps<Props>(), { size: undefined });

const AntIconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3618847_kj7iy76k6t.js',
});
</script>

<template>
  <AntIconFont
    :type="icon"
    :class="Classes['ant-icon-font']"
    :style="{ fontSize: isBlank(size) ? undefined : `${size}px` }"
  />
</template>

<style lang="less" module="Classes">
.ant-icon-font {
  vertical-align: middle;
}
</style>
