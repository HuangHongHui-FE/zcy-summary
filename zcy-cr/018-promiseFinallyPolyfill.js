/**
 * Promise.prototype.finally 垫片，兼容不支持 finally 的浏览器
 */
export const promiseFinallyPolyfill = () => {
  try {
    if (window.Promise && !window.Promise?.prototype?.finally) {
      Promise.prototype.finally = function (fn) {
        const onFinally = (callback) => Promise.resolve(fn()).then(callback);
        return this.then(
          (result) => onFinally(() => result),
          (reason) => onFinally(() => Promise.reject(reason))
        );
      };
    } else {
      console.log("Promise.prototype.finally 原生已支持");
    }
  } catch (error) {
    console.log(`Promise.prototype.finally 不支持：${error}`);
  }
};

// 使用：
promiseFinallyPolyfill();
