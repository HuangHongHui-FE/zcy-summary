// 设置请求拦截器
axios.interceptors.request.use(
  (config) => {
    // console.log(config) // 该处可以将config打印出来看一下，该部分将发送给后端（server端）
    config.headers.Authorization = store.state.token;
    return config; // 对config处理完后返回，下一步将向后端发送请求
  },
  (error) => {
    // 当发生错误时，执行该部分代码
    // console.log(error) // 调试用
    return Promise.reject(error);
  }
);

// 定义响应拦截器 -->token值无效时,清空token,并强制跳转登录页
axios.interceptors.response.use(
  function (response) {
    // 响应状态码为 2xx 时触发成功的回调，形参中的 response 是“成功的结果”
    return response;
  },
  function (error) {
    // console.log(error)
    // 响应状态码不是 2xx 时触发失败的回调，形参中的 error 是“失败的结果”
    if (error.response.status === 401) {
      // 无效的 token
      // 把 Vuex 中的 token 重置为空，并跳转到登录页面
      // 1.清空token
      router.push("/login");
    }
    return Promise.reject(error);
  }
);
