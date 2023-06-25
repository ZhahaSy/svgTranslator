/* eslint-disable no-underscore-dangle */
(function () {
  // eslint-disable-next-line camelcase
  function __canvasWM({ content = '', content_hash = '' } = {}) {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments[0];
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', '180px');
    canvas.setAttribute('height', '240px');
    const ctx = canvas.getContext('2d');
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '16px Microsoft Yahei';
    ctx.fillStyle = 'rgba(185, 185, 185, 1)';
    ctx.rotate((Math.PI / 180) * 30);
    ctx.fillText(content, 150, 50);
    ctx.fillText(content_hash, 155, 80);
    const base64Url = canvas.toDataURL();
    const __wm = document.querySelector('.__wm');
    const watermarkDiv = __wm || document.createElement('div');
    const styleStr = `position:fixed;top:0;left:0;bottom: 0;width:100%;height:100%;z-index:999999;pointer-events:none;background-repeat:repeat;background-image:url('${base64Url}');opacity:0.18;`;
    watermarkDiv.setAttribute('style', styleStr);
    watermarkDiv.classList.add('__wm');
    if (!__wm) {
      document.body.insertBefore(watermarkDiv, document.body.lastChild);
    }
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    if (MutationObserver) {
      let mo = new MutationObserver(function () {
        const __wm = document.querySelector('.__wm');
        if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
          mo.disconnect();
          mo = null;
          __canvasWM(JSON.parse(JSON.stringify(args)));
        }
      });
      mo.observe(document.body, {
        attributes: true,
        subtree: true,
        childList: true,
      });
    }
  }
  let module;
  let define;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = __canvasWM;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return __canvasWM;
    });
  } else {
    window.__canvasWM = __canvasWM;
  }
})();
// eslint-disable-next-line no-undef
__canvasWM({
  content: '',
  content_hash: '张双意',
});
