import React from 'react';
import classNames from 'classnames';

const Index = () => {
    
  const prefixCls = 'hhh';

  const extraCls = classNames({
    [`${prefixCls}-extra-content`]: true,
    [`${prefixCls}-extra-content--active`]: true,
  });
  console.log('🚀 ~ Index ~ extraCls:', extraCls);

  return <div>classNames</div>;
};

export default Index;
