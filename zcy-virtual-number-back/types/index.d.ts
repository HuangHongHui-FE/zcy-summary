import React from 'react';

export interface IProps {
  // 主叫人的号码（登录人号码）
  loginUserPhone: string;
  // 被叫人的真实号码
  calledRealPhone: string;
  bizCode: string;
  // 联系人
  contactPerson?: string;
  // 额外参数字段
  extra?: any;
  children?: React.ReactNode;
  form: any;
}

export interface ResProps {
  success: boolean;
  result?: any;
  message?: string;
}


export interface IBindData {
  telA: string;
  telB: string;
  bizCode: string;
}

export interface IUpdateData {
  bizCode: string,
  // 之前的主叫号码
  preTelA: string,
  // 之前的被叫号码
  preTelB: string,
  // 新的主叫号码
  curTelA: string
  // 新的被叫号码
  curTelB: string
}