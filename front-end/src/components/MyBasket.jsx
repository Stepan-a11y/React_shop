import React from "react";
import style from "./styles/MyBasket.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setProdCount, delAllProd, deleteItem, setTotalCount, setTotalPrice, updateProdBasket } from "../store/reducers/productReducer";
import { useNavigate } from "react-router-dom";


const MyBasket = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const basketItems = useSelector(store => store.products.basket)
  const isAuth = useSelector(store => store.user.isAuth)
  const prodCount = useSelector(store => store.products.prodCount)
  let allPrice = useSelector(store => store.products.allPrice)
  let allCount = useSelector(store => store.products.allCount)

  const delItem = (id, currentCount, currentPrice) => {
    let flag = basketItems.find(elem => elem.id === id)
    if (flag) {
      dispatch(deleteItem(id))
    }
    allCount -= currentCount
    dispatch(setTotalCount(allCount))

    allPrice = Number(allPrice.toFixed(2)) - currentPrice
    dispatch(setTotalPrice(allPrice))


  }

  const incrementItem = (id, currentCount, currentPrice) => {
    let flag = basketItems.find(elem => elem.id === id)
    if (flag) {
      currentCount += 1
      currentPrice += Number(flag.price.toFixed(2))
      dispatch(updateProdBasket(flag.id, flag.title, flag.price, currentPrice, currentCount))

      allCount += 1
      dispatch(setTotalCount(allCount))

      allPrice = Number(allPrice.toFixed(2)) + flag.price
      dispatch(setTotalPrice(allPrice))

      if (prodCount[id].count > 0) {
        dispatch(setProdCount(([...prodCount, prodCount[id].count = prodCount[id].count - 1])))
      }
    }
  }

  const decrementItem = (id, currentCount, currentPrice) => {
    let flag = basketItems.find(elem => elem.id === id)
    if (flag) {
      currentCount -= 1
      currentPrice -= Number(flag.price.toFixed(2))
      dispatch(updateProdBasket(flag.id, flag.title, flag.price, currentPrice, currentCount))

      allCount -= 1
      dispatch(setTotalCount(allCount))

      allPrice = Number(allPrice.toFixed(2)) - flag.price
      dispatch(setTotalPrice(allPrice))
    }
    if (prodCount[id].count > 0) {
      dispatch(setProdCount(([...prodCount, prodCount[id].count = prodCount[id].count + 1])))
    }
  }


  return (
    (!isAuth) ? navigate("/") :
      <div className={style.wrap}>
        <h1>Моя корзина</h1>
        <table bordercolor="#db81eb" cellpadding="8" border="1" width="85%" cellspacing="0">
          <tr>
            <td><h4>ID</h4></td>
            <td><h4>Название товара</h4></td>
            <td><h4>Цена за штуку</h4></td>
            <td><h4>Количество штук</h4></td>
            <td><h4>Общая цена за товар</h4></td>
            <td><h4>Удаление товара</h4></td>
          </tr>
          {basketItems.map(item =>
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td><button disabled={item.totalCount === 1} onClick={() => decrementItem(item.id, item.totalCount, item.totalPrice)}>-</button> {item.totalCount} <button disabled={item.totalCount === 100} onClick={() => incrementItem(item.id, item.totalCount, item.totalPrice)}>+</button></td>
              <td>{Number(item.totalPrice.toFixed(2))}</td>
              <td><input type="button"className={style.but} value="Удалить" onClick={() => delItem(item.id, item.totalCount, item.totalPrice)} /></td>
            </tr>
          )}
        </table>
        <h2>Товаров на сумму: {Number(allPrice.toFixed(2))}$</h2>
        <div className={style.buttons}>
          <input type="button"className={style.but} onClick={() => dispatch(delAllProd())} value="Очистить корзину" />
          <input type="button" className={style.but} disabled value="Оплатить" />
        </div>
      </div>
  );
}

export default MyBasket;