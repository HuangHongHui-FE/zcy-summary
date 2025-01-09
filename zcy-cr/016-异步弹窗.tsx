import { Modal } from "@zcy/doraemon";

export function modalForPromise(options = {}) {
  const { onOk, onCancel, modalType = "confirm", ...resetOptions } = options;

  const ModalTypes = ["confirm", "success", "error", "info", "warning"];

  if (!ModalTypes.includes(modalType)) {
    try {
      if (__DEV__) {
        global.console.error(`modalForPromise 不支持 modalType 为 ${modalType}`);
      }
    } catch (e) {
      //
    }
    return Promise.reject();
  }
  return new Promise((resolve) => {
    Modal[modalType]({
      ...resetOptions,
      onOk() {
        resolve("ok");
      },
      onCancel() {
        resolve("cancel");
      },
    });
  });
}
