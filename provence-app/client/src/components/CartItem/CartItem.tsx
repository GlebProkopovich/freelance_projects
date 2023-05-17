import { FC } from 'react';
import './CartItem.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IPostDish } from '../../types';
import { actionCreators } from '../../state';

const CartItem: FC<IPostDish> = ({ id, imgSrc, altImg, title, price }) => {
  const allDishesId = useSelector((state: any) => state.cart.dishes);

  const dispatch = useDispatch();

  const { addToCart, deleteFromCart } = actionCreators;

  const handleClickAddToCart = (id: string) => {
    dispatch(addToCart(id));
  };

  const handleClickDeleteFromCart = (id: string) => {
    dispatch(deleteFromCart(id));
  };

  return (
    <div className="cartItem-container">
      <div className="dish-img">
        <img src={imgSrc} alt={altImg} />
      </div>
      <p className="title">{title}</p>
      <div className="countHandler">
        <button onClick={() => handleClickDeleteFromCart(id)}> − </button>
        <p>{allDishesId[id]}</p>
        <button onClick={() => handleClickAddToCart(id)}> + </button>
      </div>
      <p className="price">{`${price.split(' ')[0] * allDishesId[id]} ₾`}</p>
    </div>
  );
};

export default CartItem;
