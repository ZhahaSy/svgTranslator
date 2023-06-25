/**
 * 参考：
 * https://github.com/any86/any-rule
 */

export function isUrl(path: string): boolean {
  const regex = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
  return regex.test(path);
}
/**
 * 判断是否是微信环境
 */
export function isWxClient() {
  const regex = /MicroMessenger/i;
  const ua = navigator.userAgent.toLowerCase();
  return regex.test(ua);
}

/**
 * 判断是否是移动端
 */
export function isMobile() {
  const regex = /AppleWebKit.*Mobile.*/i;
  const ua = navigator.userAgent.toLowerCase();
  return regex.test(ua);
}

/**
 * 判断是否是 iOS 终端
 */
export function isiOS() {
  const regex = /(iPhone|iPad|iPod|iOS)/i;
  const ua = navigator.userAgent.toLowerCase();
  return regex.test(ua);
}

/**
 * 判断是否为图片 URL
 * copy from https://github.com/vant-ui/vant/blob/7eaefd04fac0f2a188d9386ea677379ead61e903/packages/vant/src/uploader/utils.ts#L66-L68
 */
export const isImageUrl = (url: string): boolean => {
  const regex = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  return regex.test(url);
};

/**
 * 判断是否为 整数
 */
export const isInteger = (num: string): boolean => {
  const regex = /^(?:0|(?:-?[1-9]\d*))$/;
  return regex.test(num);
};

/**
 * 判断是否为 正整数
 */
export const isPositiveInteger = (num: string): boolean => {
  const regex = /^\+?[1-9]\d*$/;
  return regex.test(num);
};

/**
 * 判断当前是否是企微环境
 */
export const isWeWork = window.navigator.userAgent.match('wxwork');
