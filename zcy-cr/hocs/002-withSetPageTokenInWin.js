import React from "react";
import useSetPageTokenInWin from "src/hooks/useSetPageTokenInWin";

// 获取双开页面token,存入window，class组件用
const withSetPageTokenInWin = (getParamsFn) => {
  return (ClassComp) => {
    const NewComp = (props) => {
      useSetPageTokenInWin(getParamsFn(props));
      return <ClassComp {...props} />;
    };
    return NewComp;
  };
};

export default withSetPageTokenInWin;
