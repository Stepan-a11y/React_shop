import React, { useEffect, useState } from "react";
import style from "./App.module.css";
import AboutShop from "./components/AboutShop";
import Header from "./components/Header";
import Home from "./components/Home";
import Modal from "./components/Modal";
import { Route, Routes } from "react-router-dom"
import ProductPage from "./components/ProductPage";
import ModalError from "./components/ModalError";
import { useDispatch, useSelector } from "react-redux"
import { getUserThunk } from "./store/thunks/userThunk"
import { getProdCountThunk, getProductsThunk } from "./store/thunks/productsThunk";
import MyBasket from "./components/MyBasket";
import { setIsErrProd } from "./store/reducers/productReducer";
import { setIsErrUser } from "./store/reducers/userReducer";


const App = () => {

  const products = useSelector(store => store.products.products)
  const errProd = useSelector(store => store.products.prodError)
  const isErrProd = useSelector(store => store.products.isErrProd)
  const errUser = useSelector(store => store.products.userError)
  const isErrUser = useSelector(store => store.products.isErrUser)
  const dispatch = useDispatch()

  const [modalActive, setModalActive] = useState(false)

  useEffect(() => {
    dispatch(getProductsThunk())
    dispatch(getUserThunk())
  }, [])
  
  useEffect(() => {
    dispatch(getProdCountThunk())
  }, [products])
  
  const setErr = (flag) => {
    dispatch(setIsErrUser(flag))
    dispatch(setIsErrProd(flag))
  }

  return (
    <div className={style.app}>
      <Routes>
        <Route path="/" element={<Header setActive={setModalActive} />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="about" element={<AboutShop />} />
          <Route path="basket" element={<MyBasket />} />
          <Route path="*" element={<h1 style={{ color: "red" }}>Что-то пошло не так. Данной страницы не существует</h1>} />
        </Route>
      </Routes>
      <Modal active={modalActive} setActive={setModalActive} />
      {<ModalError active={(isErrProd || isErrUser) ? true : false} setActive={setErr} errProd={errProd} errUser={errUser} />}
    </div>
  );
}

export default App;
