import { request } from 'doraemon';
import { IBindData, IUpdateData } from '../../../types/index';

export const virtualNumberApi = (data: IBindData): any => {
  return request('/basic-tools/privacyNum/bindPrivacyNum', {
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
};

export const changeNumberApi = (data: IUpdateData): any => {
  return request('/basic-tools/privacyNum/updatePrivacyNum', {
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
};
