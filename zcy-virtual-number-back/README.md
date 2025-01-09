## 开发调试

### 安装依赖

1. 安装开发依赖：npm i @zcy/zcy-virtual-number-back

### 启动开发服务器

1. npm run dev

### 组件打包发布

1、打包：npm run build (会生成 lib 和 dist 目录，lib 存放组件库文件；dist 存放组件预览文件，可供组件文档站点使用)
2、发布：npm publish （只上传 lib 目录）

备注：通过 npm link 在项目中本地调试组件的时候，建议使用 npm run lib 更新组件库包便于快速调试

## 组件描述

技术方案：https://cf.cai-inc.com/pages/viewpage.action?pageId=121706401

注意各种失效、号码重新请求的验证！！！！

##### 1、组件相关说明

（1）当组件卡片一直显示时：轮询「获取隐私号接口」，间隔 5 分钟

（2）组件支持「修改号码」，输入校验规则

/^1\d{10}$|^\d{3}-\d{7,8}$|\d{4}-\d{7,8}$/

（3）「修改号码」后会有一个小时的缓存时间

缓存失效：用户刷新页面、用户退出重新登录、关闭页面、关闭浏览器

##### 2、组件接入

```
npm i @zcy/zcy-virtual-number-back


<VirtualNumber
        loginUserPhone={15538920603}
        calledRealPhone={15538920604}
        bizCode="xxx"
        contactPerson="xxx"
        trigger="click"
        extra={{ 地址: "xxx" }}
        placement="left"
      >
        联系信息
</VirtualNumber>
```

##### 3、组件入参介绍


| 参数名                                                       | 是否必填 | 类型   | 默认值 | 描述                                              | 备注                                 |
| :----------------------------------------------------------- | :------- | :----- | :----- | :------------------------------------------------ | :----------------------------------- |
| loginUserPhone                                               | 是       | string | 无     | 主叫人的手机号（登录人手机号）                    |                                      |
| calledRealPhone                                              | 是       | string | 无     | 被叫人的真实手机号                                |                                      |
| bizCode                                                      | 是       | string | 无     | 业务码 - 需先注册                                 |                                      |
| contactPerson                                                | 否       | string | 无     | 顶部「联系人」                                    |                                      |
| 其他 Popover 组件的属性                                      | 否       |        |        | http://172.16.101.179:8800/components/popover-cn/ | defaultVisible 固定为 false 不可修改 |
| {"联系人": "xxx","收货地址": "xxx","联系地址": "xxx",xxx: xxx} | 否       | Object | 无     |                                                   | 传则显示，不传则不显示               |
