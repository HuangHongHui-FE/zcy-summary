import React from "react";
import { Tooltip } from "doraemon";
import "./index.less";

/**
 * 文本省略
 * @param {*} title 鼠标hover时显示的内容
 * @param {*} children 文本内容
 * @param {*} maxWidth 文本最大宽度
 * @param {*} showTooltip 是否显示tooltip，auto表示自动判断
 */
const Ellipsis = ({ title, children, maxWidth, showTooltip = "auto" }) => {
  const ref = React.useRef({});

  const needTooltip =
    showTooltip === "auto" ? ref.current.clientWidth < ref.current.scrollWidth : !!showTooltip;

  const text = (
    <span
      ref={ref}
      className="text-ellipsis"
      title={!needTooltip ? title || children : null}
      style={{ maxWidth }}
    >
      {children}
    </span>
  );

  return needTooltip ? <Tooltip title={title || children}>{text}</Tooltip> : text;
};

export default Ellipsis;
