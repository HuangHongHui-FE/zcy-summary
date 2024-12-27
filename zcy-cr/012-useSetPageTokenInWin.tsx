// 1、useSetPageTokenInWin使用

const BidSupplierNoticeDetail = (props) => {
  // 判断双开页的参数放在win里
  useSetPageTokenInWin({ projectId: projectNo, page: "BID_SUPPLIER_NOTICE" });

  return (
    <div
      data-utm-c="c-bid-supplier-notice-detail"
      className={`bid-supplier-notice-detail ${isFullLink ? "full_link_breadcrumb" : ""}`}
    ></div>
  );
};

export default connect(({ bidSupplierNotice: { noticeDetail }, loading }) => {
  return { noticeDetail, loading };
})(BidSupplierNoticeDetail);

// 2、withSetPageTokenInWin
@connect(({ correctionPurchaseResult, loading }) => ({
  correctionPurchaseResult,
  loading: loading.models.correctionPurchaseResult,
}))
@withSetPageTokenInWin((props) => {
  const projectId = props?.correctionPurchaseResult?.noticeDetail?.projectId;
  return {
    projectId,
    page: "CORRECT",
  };
})
@Form.create()
export default class extends Component {
  render() {
    return <div></div>;
  }
}

// 3、请求拦截
// 拦截请求头加http-header,判断双开页面, __todo: 后面看能否使用统一的request
request.interceptors.request.use(interceptorsReqConfig);
zcyRequest.interceptors.request.use(interceptorsReqConfig);

import { errMessage } from "./utils";
// 白名单内的, 并且有window上有pageToken，带上pageToken
const allowWithPageTokenUrl = [
  // 一、定标结果管理 页面
  "/bidding-tiga/bidEvaluationResult/submit",
  // 工作流组件里的
  "/bidding-tiga/api/hecate/bidding/workflow/execute",
];

const interceptorsReqConfig = (config) => {
  try {
    const { bizParam = "", page = "", doubleOpenControl = "" } = window.validDoublePageParams || {};

    const needWithCustomHeader =
      allowWithPageTokenUrl.includes(config?.url) && bizParam && page && doubleOpenControl;

    if (needWithCustomHeader) {
      config.headers.bizParam = bizParam;
      config.headers.page = page;
      config.headers.doubleOpenControl = doubleOpenControl;
    }
  } catch (error) {
    errMessage({ content: "请求拦截自定义请求头失败" });
  }
  return config;
};

export { interceptorsReqConfig };
