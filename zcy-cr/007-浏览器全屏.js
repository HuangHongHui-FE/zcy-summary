// 全屏某一块
export function fullScreen(element) {
  try {
    if (!element) return;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen();
    } else if (typeof window.ActiveXObject !== "undefined") {
      // for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
      const wscript = new window.ActiveXObject("WScript.Shell");
      if (wscript != null) wscript.SendKeys("{F11}");
    }
  } catch (err) {
    global.console.log("进入全屏失败:", err);
  }
}

// 退出全屏
export async function exitFullscreen() {
  try {
    const d = document;
    if (d.exitFullscreen) {
      await d.exitFullscreen();
    } else if (d.msExitFullscreen) {
      await d.msExitFullscreen();
    } else if (d.mozCancelFullScreen) {
      await d.mozCancelFullScreen();
    } else if (d.webkitExitFullscreen) {
      await d.webkitExitFullscreen();
    }
  } catch (err) {
    global.console.log("退出全屏失败:", err);
  }
}
