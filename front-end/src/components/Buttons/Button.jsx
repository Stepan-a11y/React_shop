import React from "react";
import style from "./Button.module.css";

const Button = (props) => {
  return (
    <input className={style.but} {...props} />
  );
}

export default Button;