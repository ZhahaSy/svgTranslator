import { isFunction, isObject } from '.';

/**
 * target 是否为 Promise 类型
 * @param target 参数
 * @returns boolean 值，判断 target 是否是 Promise 类型
 */
export const isPromise = <T, S>(target: PromiseLike<T> | S): target is PromiseLike<T> => {
  return !!target && (isObject(target) || isFunction(target)) && typeof (target as PromiseLike<T>).then === 'function';
};
