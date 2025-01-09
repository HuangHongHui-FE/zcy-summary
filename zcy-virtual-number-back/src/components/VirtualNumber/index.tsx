/* eslint-disable react/jsx-no-script-url */
import React, { useEffect, useState, Fragment } from 'react';
import { Icon, Modal, Form, Input, Popover, message, Spin } from 'doraemon';
import { useRequest } from 'ahooks';
import copy from 'copy-to-clipboard';
import { verifyObject } from '../../utils/index';
import { virtualNumberApi, changeNumberApi } from './api';
import { IProps, ResProps } from '../../../types/index';

import './index.less';

const FormItem = Form.Item;

// 存储修改的号码
const VirtualNumberStorage = {};

const VirtualNumber = (props: IProps) => {
  const {
    form,
    // 主叫人的号码（登录人号码）
    loginUserPhone,
    // 被叫人的真实号码
    calledRealPhone,
    // 业务编号
    bizCode,
    // 联系人
    contactPerson,
    // 额外参数字段
    extra = {},
    children = '联系信息',
    ...restProps
  } = props;

  const { getFieldDecorator, validateFields } = form;

  // 虚拟号码
  const [innerVirtualNumber, setInnerVirtualNumber] = useState('-');
  // 主叫号码
  const [innerLoginUserPhone, setInnerLoginUserPhone] =
    useState(loginUserPhone);

  // 修改手机号码弹窗显隐
  const [modalVisible, setModalVisible] = useState(false);
  // popover组件显隐
  const [popoverVisible, setPopoverVisible] = useState(false);
  // 校验props是否有误
  const [isPropsErr, setIsPropsErr] = useState(false);

  // 获取号码请求
  const {
    run: fetchVirtualNumber,
    loading: fetchVirtualNumberLoading,
    cancel,
  } = useRequest((params) => virtualNumberApi(params), {
    manual: true,
    pollingInterval: 1000 * 60 * 5,
    onSuccess: (res: ResProps, params: Array<any>) => {
      const { success, result } = res;

      if (!success) {
        return message.error(res.message || '获取隐私号码失败, 请刷新重试！');
      }

      setInnerVirtualNumber(result?.telX);
      setInnerLoginUserPhone(window.atob(params[0]?.telA));
    },
    onError: (err) => {
      message.error(err?.message || '获取隐私号码失败, 请刷新重试！');
    },
  });

  // 修改号码请求
  const { run: postVirtualNumber, loading: postVirtualNumberLoading } =
    useRequest((data) => changeNumberApi(data), {
      manual: true,
      onSuccess: (res: ResProps, data: Array<any>) => {
        const { success } = res;
        if (!success) {
          return message.error(res.message || '修改号码失败, 请刷新重试！');
        }

        // 修改成功后，重新开启轮询
        fetchVirtualNumber({
          telA: data[0]?.curTelA,
          telB: window.btoa(calledRealPhone),
          bizCode,
        });
        setInnerLoginUserPhone(window.atob(data[0]?.curTelA));

        VirtualNumberStorage[calledRealPhone] = window.atob(data[0]?.curTelA);
      },
      onError: (err) => {
        message.error(err?.message || '修改号码失败, 请刷新重试！');
      },
    });

  const loading = !!(fetchVirtualNumberLoading || postVirtualNumberLoading);

  // 校验组件传过来的参数
  const propsValidator = () => {
    if (!verifyObject(extra)) {
      message.error('VirtualNumber组件的extra参数有误');
      setIsPropsErr(true);
      return;
    }
    setIsPropsErr(false);
  };

  // 点击修改号码
  const changeLoginUserPhone = () => {
    setModalVisible(true);
  };

  // 确认修改主叫号码逻辑
  const handleSureChange = () => {
    validateFields((err, values) => {
      if (err) return;
      const { phoneNumber } = values;
      const cInnerLoginUserPhone =
        VirtualNumberStorage[calledRealPhone] || loginUserPhone;

      postVirtualNumber({
        bizCode,
        // 之前的主叫号码
        preTelA: window.btoa(cInnerLoginUserPhone),
        // 之前的被叫号码
        preTelB: window.btoa(calledRealPhone),
        // 新的主叫号码
        curTelA: window.btoa(phoneNumber),
        // 新的被叫号码
        curTelB: window.btoa(calledRealPhone),
      });

      setModalVisible(false);
    });
  };

  // 取消修改虚拟号码
  const handleCancelChange = () => {
    setPopoverVisible(false);
    setModalVisible(false);
  };

  // 复制虚拟号码
  const handleCopy = () => {
    copy(innerVirtualNumber);
    message.success('复制成功');
  };

  // 刷新虚拟号码
  const handleRefresh = () => {
    const cInnerLoginUserPhone =
      VirtualNumberStorage[calledRealPhone] || loginUserPhone;

    const params = {
      // 主叫号码
      telA: window.btoa(cInnerLoginUserPhone),
      // 被叫号码
      telB: window.btoa(calledRealPhone),
      // 业务code
      bizCode,
    };

    fetchVirtualNumber(params);
  };

  const onVisibleChange = (flag) => {
    if (flag) {
      setPopoverVisible(true);

      handleRefresh();
    } else {
      if (!modalVisible) {
        setPopoverVisible(false);
        // 鼠标移除的时候，清除定时器
        cancel();
      }
    }
  };

  useEffect(() => {
    propsValidator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extra]);

  const content = (
    <div className="virtual">
      <div className="virtual-reload">
        {/* @ts-ignore */}
        <Spin spinning={ loading }>
          <Icon type="reload" onClick={ handleRefresh } />
        </Spin>
      </div>
      <div className="virtual-VirtualNumber">
        <Icon type="phone" style={ { color: '#74dcff', fontSize: 17 } } />
        &nbsp;联系电话:&nbsp;{innerVirtualNumber}&nbsp;
        <a onClick={ handleCopy } href="javascript:;">
          复制
        </a>
      </div>

      <div className="virtual-tip">
        为保障信息安全，此号码为虚拟号码。
        <br />
        请使用<span>{innerLoginUserPhone}</span>呼出，否者将无法接通
      </div>

      <div className="virtual-change">
        {/* @ts-ignore */}
        <Spin spinning={ loading }>
          <a href="javascript:;" onClick={ changeLoginUserPhone }>
            修改号码
          </a>
        </Spin>
      </div>
      {Object.keys(extra).length > 0 &&
        Object.keys(extra).map((item, index) => {
          return (
            <div key={ index } className="virtual-extra">
              {item}: {extra[item]}
            </div>
          );
        })}
    </div>
  );

  if (isPropsErr) {
    return null;
  }

  return (
    <Fragment>
      <Popover
        { ...restProps }
        visible={ popoverVisible }
        title={ contactPerson ? `联系人 ${contactPerson}` : '' }
        content={ content }
        onVisibleChange={ onVisibleChange }
        defaultVisible={ false }
      >
        {children}
      </Popover>
      {/* @ts-ignore */}
      <Modal
        visible={ modalVisible }
        title="修改号码"
        okText="确认修改"
        width={ 370 }
        onCancel={ handleCancelChange }
        onOk={ handleSureChange }
        confirmLoading={ loading }
        destroyOnClose
      >
        <Form>
          <FormItem>
            {getFieldDecorator('phoneNumber', {
              rules: [
                {
                  required: true,
                  message:
                    '请输入正确的手机号码，格式示例：15011111111，或者正确的电话号码，格式示例：400-8101996。',
                },
                {
                  pattern: /^1\d{10}$|^\d{3}-\d{7,8}$|\d{4}-\d{7,8}$/,
                  message:
                    '请输入正确的手机号码，格式示例：15011111111，或者正确的电话号码，格式示例：400-8101996。',
                },
              ],
            })(<Input placeholder="请输入" style={ { width: '330px' } } />)}
          </FormItem>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default Form.create()(VirtualNumber);
