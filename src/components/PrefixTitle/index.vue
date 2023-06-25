<script lang="ts" setup>
import { CSSProperties } from 'vue';

withDefaults(defineProps<{ prefixClass?: string; prefixStyle?: CSSProperties; size?: 'small' | 'middle' }>(), {
  prefixClass: '',
  prefixStyle: undefined,
  size: 'middle',
});
</script>

<template>
  <section :class="Classes.wrapper">
    <span :class="[Classes.prefix, Classes[size], prefixClass]" :style="prefixStyle"></span>
    <slot></slot>
    <template v-if="$slots.extra">
      <!-- <p :class="Classes.extra"> -->
      <slot name="extra" />
      <!-- </p> -->
    </template>
  </section>
</template>

<style lang="less" module="Classes">
.wrapper {
  font-weight: 500;
  font-size: 14px;
  color: @text-color;
  line-height: 18px;
}
.prefix {
  display: inline-block;
  background: @primary-color;
  margin-right: 4px;
}
.small {
  width: 2px;
  height: 8px;
}
.middle {
  width: 3px;
  height: 11px;
}

.extra {
  display: inline-block;
  margin-left: 10px;
  color: #ffb027;
}
</style>
