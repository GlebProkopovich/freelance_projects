import React, { FC, useState } from 'react';
import './Menubar.scss';
import { NavLink } from 'react-router-dom';

const Menubar: FC = () => {
  const [isSearchbarOpen, setIsSearchbarOpen] = useState<boolean>(false);

  const handleClickOnSearch = (): void => {
    setIsSearchbarOpen(true);
  };

  return (
    <div className="menubar-container">
      <div className="dishes-container">
        <NavLink to="menu/coffee">Coffee</NavLink>
        <NavLink to="menu/breakfasts">Breakfasts</NavLink>
        <NavLink to="menu/maindishes">Main dishes</NavLink>
        <NavLink to="menu/soups">Soups</NavLink>
        <NavLink to="menu/bowls">Bowls</NavLink>
        <NavLink to="menu/crepes">Crepe with fillings</NavLink>
        <NavLink to="menu/wafflesandwiches">Waffle sandwiches</NavLink>
        <NavLink to="menu/waffleburgers">Waffle burgers</NavLink>
        <NavLink to="menu/sweetwaffles">Sweet waffles</NavLink>
        <NavLink to="menu/croissants">Croissants</NavLink>
        <NavLink to="menu/salads">Salads</NavLink>
        <NavLink to="menu/sidedishes">Side dishes</NavLink>
        <NavLink to="menu/georgian dishes">Georgian dishes</NavLink>
        <NavLink to="menu/tea">Tea</NavLink>
        <NavLink to="menu/desserts">Desserts</NavLink>
      </div>
      {/* {isSearchbarOpen && <input type="search" />} */}
      <div className="menubar-btns">
        {isSearchbarOpen ? (
          <input type="search" />
        ) : (
          <button
            className="search-btn menubar-btn"
            onClick={handleClickOnSearch}
          >
            <span className="material-symbols-outlined">search</span>
          </button>
        )}
        {/* <button className="search-btn menubar-btn">
          <span className="material-symbols-outlined">search</span>
        </button> */}
        <button className="cart-btn menubar-btn">
          <span className="material-symbols-outlined">shopping_cart</span>
          <p>3</p>
        </button>
      </div>
    </div>
  );
};

export default Menubar;
