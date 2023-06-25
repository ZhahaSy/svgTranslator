# Dialog

> 弹框组件

## 用例
```html
<ModalContainer
  :visible="visible"
  title="确认通过"
  width="560px"
  ok-text="通过确认"
  @cancel="$emit('cancel', $event)"
  @ok="$emit('ok', $event)"
>
  <template #content>
    内容区域
  </template>
</ModalContainer>
```

## API

| 属性      | 说明                             | 类型                 | 默认值 |     |
| --------- | -------------------------------- | -------------------- | ------ | --- |
| width    | 弹窗宽度                         | string &#124; number | 500px      |
| visible      | 控制弹窗的展示或者隐藏           | boolean              | false  |
| title     | 弹窗顶部标题                     | string               | -      |
| titleProps     | 顶部组件Props（详细的配置请参考PrefixTitle组件）                     | string               | -      |

> 其余属性均会透传给 a-modal 组件，用法同 a-modal 组件一致

## event

| 事件名      | 说明         |
| ----------- | ------------ |
| cancel | 点击取消按钮事件 |
| ok      | 点击确定按钮事件 |

## slots
| 名称    | 说明                   | 参数 |
| ------- | ---------------------- | ---- |
| content | 弹窗内容               | -    |
| footer  | 底部操作拦，固定在底部 | -    |

