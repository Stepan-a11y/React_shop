import React from "react";
import style from "./styles/Home.module.css";
import { Link } from "react-router-dom";
import Button from "./Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { setProdBasket, setTotalCount, setTotalPrice, updateProdBasket, setProdCount } from "../store/reducers/productReducer";


const Home = () => {

  const dispatch = useDispatch()

  const products = useSelector(store => store.products.products)
  const loader = useSelector(store => store.products.isLoad)
  const prodCount = useSelector(store => store.products.prodCount)
  const isAuth = useSelector(store => store.user.isAuth)
  const stateBasket = useSelector(store => store.products.basket)

  let allCount = useSelector(store => store.products.allCount)
  let allPrice = useSelector(store => store.products.allPrice)


  const basket = (id, title, price, totalPrice = price, totalCount = 1) => {
    allCount += 1
    dispatch(setTotalCount(allCount))

    allPrice = Number(allPrice.toFixed(2)) + price
    dispatch(setTotalPrice(allPrice))

    let flag = stateBasket.find(elem => elem.id === id)
    if (flag) {
      totalPrice += flag.totalPrice;
      totalCount += flag.totalCount;
      dispatch(updateProdBasket(flag.id, flag.title, flag.price, totalPrice, totalCount))
    } else {
      dispatch(setProdBasket(id, title, price, totalPrice, totalCount))
    }

    if (prodCount[id].count > 0) {
      dispatch(setProdCount(([...prodCount, prodCount[id].count = prodCount[id].count - 1])))
    }
  }


  return (
    <div className={style.home}>
      {(loader) ? <h1>Загрузочка...</h1> :
        products.map(item =>
          <div className={style.productCard} key={item.id}>
            <img src={item.image} alt="" width="200" height="220" />
            <Link to={`/product/${item.id}`} key={item.id}><p>{item.title}</p></Link>
            <span>Цена: {item.price}$</span>
            {(isAuth) ? (prodCount[item.id].count <= 0) ? <p>Товара нет в наличии</p> :
              <Button type="button" value="Добавить в корзину" onClick={() => { basket(item.id, item.title, item.price) }} /> :
              <p>Чтобы добавить товар в корзину, залогиньтесь</p>}
          </div>
        )
      }
    </div>
  );
}

export default Home;