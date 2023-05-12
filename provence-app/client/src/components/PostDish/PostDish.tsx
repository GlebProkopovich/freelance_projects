import React, { FC, useState } from 'react';
import { IPostDish } from '../../types';
import './PostDish.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../state';

const PostDish: FC<IPostDish> = ({ id, imgSrc, altImg, title, price }) => {
  const [isClickedOnThePrice, setIsClickedOnThePrice] =
    useState<boolean>(false);

  const handleClickOnThePrice = (): void => {
    setIsClickedOnThePrice(!isClickedOnThePrice);
  };

  // const data = useSelector((state) => state);
  // console.log(data);

  const dispatch = useDispatch();

  const { addToCart } = actionCreators;

  return (
    <div className="postdish-container">
      <div className="dish-image">
        <img src={imgSrc} alt={altImg} />
      </div>
      <h3>{title}</h3>
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
