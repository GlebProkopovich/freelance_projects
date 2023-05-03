import React, { FC, useState } from 'react';
import './Menubar.scss';
import { NavLink } from 'react-router-dom';

const Menubar: FC = () => {
  const [isSearchbarOpen, setIsSearchbarOpen] = useState<boolean>(false);

  const handleClickSearchbar = (): void => {
    setIsSearchbarOpen(!isSearchbarOpen);
  };

  return (
    <div className="menubar-container">
      <div className="menubar-subcontainer">
        <div className="dishes-container">
          <NavLink to="coffee">Coffee</NavLink>
          <NavLink to="breakfasts">Breakfasts</NavLink>
          <NavLink to="maindishes">Main dishes</NavLink>
          <NavLink to="soups">Soups</NavLink>
          <NavLink to="bowls">Bowls</NavLink>
          <NavLink to="crepes">Crepe with fillings</NavLink>
          <NavLink to="wafflesandwiches">Waffle sandwiches</NavLink>
          <NavLink to="waffleburgers">Waffle burgers</NavLink>
          <NavLink to="sweetwaffles">Sweet waffles</NavLink>
          <NavLink to="croissants">Croissants</NavLink>
          <NavLink to="salads">Salads</NavLink>
          <NavLink to="sidedishes">Side dishes</NavLink>
          <NavLink to="georgian dishes">Georgian dishes</NavLink>
          <NavLink to="tea">Tea</NavLink>
          <NavLink to="desserts">Desserts</NavLink>
        </div>
        <div className="menubar-btns">
          {isSearchbarOpen ? (
            <div className="searchbar">
              <span className="material-symbols-outlined search-icon">
                search
              </span>
              <input type="search" placeholder="Write a dish..." />
              <button onClick={handleClickSearchbar}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          ) : (
            <button
              className="search-btn menubar-btn"
              onClick={handleClickSearchbar}
            >
              <span className="material-symbols-outlined">search</span>
            </button>
          )}
          <button className="cart-btn menubar-btn">
            <span className="material-symbols-outlined">shopping_cart</span>
            <p>3</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menubar;
