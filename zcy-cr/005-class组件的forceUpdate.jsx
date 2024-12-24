import React from "react";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  updateWithoutStateChange = () => {
    // 强制更新组件，即使状态或属性没有变化
    this.forceUpdate(() => {
      console.log("Component has been forced to update");
    });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.updateWithoutStateChange}>Force Update</button>
      </div>
    );
  }
}

export default MyComponent;
