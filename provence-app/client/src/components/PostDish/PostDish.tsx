import React, { FC, useState } from 'react';
import { IPostDish } from '../../types';
import './PostDish.scss';

const PostDish: FC<IPostDish> = ({ imgSrc, altImg, title, price }) => {
  const [isClickedOnThePrice, setIsClickedOnThePrice] =
    useState<boolean>(false);

  const handleClickOnThePrice = (): void => {
    setIsClickedOnThePrice(!isClickedOnThePrice);
  };

  return (
    <div className="postdish-container">
      <div className="dish-image">
        <img src={imgSrc} alt={altImg} />
      </div>
      <h3>{title}</h3>
      {isClickedOnThePrice ? (
        <button className="addToCart-btn">
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
