# 网络请求模块

## 快速使用

接口定义：

```js
import request from '@/request'

// 查
export const getUser = () => {
  return request.get('/user')
}

// 增
export const createUser = (data: Record<string, any>) => {
  return request.post('/user', { data })
}

// 改
export const updateUser = (data: Record<string, any>) => {
  return request.patch('/user', { data })
}

// 删
export const deleteUser = (id: number) => {
  return request.delete(`/user/${id}`)
}
```

接口使用：
```js
import * as userAPI from '@/api/user'

const handleQuery = async () => {
  const data = await userAPI.getUser()
  console.log(data);
}
```

## 默认配置

- 网络请求超时时间： 60s

## 扩展配置

详情请看 `src/request/shims.axios.d.ts` 中的类型定义

## 相关资料

- https://axios-http.com/zh/