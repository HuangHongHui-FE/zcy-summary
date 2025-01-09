import React, { useState } from "react";
import { Form, Input, Panel, Button, FormGrid, Select, Table, message } from "doraemon";
import VirtualNumber from "./index";
import _ from "lodash";

const Option = Select.Option;

const VirtualNumberList = (props) => {
  const { form } = props;
  const { getFieldDecorator, validateFields } = form;
  const [comProps, setComProps] = useState({});
  const [comProps4, setComProps4] = useState({});
  const [content, setContent] = useState("");

  const handleChange = () => {
    validateFields((err, values) => {
      if (err) return;
      
      const tempComProps = _.pickBy({
        // 主叫人的手机号（登录人手机号）
        loginUserPhone: values.loginUserPhone,
        // 被叫人的真实手机号
        calledRealPhone: values.calledRealPhone,
        // 业务编号
        bizCode: values.bizCode,
        // 联系人
        contactPerson: values.contactPerson,
        // 触发卡片的方式
        trigger: values.trigger,
        // 额外参数字段
        extra: JSON.parse(values.extra || '{}'),
        placement: values.placement,
      })

      const tempComProps4 = _.pickBy({
        // 主叫人的手机号（登录人手机号）
        loginUserPhone: values.loginUserPhone,
        // 被叫人的真实手机号
        calledRealPhone: values.calledRealPhone4,
        // 业务编号
        bizCode: values.bizCode,
        // 联系人
        contactPerson: values.contactPerson,
        // 触发卡片的方式
        trigger: values.trigger,
        // 额外参数字段
        extra: JSON.parse(values.extra || '{}'),
        placement: values.placement,
      })

      setComProps({...tempComProps});
      setComProps4({...tempComProps4})
      setContent(values.content);
      message.success("修改成功");
    });
  };

  const formGridItem = [
    {
      label: "主叫人号码",
      render: () => {
        return getFieldDecorator("loginUserPhone", {
          rules: [
            {
              required: true,
              message: "请输入",
            },
          ],
        })(<Input placeholder="请输入" />);
      },
    },
    {
      label: "被叫人号码",
      render: () => {
        return getFieldDecorator("calledRealPhone", {
          rules: [
            {
              required: true,
              message: "请输入",
            },
          ],
        })(<Input placeholder="请输入" />);
      },
    },
    {
      label: "组件场景4-同一页面，不同被叫号码",
      render: () => {
        return getFieldDecorator("calledRealPhone4", {
          rules: [
            {
              required: true,
              message: "请输入",
            },
          ],
        })(<Input placeholder="请输入" />);
      },
    },
    {
      label: "bizCode",
      render: () => {
        return getFieldDecorator("bizCode", {
          rules: [
            {
              required: true,
              message: "请输入",
            },
          ],
        })(<Input placeholder="请输入" />);
      },
    },
    {
      label: "联系人",
      render: () => {
        return getFieldDecorator("contactPerson")(<Input placeholder="请输入" />);
      },
    },
    {
      label: "卡片触发方式（click | hover | focus | contextMenu）",
      render: () => {
        return getFieldDecorator("trigger")(<Input placeholder="请输入" />);
      },
    },
    {
      label: "额外参数字段",
      render: () => {
        return getFieldDecorator("extra")(<Input placeholder="请输入" />);
      },
    },
    {
      label: "气泡框位置",
      render: () => {
        return getFieldDecorator("placement")(
          <Select placeholder="请选择">
            <Option value="top">top</Option>
            <Option value="left">left</Option>
            <Option value="right">right</Option>
            <Option value="bottom">bottom</Option>
            <Option value="topLeft">topLeft</Option>
            <Option value="topRight">topRight</Option>
            <Option value="bottomLeft">bottomLeft</Option>
            <Option value="bottomRight">bottomRight</Option>
            <Option value="leftTop">leftTop</Option>
            <Option value="leftBottom">leftBottom</Option>
            <Option value="rightTop">rightTop</Option>
            <Option value="rightBottom">rightBottom</Option>
          </Select>
        );
      },
    },
    {
      label: "组件展示内容",
      colSpan: 2,
      labelCol: {
        xs: {
          span: 3,
        },
        sm: {
          span: 3,
        },
      },
      wrapperCol: {
        xs: {
          span: 21,
        },
        sm: {
          span: 21,
        },
      },
      render: () => {
        return getFieldDecorator("content")(<Input placeholder="请输入" />);
      },
    },
  ];

  const columns = [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "名字",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "爱好",
      dataIndex: "hobby",
      key: "hobby",
    },
    {
      title: "联系信息",
      dataIndex: "contact",
      key: "contact",
      render: () => {
        return content ? <VirtualNumber { ...comProps } key={ Math.random() }>{content}</VirtualNumber> : "-";
      },
    },
  ];

  const data = [
    {
      key: "1",
      id: "1",
      name: "jjj-1",
      age: 32,
      hobby: "dance",
    },
    {
      key: "2",
      id: "2",
      name: "jjj-2",
      age: 32,
      hobby: "dance-2",
    },
  ];

  return (
    <div>
      <Panel
        title="虚拟号组件测试"
        subTitle="输入组件入参后，点确认修改"
        extra={
          <Button type="primary" onClick={ handleChange }>
            确认修改
          </Button>
        }
      >
        <Form>
          <FormGrid formGridItem={ formGridItem } />
        </Form>
      </Panel>

      <Panel title="组件场景1" subTitle="「组件展示内容」为html元素">
        <div>
          {content ? (
            <VirtualNumber { ...comProps } key={ Math.random() }>
              <div dangerouslySetInnerHTML={ { __html: content } } />
            </VirtualNumber>
          ) : (
            "-"
          )}
        </div>
      </Panel>

      <Panel title="组件场景2" subTitle="「组件展示内容」为字符串">
        {content ? (
          <VirtualNumber { ...comProps } key={ Math.random() }>
            {content}
          </VirtualNumber>
        ) : (
          "-"
        )}
      </Panel>

      <Panel title="组件场景3" subTitle="在table表格里使用">
        <Table columns={ columns } dataSource={ data } />
      </Panel>

      <Panel title="组件场景4" subTitle="设置不同被叫号码的卡片">
        {content ? (
          <VirtualNumber { ...comProps4 } key={ Math.random() }>
            {content}
          </VirtualNumber>
        ) : (
          "-"
        )}
      </Panel>
    </div>
  );
};

export default Form.create()(VirtualNumberList);
