import axios from 'axios';
import AuthService from '../../services/authService';
import { IDish } from '../../types';

export const setLoginOpened = () => ({
  type: 'IS_LOGIN_OPENED',
});

export const setRegistrationOpened = () => ({
  type: 'IS_REGISTRATION_OPENED',
});

export const loginUser = (email: string, password: string): any => {
  return async (dispatch: any) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error.message,
      });
    }
  };
};

export const registrationUser = (
  name: string,
  number: string,
  email: string,
  password: string
): any => {
  return async (dispatch: any) => {
    try {
      const response = await AuthService.registration(
        name,
        number,
        email,
        password
      );
      localStorage.setItem('token', response.data.accessToken);
      dispatch({
        type: 'REGISTRATION_SUCCESS',
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: 'REGISTRATION_ERROR',
        payload: error.message,
      });
    }
  };
};

export const getDishes = (
  dishUrl: string,
  page: number,
  searchValue: string
): any => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/${dishUrl}?page=${page}&search=${searchValue}`
      );
      const dishes = response.data[dishUrl];
      const responseAllInfo = {
        dishes,
        error: response.data.error,
        limit: response.data.limit,
        page: response.data.page,
        total: response.data.total,
      };
      dispatch({
        type: 'GETDISHES_SUCCESS',
        payload: responseAllInfo,
      });
    } catch (error: any) {
      dispatch({
        type: 'GETDISHES_ERROR',
        payload: error.message,
      });
    }
  };
};

export const getValueSearchInput = (e: string) => ({
  type: 'SEARCH_VALUE',
  payload: e,
});

export const clearSearchInput = () => ({
  type: 'SEARCH_CLEAR',
});

// export const getDefaultCart = (dishesData: IDish[]) => {
//   let cart: any = {};
//   dishesData.forEach((el) => {
//     cart[el._id] = 0;
//   });
//   return {
//     type: 'GET_DEFAULT_CART',
//     payload: cart,
//   };
// };

export const getDefaultCart = (): any => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/alldishes`);
      const alldishes = response.data.alldishes;
      dispatch({
        type: 'GET_DEFAULT_CART',
        payload: alldishes,
      });
    } catch (error: any) {
      dispatch({
        type: 'GET_CART_ERROR',
        payload: error.message,
      });
    }
  };
};

export const addToCart = (dishId: string | undefined) => {
  return {
    type: 'ADD_TO_CART',
    payload: dishId,
  };
};
