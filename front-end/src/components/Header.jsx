import React from "react";
import style from "./Header.module.css";
import { Outlet, Link } from "react-router-dom";

const Header = (props) => {

  return (
    <>
      <header className={style.header}>
        <div className={style.headerItems}><Link to="/"><button className={style.but}>Главная</button></Link></div>
        <div className={style.headerItems}><Link to="/about"><button className={style.but}>О магазине</button></Link></div>
        {(props.isAuth) ? <button className={style.mybasket}>
          Моя корзина
          <div className={style.countBasket}>{props.basketItems} товар(-ов): {props.basketPrice}$</div>
        </button> : null}
        {(props.isAuth) ? <div className={style.headerItems} onClick={() => props.setIsAuth(false)}><button className={style.but}>Выход</button></div> :
          <div className={style.headerItems} onClick={() => props.setActive(true)}><button className={style.but}>Авторизация</button></div>}
      </header>
      <Outlet />
    </>

  );
}

export default Header;
