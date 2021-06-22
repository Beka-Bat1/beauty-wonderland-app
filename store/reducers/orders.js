import { ADD_ORDER, TOGGLE_LOADING } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
  orders: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };

    case TOGGLE_LOADING:
      return {
        ...state,
        isLoading: !isLoading
      }
  }

  return state;
};
