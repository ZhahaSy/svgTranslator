/**
 * 捕获 Promise 异常错误的工具函数
 *
 * Inspire by https://github.com/scopsy/await-to-js
 * @param asyncFunc
 * @param params
 * @returns
 */
const errorCapture = async <T, U = Error>(asyncFunc: Promise<T>): Promise<[U, undefined] | [null, T]> => {
  try {
    const res = await asyncFunc;
    return [null, res];
  } catch (err) {
    return [err as U, undefined];
  }
};

export default errorCapture;
