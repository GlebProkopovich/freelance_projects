const initialState: any = {
  dishes: {},
};

export const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'GET_DEFAULT_CART':
      return {
        ...state,
        dishes: {
          ...state.dishes,
          ...action.payload,
        },
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        dishes: {
          ...state.dishes,
          [action.payload]: state.dishes[action.payload] + 1,
        },
      };
    default:
      return state;
  }
};
