import React, { useState } from "react";
import Button from "./Buttons/Button";
import style from "./Modal.module.css";

const Modal = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [onSubmit, setOnSubmit] = useState(null)

  const submit = () => {
    if (props.email !== email) {
      setOnSubmit(false)
    } else if (props.password !== password) {
      setOnSubmit(false)
    } else {
      props.setActive(false)
      setOnSubmit(true)
      props.setIsAuth(true)
      setEmail("")
      setPassword("")
    }
  }

  return (
    <div className={props.active ? (`${style.modal} ${style.active}`) : style.modal}>
      <div className={props.active ? (`${style.modalContent} ${style.active}`) : style.modalContent}>
        <button className={style.closeBut} onClick={() => props.setActive(false)}>X</button>
        <form className={style.form}>
          <label htmlFor="login">Логин:</label>
          <input id="login" className={style.inputs} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="pass">Пароль:</label>
          <input id="pass" className={style.inputs} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {(onSubmit === false) && <span style={{color: "red"}}>Неверный логин или пароль!</span>}
          <div className={style.buttons}>
            <Button type="button" value="Отмена" onClick={(e) => { props.setActive(false) }} />
            <Button type="button" value="Войти" onClick={submit} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;