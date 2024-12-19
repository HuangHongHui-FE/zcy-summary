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
