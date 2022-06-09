import React from "react";
import style from "./styles/ModalError.module.css";

const ModalError = (props) => {
  return (
    <div className={props.active ? (`${style.err} ${style.active}`) : style.err}>
        <div className={style.errText}>
        <button className={style.closeBut} onClick={() => props.setActive(false)}>x</button>
            {<p>{props.errProd}</p> || <p>{props.errUser}</p>}
        </div>
    </div>
  );
}

export default ModalError;