import { FC, useState } from 'react';
import { IPostDish } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../state';
import './PostDish.scss';

const PostDish: FC<IPostDish> = ({ id, imgSrc, altImg, title, price }) => {
  const [isClickedOnThePrice, setIsClickedOnThePrice] =
    useState<boolean>(false);

  const handleClickOnThePrice = (): void => {
    setIsClickedOnThePrice(!isClickedOnThePrice);
  };

  const allDishesId = useSelector((state: any) => state.cart.dishes);

  const dispatch = useDispatch();

  const { addToCart } = actionCreators;

  return (
    <div className="postdish-container">
      <div className="dish-image">
        <img src={imgSrc} alt={altImg} />
      </div>
      <h3>
        {title}
        <span>{allDishesId[id] > 0 && `(${allDishesId[id]})`}</span>
      </h3>
      {isClickedOnThePrice ? (
        <button
          className="addToCart-btn"
          onClick={() => dispatch(addToCart(id))}
        >
          <p>Add to cart</p>
          <p>{price}</p>
        </button>
      ) : (
        <button className="priceOfTheDish-btn" onClick={handleClickOnThePrice}>
          {price}
        </button>
      )}
    </div>
  );
};

export default PostDish;
