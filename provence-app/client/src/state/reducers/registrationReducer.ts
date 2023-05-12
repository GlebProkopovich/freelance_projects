import { IAuthUser } from '../../types';

const initialState: IAuthUser = {
  user: {
    email: null,
    isActivated: false,
    id: null,
  },
  isAuth: false,
  error: null,
};

const registrationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'REGISTRATION_SUCCESS':
      return {
        ...state,
        ...state.user,
        user: action.payload,
        isAuth: true,
        error: null,
      };
    case 'REGISTRATION_ERROR':
      return {
        ...state,
        ...state.user,
        isAuth: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default registrationReducer;
