import React, { useRef } from "react";
import { Modal } from "doraemon";

const PreviewModal = ({ visible, onCancel, content }) => {
  const templateRef = useRef(null);

  React.useEffect(() => {
    if (templateRef.current) {
      const { body } = templateRef.current.contentDocument;

      body.innerHTML = content;
    }
  }, [content]);

  return (
    <Modal title="委托模版预览" visible={visible} onCancel={onCancel} width={800} footer={null}>
      <iframe
        title="委托模版预览"
        ref={templateRef}
        style={{
          width: "100%",
          height: 400,
          border: "transparent",
        }}
      />
    </Modal>
  );
};

export default PreviewModal;
