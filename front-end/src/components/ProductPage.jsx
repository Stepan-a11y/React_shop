import React, { useState } from "react";
import style from "./ProductPage.module.css";
import { useParams } from "react-router-dom";
import Button from "./Buttons/Button";

const ProductPage = (props) => {

  const { id } = useParams()
  const [countProd, setCountProd] = useState(1)

  const result = (price) => {
    if (props.countItem[id].count > 0) {
      props.setBasketItems(prev => prev + Number(countProd))
      props.setBasketPrice(prev => prev + (Number(countProd) * price))
      props.setCountItem([...props.countItem, props.countItem[id].count = props.countItem[id].count - Number(countProd)])
    }
  }

  return (
    <div className={style.pageContainer}>
      {
        props.products.map(item =>
          (Number(id) === item.id) &&
          <div className={style.productInfo} key={item.id}>
            <div className={style.imgBlock}>
              <img src={item.image} alt="" width="400" height="430" />
              <h2>Описание товара:</h2><p className={style.text}>{item.description}</p>
            </div>
            <div className={style.infoBlock}>
              <h2>Название товара: <h5>{item.title}</h5></h2>
              <h2>В наличии: {(props.countItem[id].count > 0) ? props.countItem[id].count : 0}</h2>
              <h1>Цена: {item.price}$</h1>
              {console.log(props.countItem[id].count)}
              {(props.isAuth) ? (props.countItem[id].count <= 0) ? <h4>Товара нет в наличии</h4> : <div className={style.butBlock}>
                <Button type="button" value="Добавить в корзину" onClick={() => result(item.price, item.rating.count)} />
                <div className={style.counter}>
                  <input type="button" className={style.butCount} value="+" onClick={(e) => (countProd === 100) ? setCountProd(100) : setCountProd(Number(countProd) + 1)} />
                  <input type="number" min="1" max="100" readOnly className={style.num} value={countProd} onChange={(e) => setCountProd(e.target.value)} />
                  <input type="button" className={style.butCount} value="-" onClick={(e) => (countProd === 1) ? setCountProd(1) : setCountProd(Number(countProd) - 1)} />
                </div>
              </div> : <h4>Чтобы добавить товар в корзину, залогиньтесь</h4>}
            </div>
          </div>
        )
      }
    </div>
  );
}

export default ProductPage;
