/* eslint-disable no-console */
class Tracer {
  pageAB = () => {
    return [window?.g_UTM?.utm_ab?.[0] || "", window?.g_UTM?.utm_ab?.[1] || ""];
  };

  send = (options) => {
    if (!window?.g_UTM) {
      return;
    }
    const { type, position, data, actionCode } = options;
    window?.g_UTM?.send?.(type, position, data, actionCode);
  };

  batchSend = (options) => {
    if (!window?.g_UTM) {
      return;
    }
    const { type, list } = options;
    window?.g_UTM?.batchSend?.(type, list);
  };

  // 暂时用浑仪打一些技术日志
  log = (msg) => {
    try {
      this.send({
        type: "debug",
        position: ["c999", "d999"],
        data: {
          debugInfo: msg,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
}

const tracer = new Tracer();

export default tracer;

/* 

浑仪埋点上报使用示例:

tracer.send({
  type: 'click',
  position: ['c100', 'd200'],
  data: {},
});


tracer.batchSend({
  type: 'hover',
  list: [
    {
      utmCD: ['c100', 'd200'],
      bdata: {},
    },
    {
      utmCD: ['c100', 'd200'],
      bdata: {},
    },
  ],
});
 
*/

// 使用

import tracer from 'src/utils/tracer';

tracer.send({
  type: "click",
  // position 是不是要调整一下
  position: ["cProjectGenerateEdit", "dProjectRuleSetting"],
  data: {
    action: "项目业务规则",
  },
  actionCode: "xmcg-click",
});
