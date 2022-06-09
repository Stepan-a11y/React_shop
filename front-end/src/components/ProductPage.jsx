import React, { useState } from "react";
import style from "./styles/ProductPage.module.css";
import { useParams } from "react-router-dom";
import Button from "./Buttons/Button";
import { useDispatch, useSelector } from "react-redux"
import { setProdCount, setProdBasket, updateProdBasket, setTotalCount, setTotalPrice } from "../store/reducers/productReducer";


const ProductPage = () => {

  const { id } = useParams()
  const [countProd, setCountProd] = useState(1)

  const products = useSelector(store => store.products.products)
  const prodCount = useSelector(store => store.products.prodCount)
  const loader = useSelector(store => store.products.isLoadCount)
  const isAuth = useSelector(store => store.user.isAuth)
  const stateBasket = useSelector(store => store.products.basket)

  let allCount = useSelector(store => store.products.allCount)
  let allPrice = useSelector(store => store.products.allPrice)

  const dispatch = useDispatch()

  const result = (id, title, price, totalPrice = price, totalCount = 0) => {

    allCount += countProd
    dispatch(setTotalCount(allCount))

    allPrice = Number(allPrice.toFixed(2)) + (price * countProd)
    dispatch(setTotalPrice(allPrice))

    let flag = stateBasket.find(elem => elem.id === id)
    console.log(flag)
    if (flag) {
      flag.totalCount += countProd
      flag.totalPrice += (totalPrice * countProd)
      dispatch(updateProdBasket(id, title, price, flag.totalPrice, flag.totalCount))
    } else {
      totalCount += countProd
      totalPrice *= countProd
      dispatch(setProdBasket(id, title, price, totalPrice, totalCount))
    }
    if (prodCount[id].count > 0) {
      dispatch(setProdCount(([...prodCount, prodCount[id].count = prodCount[id].count - Number(countProd)])))
    }
  }


  return (
    <div className={style.pageContainer}>
      {(loader) ? <h1>Загрузочка...</h1> :
        products.map(item =>
          (Number(id) === item.id) &&
          <div className={style.productInfo} key={item.id}>
            <div className={style.imgBlock}>
              <img src={item.image} alt="" width="400" height="430" />
              <h2>Описание товара:</h2><p className={style.text}>{item.description}</p>
            </div>
            {<div className={style.infoBlock}>
              <h2>Название товара: <h5>{item.title}</h5></h2>
              <h2>В наличии: {(prodCount[id].count > 0) ? prodCount[id].count : 0}</h2>
              <h1>Цена: {item.price}$</h1>
              {(isAuth) ? (prodCount[id].count <= 0) ? <h4>Товара нет в наличии</h4> : <div className={style.butBlock}>
                <Button type="button" disabled={countProd > prodCount[id].count} value="Добавить в корзину" onClick={() => result(item.id, item.title, item.price)} />
                <div className={style.counter}>
                  <input type="button" className={style.butCount} value="+" onClick={(e) => (countProd === 100) ? setCountProd(100) : setCountProd(Number(countProd) + 1)} />
                  <input type="number" min="1" max="100" readOnly className={style.num} value={countProd} onChange={(e) => setCountProd(e.target.value)} />
                  <input type="button" className={style.butCount} value="-" onClick={(e) => (countProd === 1) ? setCountProd(1) : setCountProd(Number(countProd) - 1)} />
                </div>
              </div> : <h4>Чтобы добавить товар в корзину, залогиньтесь</h4>}
            </div>}
          </div>
        )
      }
    </div>
  );
}

export default ProductPage;
