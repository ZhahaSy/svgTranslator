<script setup lang="ts">
import { BudgetFile } from '@/entities/BudgetFile';
import useFileOperate from '@/hooks/useFileOperate';
import { chooseFileIcon } from '@/utils';
import { computed, ref } from 'vue';
import { InfoCircleFilled, SyncOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const props = withDefaults(defineProps<{ file: BudgetFile; disabled?: boolean }>(), {
  disabled: true,
});
defineEmits(['remove', 'download', 'preview']);

const loading = ref(false);

const { download, preview } = useFileOperate();

const iconType = computed(() => {
  return chooseFileIcon(props.file.fileName || props.file.name);
});

const isError = computed(() => {
  const { status = '', batchId } = props.file;
  return props.file.status === 'error' || (['success', 'done'].includes(status) && batchId);
});

const onDownload = async () => {
  if (loading.value) {
    message.info('正在加载中，请稍后~~');
  }
  loading.value = true;
  try {
    await download(props.file.batchId ? props.file : { ...props.file, ...props.file?.response?.data });
  } finally {
    loading.value = false;
  }
};

const onPreview = async () => {
  if (loading.value) {
    message.info('正在加载中，请稍后~~');
  }
  loading.value = true;
  try {
    await preview(props.file.batchId ? props.file : { ...props.file, ...props.file?.response?.data });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section :class="[Classes.wrapper, isError ? Classes.error : '']">
    <div
      :class="{ [Classes.inner]: true, [Classes.disabled]: disabled, [Classes.error]: isError }"
      @click.stop="() => ($attrs.preview ? $emit('preview') : onPreview())"
    >
      <div :class="Classes['inner-title']">
        <InfoCircleFilled v-if="isError" style="vertical-align: middle; color: #f85a54" />
        <IconFont v-else :icon="iconType" :size="18" />
        <a-typography-paragraph
          :class="Classes['inner-title-content']"
          ellipsis
          :content="file.fileName || file.name"
        />
      </div>
      <SyncOutlined v-if="file.status === 'uploading' || loading" spin :size="12" style="color: rgb(0, 138, 197)" />
      <IconFont
        v-else
        icon="icon-arrow_download_down_fill_322"
        :size="18"
        :style="{ color: '#008AC5' }"
        @click.stop="() => ($attrs.download ? $emit('download') : onDownload())"
      />
    </div>
    <IconFont
      v-if="!disabled && file.status !== 'uploading'"
      :style="{ marginLeft: '4px', marginTop: '2px', lineHeight: '42px' }"
      icon="icon-trash_delete_line_32"
      :size="18"
      @click.stop="$emit('remove')"
    />
    <span v-if="isError" :class="Classes.extra">上传失败</span>
  </section>
</template>

<style lang="less" module="Classes">
.wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 42px;
}
.inner {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 22px);
  height: 42px;
  max-width: 324px;
  background: #fff;
  padding: 9px;
  border: 1px solid #f3f3f3;
  border-radius: 7px;
  cursor: pointer;
}
.inner-title {
  flex: 1;
  width: calc(100% - 22px);
  .inner-title-icon {
    margin-right: 8px;
  }
  .inner-title-content {
    display: inline-block;
    width: calc(100% - 40px);
    max-width: 220px;
    margin-bottom: 0;
    margin-left: 6px;
    font-weight: 400;
    font-size: 12px;
    vertical-align: middle;
    line-height: 17px;
    color: @text-color;
  }
}
.inner.disabled {
  width: 100%;
}
.inner.error {
  border-color: @error-color;
}

.wrapper.error {
  height: 64px;
}
.extra {
  position: absolute;
  bottom: 0px;
  left: 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: @error-color;
}
</style>
