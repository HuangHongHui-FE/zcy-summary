import React from 'react';
import classNames from 'classnames';

const Index = () => {
  const scrollTo = (x, y, dom) => {
    const element = dom || window;
    if ('scrollBehavior' in document.documentElement.style) {
      element.scrollTo({
        top: y || 0,
        left: x || 0,
        behavior: 'smooth',
      });
    } else {
      element.scrollTo(x, y);
    }
  };

  return (
    <div>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <p>1</p>
      <button onClick={() => scrollTo(100, 100)}>跳转</button>
    </div>
  );
};

export default Index;
