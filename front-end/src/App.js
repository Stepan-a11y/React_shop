import React, { useEffect, useState } from "react";
import style from "./App.module.css";
import AboutShop from "./components/AboutShop";
import Header from "./components/Header";
import Home from "./components/Home";
import Modal from "./components/Modal";
import { Route, Routes } from "react-router-dom"
import ProductPage from "./components/ProductPage";
import ModalError from "./components/ModalError";


const App = () => {

  const [modalActive, setModalActive] = useState(false)

  const [products, setProducts] = useState([])
  const [user, setUser] = useState({})
  const [countItem, setCountItem] = useState([])

  const [basketItems, setBasketItems] = useState(0)
  const [basketPrice, setBasketPrice] = useState(0)
  const [isAuth, setIsAuth] = useState(false)
  const [serverError, setServerError] = useState({errMessage: null})
  const [isErr, setIsErr] = useState(false)

  useEffect(() => {
      fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => {
        setServerError({errMessage: err.message})
        setIsErr(true)
      })
  }, [])

  useEffect(() => {
      fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        if (countItem.length === 0) {
          let arr = [{ itemId: 0, count: 0 }];
          data.forEach(elem => {
            arr.push({ itemId: elem.id, count: elem.rating.count })
          });
          setCountItem(arr)
        }
      })
      .catch(err => {
        setServerError({errMessage: err.message})
        setIsErr(true)
      })
  }, [])

  useEffect(() => {
      fetch('https://fakestoreapi.com/users/1')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => {
        setServerError({errMessage: err.message})
        setIsErr(true)
      })   
  }, [])


  const basket = (basketItem, price, id) => {
    setBasketItems(basketItem + 1);
    setBasketPrice(prev => Number(prev.toFixed(2)) + Number(price))
    setCountItem([...countItem, countItem[id].count = countItem[id].count - 1])
  }


  return (
    <div className={style.app}>
      <Routes>
        <Route path="/" element={<Header isAuth={isAuth} setIsAuth={setIsAuth} basketItems={basketItems} basketPrice={basketPrice} setActive={setModalActive} />}>
          <Route index element={<Home isAuth={isAuth} countItem={countItem} products={products} basketItems={basketItems} basketPrice={basketPrice} basket={basket} />} />
          <Route path="product/:id" element={<ProductPage isAuth={isAuth} setCountItem={setCountItem} countItem={countItem} setBasketPrice={setBasketPrice} setBasketItems={setBasketItems} products={products} />} />
          <Route path="about" element={<AboutShop />} />
          <Route path="*" element={<h1 style={{ color: "red" }}>Что-то пошло не так. Данной страницы не существует</h1>} />
        </Route>
      </Routes>
      <Modal email={user.email} password={user.password} setIsAuth={setIsAuth} active={modalActive} setActive={setModalActive} />
      <ModalError serverError={serverError}  active={isErr} setActive={setIsErr}/>
    </div>
  );
}

export default App;
