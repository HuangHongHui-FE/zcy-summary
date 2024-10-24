import { getCinemaListServiceApi } from "../services";

const maizuo = {
  namespace: "maizuo",

  state: {
    fileList: [],
  },

  effects: {
    *getCinemaList({ payload }, { call, put }) {
      let res = yield call(getCinemaListServiceApi, payload);
      yield put({
        type: "changeCinemaList",
        payload: res.data.data?.films,
        other: 1,
      });
      return res;
    },
  },

  reducers: {
    changeCinemaList(state, { payload, other }) {
      console.log("🚀 ~ changeCinemaList ~ other:", other);
      return { ...state, fileList: payload };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      console.log("页面初始化触发");
    },
  },
};

export default maizuo;
