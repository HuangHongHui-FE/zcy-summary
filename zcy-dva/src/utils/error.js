/**
 * 异步请求错误处理
 */
import { routerRedux } from "dva/router";

const error = (e, dispatch) => {
  if (e.status === 400) {
    console.log("请求错误");
  }
  if (e.status === 403) {
    dispatch(routerRedux.push("/film"));
  }
  if (e.status >= 404 && e.status < 422) {
    dispatch(routerRedux.push("/film"));
  }
  if (e.status <= 504 && e.status >= 500) {
    console.log("请求错误");
  }
};

export default error;
