<script lang="ts" setup></script>

<template>
  <div :class="Classes['loading-wrapper']">
    <div :class="Classes['loading-inner']" />
    <div :class="Classes.tip">
      <slot />
    </div>
  </div>
</template>

<style lang="less" module="Classes">
.loading-wrapper {
  width: auto;
  height: auto;
  text-align: center;
}
.loading-inner {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  animation: loading 0.8s linear infinite both;
  background: no-repeat center center;
  margin-bottom: 10px;
}
.tip {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #fff;
}

@keyframes loading {
  from,
  25% {
    // background-color: red;
    background-image: url(@/assets/imgs/loading/loading1.svg);
  }
  26%,
  50% {
    // background-color: blue;
    background-image: url(@/assets/imgs/loading/loading2.svg);
  }
  51%,
  75% {
    // background-color: yellow;
    background-image: url(@/assets/imgs/loading/loading3.svg);
  }
  76%,
  to {
    // background-color: green;
    background-image: url(@/assets/imgs/loading/loading4.svg);
  }
}
</style>
