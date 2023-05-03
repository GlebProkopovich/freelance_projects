import { FC } from 'react';
import Menubar from '../../components/Menubar/Menubar';
import PostDish from '../../components/PostDish/PostDish';
import { PRODUCTS } from '../../PRODUCTS';
import imgChicken from '../../images/sandwichWithChicken.jpg';
import imgFeta from '../../images/sandwichWithFeta.jpg';
import imgHam from '../../images/sandwichWithHam.jpg';
import './Menupage.scss';

const Menupage: FC = () => {
  return (
    <>
      <Menubar />
      <div className="menupage-container">
        <h2>Waffle sandwiches</h2>
        <div className="postdish-list">
          {PRODUCTS.map((el) => {
            return (
              <PostDish
                key={el.id}
                imgSrc={imgFeta}
                altImg={el.altImg}
                title={el.title}
                price={el.price}
              />
            );
          })}
          {PRODUCTS.map((el) => {
            return (
              <PostDish
                key={el.id}
                imgSrc={imgHam}
                altImg={el.altImg}
                title={el.title}
                price={el.price}
              />
            );
          })}
          {PRODUCTS.map((el) => {
            return (
              <PostDish
                key={el.id}
                imgSrc={imgChicken}
                altImg={el.altImg}
                title={el.title}
                price={el.price}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Menupage;
