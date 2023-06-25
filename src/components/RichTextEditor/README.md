# RichTextEditor

> 富文本编辑器

## 用例
```html
<RichTextEditor
  :model-value="auditComment"
  editor-container-style="min-height: 200px"
  @update:model-value="updateTransferSuggest"
/>
```

## API

| 属性      | 说明                             | 类型                 | 默认值 |     |
| --------- | -------------------------------- | -------------------- | ------ | --- |
| modelValue    | 编辑器内容                         | string | -      |
| editorContainerStyle      | 编辑器外部样式           | string              | -  |
| toolbarConfig     | 工具栏配置弹框（详细的配置请移步[wangeditor](https://www.wangeditor.com/v5/toolbar-config.html）查看                     | IToolbarConfig               | -      |
| customUploadImage     | 自定义图片上传的事件。（file, insertFn）=> void                   | 默认会按照项目的文件上传方案               | -      |

## event

| 事件名      | 说明         |
| ----------- | ------------ |
| update:modelValue | 富文本内容修改触发事件 |


