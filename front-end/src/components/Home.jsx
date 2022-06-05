import React from "react";
import style from "./Home.module.css";
import { Link } from "react-router-dom";
import Button from "./Buttons/Button";


const Home = (props) => {


  return (
    <div className={style.home}>
      {
        props.products.map(item =>
          <div className={style.productCard} key={item.id}>
            <img src={item.image} alt="" width="200" height="220" />
            <Link to={`/product/${item.id}`} key={item.id}><p>{item.title}</p></Link>
            <span>Цена: {item.price}$</span>
            {(props.isAuth) ? (props.countItem[item.id].count <= 0) ? <p>Товара нет в наличии</p> : <Button type="button" value="Добавить в корзину" onClick={() => { props.basket(props.basketItems, Number(item.price).toFixed(2), item.id) }} /> :
              <p>Чтобы добавить товар в корзину, залогиньтесь</p>}
          </div>
        )
      }
    </div>
  );
}

export default Home;