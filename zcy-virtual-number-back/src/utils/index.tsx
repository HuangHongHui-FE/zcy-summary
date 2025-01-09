import _ from 'lodash';
// 校验是否普通对象
export const verifyObject = (value: any) => {
  return _.isPlainObject(value);
};
