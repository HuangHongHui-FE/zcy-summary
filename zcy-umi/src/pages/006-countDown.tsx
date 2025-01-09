import React from 'react';
import CountDown from '../components/CountDown';

const Index = () => {
  return (
    <div>
      <p>
        您还有
        <CountDown countDownTime={100000} />
        来收货,超时将自动收货
      </p>
    </div>
  );
};

export default Index;
