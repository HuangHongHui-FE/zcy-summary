const ref = Modal.success({
  title: (
    <Fragment>
      <div>{status === AUDIT_RESULT.PASS ? autoAuditText : auditText}</div>
    </Fragment>
  ),
  className: "launch-help-modal",
  closable: true,
  content: (
    <div>
      <div>{this.renderDepositInsuranceTips(depositInsuranceTips)}</div>
      {/* 双盲项目文案, 1 代表双盲 */}
      {doubleBlindStatus === 1 && (
        <div>
          当前项目为双盲项目，请仔细按照采购文件要求编写标书；标书上传时，需要进行技术文件智检，请预留充足时间用于检测和修改。
        </div>
      )}
    </div>
  ),
  okText: status === AUDIT_RESULT.PASS ? this.replaceAlias("下载采购文件") : "我知道了",
  onOk: () => {
    if (status === AUDIT_RESULT.PASS) {
      this.openDownLoadModal(ref);
    } else {
      this.replaceToDetail(projectId);
    }
  },
  onCancel: () => {
    this.replaceToDetail(projectId);
  },
  okButtonProps: {
    type: "primary",
    className: status === AUDIT_RESULT.PASS ? "launch-help-modal-okBtn" : "",
  },
});

// 11111
ref.destroy();