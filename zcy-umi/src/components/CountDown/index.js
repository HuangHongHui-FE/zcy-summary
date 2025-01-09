import React from 'react';
import './index.less';

class CountDown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.SECOND = 1000;
    this.MINUTE = 60 * this.SECOND;
    this.HOUR = 60 * this.MINUTE;
    this.DAY = 24 * this.HOUR;

    this.unitStack = [];
    this.unitArray = ['天', '小时', '分', '秒'];
  }

  state = {};

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.countDownTime === prevState.deafultCountDownTime) {
      return null;
    }
    return {
      countDownTime: nextProps.countDownTime,
      deafultCountDownTime: nextProps.countDownTime,
    };
  }

  formatTime = (timestamp) => {
    const { type = 'million' } = this.props;
    let d;
    let h;
    let m;
    let s;
    if (type === 'million') {
      d = Math.floor(timestamp / this.DAY);
      h = Math.floor((timestamp - (d * this.DAY)) / this.HOUR);
      m = Math.floor((timestamp - (h * this.HOUR) - (d * this.DAY)) / this.MINUTE);
      s = Math.floor((timestamp - (h * this.HOUR) -
        (m * this.MINUTE) - (d * this.DAY)) / this.SECOND);
    } else {
      d = Math.floor(timestamp / (24 * 60 * 60)); // calculate days from timestamp
      h = Math.floor(timestamp / (60 * 60)) % 24; // hours
      m = Math.floor(timestamp / 60) % 60; // minutes
      s = Math.floor((timestamp - (h * 60 * 60) - (m * 60) - (d * 24 * 60 * 60)));
    }
    return `${this.format(d, '天')}${this.format(h, '小时')}${this.format(m, '分')}${this.format(s, '秒')}`;
  }

  format = (t, unit) => {
    const { unitCount = 4 } = this.props;
    if (unitCount === 4) {
      return t > 0 ? `${t}${unit}` : '';
    }
    if (t > 0) {
      this.unitStack.push(unit);
    }
    if (this.unitStack.length !== 0) {
      const maxUnitIndex = this.unitArray.indexOf(this.unitStack[0]);
      // const otherUnitIndex = maxUnitIndex === 3 ? maxUnitIndex - 1 : maxUnitIndex + 1;
      if (unit === this.unitStack[0] || unit === this.unitArray[maxUnitIndex + 1]) {
        return `${t}${unit}`;
      }
      return '';
    } else if (unit === this.unitArray[3] || unit === this.unitArray[4]) {
      return `${t}${unit}`;
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.countDown, this.SECOND);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  countDown = () => {
    const { type = 'million' } = this.props;
    const deleteCount = type === 'million' ? 1000 : 1;
    this.setState(({ countDownTime }) => {
      if (countDownTime >= deleteCount) {
        return {
          countDownTime: countDownTime - deleteCount,
        };
      }
      return null;
    });
  }

  render() {
    const { countDownTime, children, ...restProps } = this.props;
    return (
      <span className="bidding-count-down">
        <span {...restProps} className="bidding-count-down-time" >{this.formatTime(this.state.countDownTime)}</span>
        <span className="bidding-count-down-text">{children}</span>
      </span>
    );
  }
}

export default CountDown;
