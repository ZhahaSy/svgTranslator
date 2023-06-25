# FileUpload

文件上传组件，对 `AntUpload` 做了一部分改写

- 自带 `action`，直接调用后端上传接口

- 自带 `Header`，默认会带上 `X-AppKey` 和 `X-CSRF` 两个请求头

- 默认支持所有可支持的文件类型：`ALL_SUPPORT_FILE_SUFFIX`

## 用法

``` vue
<FileUpload :show-upload-list="false">
  <a-button :style="{ color: '#61666D' }">重新上传</a-button>
</FileUpload>
```


### API
| 属性       | 说明               | 类型                        | 默认值 |
| ---------- | ------------------ | --------------------------- | ------ |
| fileList | 文件列表 （必填）     | UploadFile[] | -      |
| name    | 传给后端的属性名 | string | file     |
| action | 后端上传接口     | string | /api/budget/file/upload  |
| accept    | 可支持的文件上传类型 | string[] | ALL_SUPPORT_FILE_SUFFIX     |
| maxSize | 最多可支持的文件大小 | number (单位是 kb) |  50 * 1024 |
| dragger | 是否支持拖拽上传，如传入 true，则会使用 a-upload-dragger 组件进行上传操作 | boolean |  false |

> 更多属性可参考 **[AntUpload](https://www.antdv.com/components/upload-cn)**


### Slots

| 名称    | 说明                         | 参数            |
| ------- | ---------------------------- | --------------- |
| default | 上传按钮展示 | <a-button>Upload</a-button> |

### Event

| 事件名 | 事件作用 | 参数 |
| ------- | ---------------------------- | --------------- |
| update:file-list | 更新上传文件列表的事件 | UploadChangeParam[] |
