import { useEffect } from "react";
import { fetchPageToken } from "./services";
import { message } from "doraemon";

/**
 * 获取token, window暂存双开页判断所需参数
 * 入参：projectId，page
 */

const useSetPageTokenInWin = ({ page = "", projectId = "" }) => {
  const params = {
    page,
    bizParam: {
      projectId,
    },
  };
  useEffect(() => {
    if (projectId) {
      fetchPageToken(params)
        .then((res) => {
          if (res?.success) {
            window.validDoublePageParams = {
              page,
              bizParam: projectId,
              doubleOpenControl: res?.result || "",
            };
          }
        })
        .catch((err) => {
          message.warn(err?.data?.message || "获取多开页token失败");
        });
    }

    return () => {
      window.validDoublePageParams = undefined;
    };
  }, [projectId]);
};

export default useSetPageTokenInWin;
