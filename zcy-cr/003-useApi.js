import request from "@zcy/paas-request";
import { useRequest } from "ahooks";
import { message } from "doraemon";

// 短信记录列表页数据
const getSmsRecordListApi = (params) => {
  return request("/api/basic-arch/tianji-gateway/sms/dayRecord/list", {
    method: "GET",
    params,
  });
};

// 短信重发
const smsResendApi = (data) => {
  return request("/api/basic-arch/tianji-gateway/sms/dayRecord/send", {
    method: "POST",
    data,
  });
};

const useApi = () => {
  // 短信记录列表页数据
  const {
    data: smsRecordListData,
    runAsync: getSmsRecordList,
    mutate: smsRecordListDataMutate,
    loading: getSmsRecordListLoading,
  } = useRequest(getSmsRecordListApi, {
    manual: true,
    onSuccess: (res) => {
      const { success } = res;
      if (!success) {
        return message.error(res.message || "请求错误");
      }
    },
    onError(error) {
      message.error(error?.message || error?.data?.message || "获取数据失败, 请重试！");
    },
  });

  // 短信重发
  const { runAsync: smsResend, loading: smsResendLoading } = useRequest(smsResendApi, {
    manual: true,
    onSuccess: (res) => {
      const { success } = res;
      if (!success) {
        return message.error(res.message || "请求错误");
      }
      message.success("重新发送成功");
    },
    onError(error) {
      message.error(error?.message || error?.data?.message || "获取数据失败, 请重试！");
    },
  });

  return {
    // 短信记录列表页数据
    getSmsRecordList,
    smsRecordListData,
    smsRecordListDataMutate,
    getSmsRecordListLoading,

    // 短信重发
    smsResend,
    smsResendLoading,
  };
};

export default useApi;
