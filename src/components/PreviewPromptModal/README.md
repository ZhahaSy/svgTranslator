# PreviewPromptModal

> Excel 预览提示弹窗，当预算文件，刷新三次以上时，猜测可能是出现了预览失败的情况，会打开此弹窗进行提示

## 用法

```vue
 <PreviewPromptModal v-model:visible="promptModalVisible">
  <span v-if="editable">请尝试重新上传文件哦～</span>
  <span v-else
    >您可以尝试再次<span :class="Classes.link" @click="refreshIFrame">刷新</span>或<span
      :class="Classes.link"
      @click="download(budgetFiles?.[0])"
      >下载文件</span
    >查看哦～</span
  >
</PreviewPromptModal>
```
visible

## 参数

| 属性      | 说明                             | 类型                 | 默认值 |     |
| --------- | -------------------------------- | -------------------- | ------ | --- |
| visible    | 是否展示弹窗                         | boolean | -    |


### Slots

| 名称    | 说明                         | 参数            |
| ------- | ---------------------------- | --------------- |
| title |  提示文案 | 无法预览？|
| default |  展示的描述文案 | 请尝试重新上传文件哦～ |
| footer |  操作区域 | 我知道了 |


## Events

| 事件名 | 事件作用 | 参数 |
| --------- | -------------------------------- | -------------------- |
| update:visible    |      更新 visible         |   -    |