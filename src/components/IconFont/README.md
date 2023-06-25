# IconFont

预算项目的 icon 组件，icon 都是在 iconfont 中维护，如果 icon 有更新，记得选择 「Symbol」 然后生成新的链接，然后在 index.vue 中更新提交。

项目地址：[预算管理](https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.23&manage_type=myprojects&projectId=3618847)

> 如果没有权限，可以找 福星小姐姐 添加权限。

## Props

请参看 index.vue 中的 props 定义

## Demo

### 基础使用

```vue
<IconFont icon="icon-ic_pz" />
```

### 设置大小

```vue
<IconFont icon="icon-ic_pz" :size="30" />
```