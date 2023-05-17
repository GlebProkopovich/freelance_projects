import { useNavigate } from 'react-router-dom';
import {
  ChangeEvent,
  FC,
  FormEvent,
  useEffect,
  useState,
  FocusEvent,
} from 'react';
import './Cartpage.scss';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/CartItem/CartItem';
import emptyBook from '../../images/emptyBook.jpg';
import { actionCreators } from '../../state';
import axios from 'axios';

const Cartpage: FC = () => {
  const navigate = useNavigate();
  const allDishesId = useSelector((state: any) => state.cart.dishes);
  const allDishes = useSelector((state: any) => state.allDishes.dishes);
  const [nameValue, setNameValue] = useState<string>('');
  const [phoneValue, setPhoneValue] = useState<string>('');
  const [commentValue, setCommentValue] = useState<string>('');
  const [cityValue, setCityValue] = useState<string>('Batumi');
  const [methodOfPaymentValue, setMethodOfPaymentValue] = useState<string>(
    'Bank card (BoG, TBC, Russian bank card)'
  );
  const [locationProvenceValue, setLocationProvenceValue] = useState<string>(
    '3rd quarter of Digomi, 2 (Didi Dighomi, Dighomi, Didube)'
  );
  const [userAdressValue, setUserAdressValue] = useState<string>('');
  const [isNameFocused, setIsNameFocused] = useState<boolean>(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState<boolean>(false);
  const [isCommentFocused, setIsCommentFocused] = useState<boolean>(false);
  const [isUserAdressFocused, setIsUserAdressFocused] =
    useState<boolean>(false);
  const [nameError, setNameError] = useState<string>("Name can't be empty");
  const [userAdressError, setUserAdressError] = useState<string>(
    "Your adress can't be empty"
  );
  const [phoneError, setPhoneError] = useState<string>(
    "Phone number can't be empty"
  );

  const [nameValueDirty, setNameValueDirty] = useState<boolean>(false);
  const [phoneValueDirty, setPhoneValueDirty] = useState<boolean>(false);
  const [userAdressValueDirty, setUserAdressValueDirty] =
    useState<boolean>(false);

  let totalPrice = 0;

  const API_URL = 'http://localhost:5000/api';

  const dispatch = useDispatch();

  const { getAllDishes } = actionCreators;

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const makeTheOrder = async () => {
      try {
        console.log(
          nameValue,
          phoneValue,
          cityValue,
          locationProvenceValue,
          userAdressValue,
          methodOfPaymentValue,
          commentValue,
          orderedDishes,
          totalPrice
        );
        const response = await axios.post(`${API_URL}/order`, {
          nameValue,
          phoneValue,
          cityValue,
          locationProvenceValue,
          userAdressValue,
          methodOfPaymentValue,
          commentValue,
          orderedDishes,
          totalPrice,
        });
      } catch (error) {
        console.log(error);
      }
    };
    makeTheOrder();
  };

  const handleNameValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
    if (e.target.value.length === 0) {
      setNameError("Name can't be empty");
    } else if (e.target.value.length < 2) {
      setNameError("The length of the name can't be less than 2 symbols");
    } else {
      setNameError('');
    }
  };

  const handlePhoneValue = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(e.target.value);
    const re = /^(\+?995)?(79\d{7}|5\d{8})$/;
    if (e.target.value.length === 0) {
      setPhoneError("Phone number can't be empty");
    } else if (!re.test(e.target.value)) {
      setPhoneError('Incorrect phone number');
    } else {
      setPhoneError('');
    }
  };

  const handleCommentValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };

  const handleCityValue = (e: ChangeEvent<HTMLSelectElement>) => {
    setCityValue(e.target.value);
  };

  const handleMethodOfPaymentValue = (e: ChangeEvent<HTMLSelectElement>) => {
    setMethodOfPaymentValue(e.target.value);
  };

  const handleLocationProvenceValue = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocationProvenceValue(e.target.value);
  };

  const handleUserAdressValue = (e: ChangeEvent<HTMLInputElement>) => {
    setUserAdressValue(e.target.value);
    if (e.target.value.length === 0) {
      setUserAdressError("Your adress can't be empty");
    } else if (e.target.value.length < 7) {
      setUserAdressError("The length of the adress can't be so short");
    } else {
      setUserAdressError('');
    }
  };

  const handleOnBlurName = (): void => {
    nameValue ? setIsNameFocused(true) : setIsNameFocused(false);
  };

  const handleOnBlurPhone = (): void => {
    phoneValue ? setIsPhoneFocused(true) : setIsPhoneFocused(false);
  };

  const handleOnBlurComment = (): void => {
    phoneValue ? setIsCommentFocused(true) : setIsCommentFocused(false);
  };

  const handleOnBlurUserAdress = (): void => {
    userAdressValue
      ? setIsUserAdressFocused(true)
      : setIsUserAdressFocused(false);
  };

  const isDishesInCart = (allDishesId: any) => {
    let dishesInCart = [];
    for (let key in allDishesId) {
      allDishesId[key] > 0 && dishesInCart.push(key);
    }
    return dishesInCart.length > 0 ? true : false;
  };

  const handleOnBlurValidation = (e: FocusEvent<HTMLInputElement>): void => {
    switch (e.target.name) {
      case 'name':
        setNameValueDirty(true);
        break;
      case 'phone':
        setPhoneValueDirty(true);
        break;
      case 'adress':
        setUserAdressValueDirty(true);
        break;
    }
  };

  useEffect(() => {
    dispatch(getAllDishes());
  }, []);

  let orderedDishes: any = [];
  // console.log(orderedDishes);

  return (
    <div className="cartpage-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <span className="material-symbols-outlined">arrow_back_ios</span>
        <p>back</p>
      </button>
      <h2 className="headline">
        My cart {!isDishesInCart(allDishesId) && `is empty...`}
      </h2>
      <h3 className="headline headline-action">
        Make an order on more than 50 GEL - <span>get free delivery!</span>
      </h3>
      <h4 className="headline">
        Our operator will make you a call in 3 minutes to specify the details
      </h4>
      {isDishesInCart(allDishesId) ? (
        <>
          {allDishes.length &&
            allDishes?.map((el: any, idx: number) => {
              if (allDishesId[el.id] !== 0) {
                let priceOfTheDish =
                  Number(el.price.split(' ')[0]) * allDishesId[el.id];
                totalPrice += priceOfTheDish;
                orderedDishes.push({
                  title: el.title,
                  price: el.price,
                  quantity: allDishesId[el.id],
                });
                return (
                  <CartItem
                    key={el.id}
                    id={el.id}
                    imgSrc={el.imgSrc}
                    altImg={el.altImg}
                    title={el.title}
                    price={el.price}
                  />
                );
              }
            })}
          <form onSubmit={handleSubmitForm}>
            <div className="inputs-container">
              <div className="input">
                <label
                  htmlFor="name"
                  className={`${
                    (isNameFocused || nameValue) && 'label-focused'
                  }`}
                >
                  name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={nameValue}
                  onChange={handleNameValue}
                  onFocus={() => setIsNameFocused(true)}
                  onBlur={(e) => {
                    handleOnBlurValidation(e);
                    handleOnBlurName();
                  }}
                />
                {nameValueDirty && nameError && (
                  <div className="error">{nameError}</div>
                )}
              </div>
              <div className="input">
                <label
                  htmlFor="phone"
                  className={`${
                    (isPhoneFocused || phoneValue) && 'label-focused'
                  }`}
                >
                  phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={phoneValue}
                  onChange={handlePhoneValue}
                  onFocus={() => setIsPhoneFocused(true)}
                  onBlur={(e) => {
                    handleOnBlurValidation(e);
                    handleOnBlurPhone();
                  }}
                />
                {phoneValueDirty && phoneError && (
                  <div className="error">{phoneError}</div>
                )}
              </div>
              <div className="cities-container select-container">
                <p className="additionalInfo">
                  Choose the city where you are located
                </p>
                <select
                  className="select"
                  value={cityValue}
                  onChange={handleCityValue}
                >
                  <option>Batumi</option>
                  <option>Tbilisi</option>
                </select>
              </div>
              {cityValue === 'Tbilisi' && (
                <div className="adresses-container select-container">
                  <p className="additionalInfo">
                    Choose the adress, which closier to your home
                  </p>
                  <select
                    className="select"
                    value={locationProvenceValue}
                    onChange={handleLocationProvenceValue}
                  >
                    <option>
                      3rd quarter of Digomi, 2 (Didi Dighomi, Dighomi, Didube)
                    </option>
                    <option>Platona Ioseliani, 37 (Saburtalo)</option>
                  </select>
                </div>
              )}
              <div className="input">
                <label
                  htmlFor="adress"
                  className={`${
                    (isUserAdressFocused || userAdressValue) && 'label-focused'
                  }`}
                >
                  your adress
                </label>
                <input
                  id="adress"
                  type="text"
                  name="adress"
                  value={userAdressValue}
                  onChange={handleUserAdressValue}
                  onFocus={() => setIsUserAdressFocused(true)}
                  onBlur={(e) => {
                    handleOnBlurValidation(e);
                    handleOnBlurUserAdress();
                  }}
                />
                {userAdressValueDirty && userAdressError && (
                  <div className="error">{userAdressError}</div>
                )}
              </div>
              <div className="payment-container select-container">
                <p className="additionalInfo">Choose the method of payment</p>
                <select
                  className="select"
                  value={methodOfPaymentValue}
                  onChange={handleMethodOfPaymentValue}
                >
                  <option>Bank card (BoG, TBC, Russian bank card)</option>
                </select>
              </div>
              <div className="input">
                <label
                  htmlFor="comment"
                  className={`${
                    (isCommentFocused || commentValue) && 'label-focused'
                  }`}
                >
                  comment
                </label>
                <input
                  id="comment"
                  type="text"
                  value={commentValue}
                  onChange={handleCommentValue}
                  onFocus={() => setIsCommentFocused(true)}
                  onBlur={handleOnBlurComment}
                />
              </div>
              <button>
                Make the order
                <span>{`${totalPrice} ₾`}</span>
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="img">
          <img src={emptyBook} alt="Crying cat..." />
        </div>
      )}
    </div>
  );
};

export default Cartpage;
