import axios from 'axios';
import AuthService from '../../services/authService';
import { IAllIdDishes, IDishCart } from '../../types';

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

export const getDefaultCart = (): any => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/alldishes`);
      const alldishes: IDishCart[] = response.data.alldishes;
      const allIdDishes: IAllIdDishes = {};
      alldishes.forEach((el) => {
        allIdDishes[el.id] = 0;
      });
      dispatch({
        type: 'GET_DEFAULT_CART',
        payload: allIdDishes,
      });
    } catch (error: any) {
      dispatch({
        type: 'GET_CART_ERROR',
        payload: error.message,
      });
    }
  };
};

export const getAllDishes = (): any => {
  return async (dispatch: any) => {
    try {
      const response = (await axios.get(`http://localhost:5000/api/alldishes`))
        .data.alldishes;
      dispatch({
        type: 'GET_ALL_DISHES',
        payload: response,
      });
    } catch (error: any) {
      dispatch({
        type: 'GET_DISHES_ERROR',
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

export const deleteFromCart = (dishId: string | undefined) => {
  return {
    type: 'DELETE_FROM_CART',
    payload: dishId,
  };
};
