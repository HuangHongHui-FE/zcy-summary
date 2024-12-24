import React from "react";
import classNames from "classnames";

const Required = ({ title, required = true }) => (
  <span className={classNames({ "ant-form-item-required": required })}>{title}</span>
);

export default Required;
