import React from 'react';
import ReactDOM from 'react-dom';

// 1、modalWrapper
const modalWrapper = (Modal) => {
  Modal.show = (config) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
  
    function close() {
      render({ ...config, visible: false, afterClose: destroy.bind(this) });
    }
  
    function destroy() {
      const unmountResult = ReactDOM.unmountComponentAtNode(div);
      if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
      }
    }
  
    function render(props) {
      ReactDOM.render(
        <Modal visible onCancel={close} {...props} />, div
      );
    }
  
    render(config);
  };

  return Modal;
};

export default modalWrapper;


// 2、NoticeModal
import React from "react";
import modalWrapper from "src/components/ModalWrapper";
import { Modal,Divider,Icon } from "@zcy/doraemon";
import moment from 'moment';
import './index.less'

const NoticeModal = (props) => {
  const {
    visible = false,
    onCancel,
    content,
    publishTime,
    title,
  } = props;
  return <Modal
    title="更正公告"
    visible={visible}
    onCancel={onCancel}
    footer={null}
    width={1000}
    destroyOnClose={true}
  >
    <div className="announceModal">
      <h1 className="title">{title}</h1>
      <Divider></Divider>
      <p className="small">
        <Icon type="clock-circle-o" />
        <span>发布时间：{moment(publishTime).format('YYYY-MM-DD HH:mm:ss')}</span>
      </p>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></div>
    </div>
  </Modal>
}

export default modalWrapper(NoticeModal)


// 3、使用
import NoticeModal from '../components/NoticeModal';
NoticeModal.show({
    title,
    content,
    publishTime,
});




