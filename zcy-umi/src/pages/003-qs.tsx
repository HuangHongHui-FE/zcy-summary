import React from 'react';
import qs from 'qs';
console.log('🚀 ~ qs:', qs);

const Index = () => {
  let obj = {
    a: 'aaa',
    b: '我是你爹',
    c: 'ccc',
  };
  // a=aaa&b=bbb&c=ccc
  console.log(qs.stringify(obj));

  let arr = [1, 2];
  // 'bb[0]=1&bb[1]=2'
  console.log(qs.stringify({ bb: arr }));

  let url = 'age=我是你爹&name="xz"';
  // {age: 18, name: xz}
  console.log(qs.parse(url));

  return <div style={{ width: '100px', backgroundColor: 'red' }}>111</div>;
};

export default Index;
