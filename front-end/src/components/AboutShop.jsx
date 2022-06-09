import React from "react";
import style from "./styles/AboutShop.module.css";


const AboutShop = () => {
  return (
    <div className={style.container}>
      <h2 className={style.text}> React Shop - это магазин различных товаров на любой вкус, здесь вы можете найти товары
        начиная от одежды и заканчивая техникой и украшениями. У нас большой ассортимент товаров для каждого.
        Мы рады каждому посетителю! Добро пожаловать в наш React Shop!</h2>
    </div>
  );
}

export default AboutShop;