import { forwardRef, useRef } from "react";
// 子组件
const PDFPreviewSettingPopover = (props, ref) => {
  const [marginTopValue, setMarginTopValue] = useState(false);

  const handleMarginReset = () => {};

  useImperativeHandle(ref, () => ({
    PDFPreviewSettingPopoverState() {
      return {
        marginTopValue,
        setMarginTopValue,
        handleMarginReset,
      };
    },
  }));

  return <Fragment>111</Fragment>;
};

export default forwardRef(PDFPreviewSettingPopover);

// 父组件
const Father = () => {
  const PDFPreviewSettingPopoverRef = useRef();

  const { marginTopValue, setMarginTopValue, handleMarginReset } =
    PDFPreviewSettingPopoverRef.current?.PDFPreviewSettingPopoverState?.() || {};

  return (
    <PDFPreviewSettingPopover
      ref={(r) => (PDFPreviewSettingPopoverRef.current = r)}
      previewDoc={previewDoc}
    />
  );
};
