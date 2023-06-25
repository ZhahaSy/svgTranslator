<script lang="ts" setup>
import { computed, useAttrs } from 'vue';
import { notification, Upload, UploadDragger } from 'ant-design-vue';
import type { UploadFile } from 'ant-design-vue';

import { ALL_SUPPORT_FILE_SUFFIX } from '@/constants';
import { isArray, isFunction } from '@/utils/is';

type UploadProps = {
  fileList?: UploadFile[];
  name?: string;
  action?: string;
  accept?: Array<string>;
  maxSize?: number;
  dragger?: boolean;
};

const props = withDefaults(defineProps<UploadProps>(), {
  fileList: () => [],
  name: 'file',
  action: '/api/budget/file/upload',
  accept: () => ALL_SUPPORT_FILE_SUFFIX,
  // maxSize 单位是 kb，默认 50 M
  maxSize: 50 * 1024,
  dragger: false,
});

defineEmits(['update:file-list']);

const attrs = useAttrs();

const container = computed(() => {
  return props.dragger ? UploadDragger : Upload;
});

/**
 * 获取随机数
 * @returns
 */
const randomString = () => {
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < 32; i += 1) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

const uploadHeaders = {
  'X-AppKey': 'ops.fin-api.budget',
  'X-CSRF': randomString(),
};

const checkSize = (size: number) => {
  return size <= props.maxSize * 1024;
};

const beforeUpload = (file: UploadFile, list: UploadFile[]) => {
  const overSize = !checkSize(file?.size || 0);
  // 如果文件过大，则提示上传失败
  if (overSize) {
    notification.error({
      message: '上传失败',
      description: `${file.name} 文件超过了${props.maxSize || 0}kb`,
      duration: 3,
    });
    file.status = 'error';
    return false;
  }
  if (!file?.size || file.size <= 0) {
    notification.error({
      message: '上传失败',
      description: `${file.name} 文件内容为空，无法上传`,
      duration: 3,
    });
    file.status = 'error';
    return false;
  }
  if (isFunction(attrs.beforeUpload)) {
    return attrs.beforeUpload(file, list);
  }
  return true;
};

const allowAccept = computed(() => {
  return isArray(props.accept) ? props.accept.join(',') : props.accept;
});

const onReject = () => {
  notification.error({
    message: '上传失败',
    description: `只支持${allowAccept.value} 后缀的文件类型`,
    duration: 3,
  });
};
</script>

<template>
  <component
    :is="container"
    :class="Classes['upload-wrapper']"
    :file-list="fileList"
    :name="name"
    :headers="{ ...uploadHeaders, ...($attrs.headers || {}) }"
    :action="action"
    :before-upload="beforeUpload"
    :accept="allowAccept"
    @update:file-list="$emit('update:file-list', $event)"
    @reject="onReject"
  >
    <slot>
      <a-button>
        <UploadOutlined />
        Upload
      </a-button>
    </slot>
  </component>
</template>

<style lang="less" module="Classes">
.upload-wrapper {
  border-color: rgba(0, 0, 0, 0) !important;
}
</style>
