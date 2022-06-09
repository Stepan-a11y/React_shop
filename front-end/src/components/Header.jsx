import React from "react";
import style from "./styles/Header.module.css";
import { Outlet, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthAction } from "../store/reducers/userReducer";
import basketLogo from "../icons/basketIcon2.png";


const Header = (props) => {

  const isAuth = useSelector(store => store.user.isAuth)
  const dispatch = useDispatch()
  let allCount = useSelector(store => store.products.allCount)
  let allPrice = useSelector(store => store.products.allPrice)
  
  return (
    <>
      <header className={style.header}>
        <div className={style.headerItems}><Link to="/"><button className={style.but}>Главная</button></Link></div>
        <div className={style.headerItems}><Link to="/about"><button className={style.but}>О магазине</button></Link></div>
        {(isAuth) ? <div className={style.headerItems} onClick={() => dispatch(setAuthAction(null))}><button className={style.but}>Выход</button></div> :
          <div className={style.headerItems} onClick={() => props.setActive(true)}><button className={style.but}>Авторизация</button></div>}
        {(isAuth) ? <div className={style.headerItems}><Link to="/basket" className={style.link}><div className={style.basket}><div className={style.basketIcon}>
          <span className={style.basketCount}>{allCount}</span><img src={basketLogo} height="45" width="45" alt="" /></div><p className={style.basketPrice}>{Number(allPrice.toFixed(2))}$</p></div></Link></div> : null}
      </header>
      <Outlet />
    </>
  );
}

export default Header;
