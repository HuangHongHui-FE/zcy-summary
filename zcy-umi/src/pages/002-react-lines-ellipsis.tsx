import React from 'react';

import LinesEllipsis from 'react-lines-ellipsis';

const Index = () => {
  const text =
    '11111hagoshdjoahoi交叉口三角函数的机会把自己开始不对劲啊啥的比较卡上班的话是多久bshadbjhasbdjhbbhjjbbjhabsvdhjsadabjsxbajsbjha';
  return (
    <div style={{ width: '100px', backgroundColor: 'red' }}>
      <div>{text}</div>

      <hr />

      <LinesEllipsis
        className="my-text"
        text={text} // 文本内容
        maxLine="3" // 最大显示3行
        ellipsis="..." // 超出3行省略号显示
        trimRight // 消除右侧空格
      />
    </div>
  );
};

export default Index;
