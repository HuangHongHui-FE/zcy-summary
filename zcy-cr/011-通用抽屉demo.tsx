import React from "react";
import ReactDOM from "react-dom";
import { Drawer } from "@zcy/doraemon";
import { getUrlWithAppCode } from "@zcy/basic-sdk";
import "./index.less";
// 外部公告链接弹窗
const DIV = document.createElement("div");

const render = (outUrlList) => {
  return (
    <Drawer
      visible
      destroyOnClose
      onCancel={closeDrawer}
      onClose={closeDrawer}
      title="查看公告"
      width={400}
    >
      {outUrlList?.map((item, index) => {
        return (
          <div className="out-url" key={index}>
            <a href={item?.outUrl && getUrlWithAppCode(item?.outUrl)} target="_blank">
              #{item?.title || "公告" + index}#
            </a>
          </div>
        );
      })}
    </Drawer>
  );
};

const openDrawer = (props) => {
  ReactDOM.render(render(props), DIV);
};

const closeDrawer = () => {
  // 卸载
  const unmountResult = ReactDOM.unmountComponentAtNode(DIV);
  // 删除
  if (unmountResult && DIV?.parentNode) {
    DIV.parentNode.removeChild(DIV);
  }
};
export { openDrawer };

// 使用
import { openDrawer } from "src/components/OutAnnouncementUrlDrawer";

openDrawer(outUrlList);
