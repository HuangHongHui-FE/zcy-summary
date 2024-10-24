import React, { Component } from "react";
import { connect } from "dva";

class Film extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "maizuo/getCinemaList",
    });
  }

  render() {
    const { fileList, loading } = this.props;
    console.log("🚀 ~ Film ~ render ~ loading:", loading)

    return (
      <div>
        {fileList.map((item) => (
          <li
            key={item.filmId}
            onClick={() => {
              this.props.history.push(`/detail/${item.filmId}`);
            }}
          >
            <img src={item.poster} alt={item.name} style={{ width: "100px" }} />
            <p>{item.name}</p>
          </li>
        ))}
      </div>
    );
  }
}

export default connect((state) => {
  // console.log("🚀 ~ connect ~ state:", state);
  return {
    fileList: state.maizuo.fileList,
    loading: state.loading.models.maizuo,
  };
})(Film);
