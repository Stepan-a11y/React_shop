import React from "react";
import style from "./ModalError.module.css";

const ModalError = (props) => {
  return (
    <div className={props.active ? (`${style.err} ${style.active}`) : style.err}>
        <div className={style.errText}>
        <button className={style.closeBut} onClick={() => props.setActive(false)}>x</button>
            {props.serverError.errMessage}
        </div>
    </div>
  );
}

export default ModalError;