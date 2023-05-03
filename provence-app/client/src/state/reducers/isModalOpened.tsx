import { IModalOpened } from '../../types';

const initialState: IModalOpened = {
  isOpened: false,
};

export const isModalOpenedReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'IS_OPENED':
      return { ...state, isOpened: !state.isOpened };
    default:
      return state;
  }
};
