export interface BaseResponse<T> {
  data: T
  message: string
  code: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any
}
