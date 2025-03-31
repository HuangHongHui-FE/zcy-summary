// 1、promise妙用
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

// 2、wrappedComponentRef使用场景：
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
/>;

// 3、.filter(Boolean)
const a = true;
const ls = [a && {}, { b: 111 }, !a && {}].filter(Boolean);

// 4、commit规范
// git commit -m "feat: 完成超值购小程序注册登陆的开发"
// feat （feature，产品新功能，通常是能够让用户觉察到的变化，小到文案或样式修改）
// fix（bug fix，修复 bug）
// docs（documentation，更新文档或注释）
// style（code formatting, missing semi colons, … 代码格式调整，对逻辑无影响：比如为按照 eslint 或团队风格修改代码格 式。注意不是 UI 变更）
// refactor（重构：代码优化但不影响现有功能或添加功能。比如文件、变量重命名、代码抽象为函数，消除魔法数字等）
// test（when adding missing tests 单测相关变更）
// chore（杂项：其他无法归类的变更，比如代码合并）
// perf （性能提升变更）
// ci（持续集成脚本相关变更）
// build（代码构建相关变更：比如修复部署时的构建问题、构建脚本 webpack 或 gulp 相关变更）
// temp（临时代码：不计入 CHANGELOG，比如必须部署到某种环境才能测试的变更。如测试真机上 transparent title 启动参数是否设置成功）

// 5、If Else包
<div className="expert-opinion-box">
  <If condition={index === 0}>
    {endOpinionStatus ? (
      advise("结束评审意见", endReviewOpinion)
    ) : (
      <If condition={operatePrivilege.modifyOpinion}>
        {getFieldDecorator("opinion", {
          initialValue: endReviewOpinion,
          rules: [{ required, message: "请输入" }],
        })(textarea)}
        <Else />
        {advise("结束评审意见", endReviewOpinion)}
      </If>
    )}
    {adviseOrder.map(({ name, key }) => {
      return advise(name, item[key]);
    })}
  </If>
  <If condition={index !== 0 && allSubmit}>
    {advise("结束评审意见", endReviewOpinion)}
    {adviseOrder.map(({ name, key }) => {
      return advise(name, item[key]);
    })}
  </If>
  <If condition={index !== 0 && !allSubmit}>
    <div className="opinion-status">
      <p style={{ color: endOpinionStatus ? "#2DC12D" : "#FF3100", paddingTop: 15 }}>
        {endOpinionStatus ? "已提交" : "未提交"}
      </p>
      <span style={{ color: "#999" }}>全部组员提交后您需根据组员意见汇总评标结果</span>
    </div>
  </If>
</div>;

// 6、Object.assign 用法
const res = Object.assign({}, { a: 111 }, { b: 222 });

// 7、setState
this.setState({ anchorId, fileType }, () => {
  console.log(this.state.anchorId);
});

// 8、resize
window.addEventListener("resize", this.onSizeChange);
window.removeEventListener("resize", this.onSizeChange);

// 9、blob转文件
function download(href, filename = "") {
  const a = document.createElement("a");
  a.download = filename;
  a.href = href;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

downloadFile = (url, filename) => {
  fetch(url, {
    headers: new Headers({
      Origin: location.origin,
    }),
    mode: "cors",
  })
    .then((res) => res.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      download(blobUrl, filename);
      window.URL.revokeObjectURL(blobUrl);
    });
};

downloadFile('xxx', 'xxxxxxx')

// 10、fileSize
fileSize(size) {
  if (!size) {
    return '';
  }
  const sizeKB = size / 1024;
  if (sizeKB < 1) {
    return `${size % 1 === 0 ? size : size.toFixed(1)}B`;
  }
  const sizeMB = sizeKB / 1024;
  if (sizeMB < 1) {
    return `${sizeKB % 1 === 0 ? sizeKB : sizeKB.toFixed(1)}K`;
  }
  const sizeGB = sizeMB / 1024;
  if (sizeGB < 1) {
    return `${sizeMB % 1 === 0 ? sizeMB : sizeMB.toFixed(1)}M`;
  }
  return `${sizeGB % 1 === 0 ? sizeGB : sizeGB.toFixed(1)}G`;
}

// 11、下载二进制文件
/**
 * 下载二进制文件
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 */
export function downLoadBitFile(url, params) {
  return axios
    .request({
      url,
      method: 'get',
      params,
      responseType: 'blob',
    })
    .then((res) => {
      const { data, headers } = res;
      const blob = new Blob([data], { type: headers['content-type'] });
      const fileName = decodeURI(
        headers['content-disposition'].replace(/\w+; filename="(.*)"/, '$1')
      );
      if ('download' in document.createElement('a')) {
        // 非IE下载
        const elink = document.createElement('a');
        elink.download = fileName;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName);
      }
    })
    .catch(async (err) => {
      const text = (await err.response?.data?.text()) || '{}';
      message.error(JSON.parse(text)?.message);
    });
}

// 12、
/**
 * 下载文件流
 */
export const downloadFileStream = (stream: Blob, options: DownloadOptions) => {
  const { type, fileName, isOpenNewPage } = options;
  const href = URL.createObjectURL(new Blob([stream], { type })); // 创建新的URL表示指定的blob对象
  const a = document.createElement("a");
  a.href = href; // 指定下载链接
  a.download = fileName; // 指定下载文件名
  a.target = isOpenNewPage ? "_blank" : "_self";
  a.click();
  URL.revokeObjectURL(a.href); // 释放URL对象
};

const res = await exportExamInfo(
  { userId, examId, courseId },
  { responseType: "blob" },
);
if (res) {
  const downloadOptions: Parameters<typeof downloadFileStream>[1] = {
    type: "application/vnd.ms-excel",
    fileName: `${examId}_${userId}_${userName}`,
    isOpenNewPage: false,
  };
  downloadFileStream(res, downloadOptions);
}