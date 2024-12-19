// 1、有计划检验采购计划完整性校验, 的return
checkAbolishHint = async (rows) => {
  const { dispatch } = this.props;
  const { result = {}, success } = await dispatch({
    type: "projectGenerateList/checkAbolishHint",
    payload: {
      planId: rows.map((item) => item.planId)?.[0],
    },
  });
  if (success) {
    const { isHint, projectName, abolishCount } = result;
    // isHint，是否需要提示，为 true 时需要
    if (isHint) {
      return new Promise((resolve) => {
        CustomModal({
          modalType: "info",
          title: "信息提示",
          subTitle: `【${projectName}】废标后释放出${abolishCount}条采购计划，你已选择其中1条`,
          okText: "继续生成",
          onOk: () => {
            resolve(isHint);
          },
        });
      });
    }
    return true;
  }
  return false;
};

!(await this.checkAbolishHint(rows));


// 2、
// wrappedComponentRef使用场景：
// 子组件：被高阶组件包裹，例：子组件表单被Form.create()包裹。
// 父组件：当子组件被高阶组件包裹后，父组件想拿到子组件的引用，直接用ref={}属性设置，将获取不到，需用wrappedComponentRef={}属性设置。
// 写法：
// 仅属性名ref和wrappedComponentRef不同，其他写法都一样

<HocComponent
	// 子组件没被高阶组件包裹 用ref
    ref={(ref) => {
        this.sonRef = ref;
    }}
    // 子组件被高阶组件包裹 用wrappedComponentRef
    wrappedComponentRef={(ref) => {
      this.sonRef = ref;
    }}
/>
