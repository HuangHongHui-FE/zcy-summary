import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import DemoComp from 'src/demo';
import { request } from '@zcy/doraemon';
import _find from 'lodash/find';
// 获取环境变量及用户信息
const getAppsBasicInfo = () => {
  return request('/user/apps/getAppsBasicInfo', {
    params: {
      path: '',
    },
  }).then((res:any) => {
    if (res?.success) {
      const {
        getEnvHref = {},
        getUserIdentity = [],
        getMyDistrict = {},
      } = res?.result;
      const userIdentity = _find(getUserIdentity, user => !!user.currentFlag);
      window.envHref = getEnvHref;
      window.currentUserIdentity = userIdentity || {};
      window.currentUserDistrict = getMyDistrict;
    }
  });
};

async function renderDemo () {
  await getAppsBasicInfo();
  ReactDOM.render(<DemoComp />, document.getElementById('app'));
}

renderDemo();

if (module.hot) {
  module.hot.accept();
}
