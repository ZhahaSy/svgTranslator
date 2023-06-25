<template>
  <div class="editorContainer" :style="editorContainerStyle">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :default-config="defaultToolbarConfig" />
    <Editor
      :model-value="modelValue"
      style="min-height: 200px; border-radius: 4px; overflow: hidden"
      :default-config="editorConfig"
      mode="simple"
      @update:model-value="handleUpdate"
      @on-created="handleCreated"
      @click.stop="editorFocus"
    />
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IDomEditor } from '@wangeditor/editor';
import { Form } from 'ant-design-vue';

import { onBeforeUnmount, shallowRef, watch } from 'vue';
import { upload } from '@/api/file';
import useFileOperate from '@/hooks/useFileOperate';
import { FileType } from '@/enums';
import { defaultToolbarConfig } from './config';

interface Props {
  modelValue: string;
  editorStyle?: string;
  editorContainerStyle?: string;
  maxLength?: number;
  // toolbarConfig?: IToolbarConfig;
  customUploadImage?: (files: string | Blob) => void;
}

type InsertFnType = (url: string, alt: string, href: string) => void;

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  editorStyle: '',
  editorContainerStyle: '',
  maxLength: 5000,
  // toolbarConfig: undefined,
  customUploadImage: undefined,
});

const emit = defineEmits(['update:modelValue']);

const { getImgRenderUrl } = useFileOperate();

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

const defaultUploadImage = async (files: string | Blob, insertFn: InsertFnType) => {
  const formData = new FormData();

  formData.append('file', files);
  formData.append('fileType', `${FileType.OTHER}`);

  const { data } = await upload(formData);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  insertFn(getImgRenderUrl(data!.batchId), '', 'show');
};

// const toolbarConfig = {};
const editorConfig = {
  MENU_CONF: {
    fontSize: {
      fontSizeList: ['12px', '13px', '14px', '15px', '16px', '19px', '22px', '24px', '29px', '32px', '40px'],
    },
    uploadImage: {
      customUpload: props.customUploadImage || defaultUploadImage,
      // 自定义插入图片
    },
  },
  hoverbarKeys: {
    image: {
      // 清空 image 元素的 hoverbar
      menuKeys: [],
    },
    link: {
      menuKeys: [],
    },
  },
  placeholder: '请输入内容',
  autoFocus: false,
};

const formItemContext = Form.useInjectFormItemContext();

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    // // 为了处理在form组件中，调用resetFields方法
    if (newVal !== oldVal) {
      formItemContext.onFieldChange();
    }
  },
);
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const handleUpdate = () => {
  if (editorRef.value.isEmpty()) {
    emit('update:modelValue', '');
  } else {
    emit('update:modelValue', editorRef.value?.getHtml());
  }
};

const editorFocus = () => {
  editorRef.value.focus();
};
</script>

<style lang="less" class="Classes">
.editorContainer {
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>

<style lang="less">
// 换行高度限制
.w-e-text-container p {
  margin: 5px 0 !important;
}
// placeholder 距离顶部距离限制
.w-e-text-placeholder {
  top: 7px;
}
.w-e-bar {
  border-radius: 4px;
  .w-e-bar-item {
    padding: 0;
  }
}
.w-e-select-list {
  max-height: 220px;
}
</style>
