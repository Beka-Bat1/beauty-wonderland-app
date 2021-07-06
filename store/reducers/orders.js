import { ADD_ORDER, TOGGLE_LOADING, SET_TOTAL_ORDERS } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
  orders: [],
  isLoading: false,
  totalOrders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      console.log(action.payload, 'adding order ...');
      const newOrder = new Order(
        action.payload.id,
        action.payload.items,
        action.payload.amount,
        action.payload.date,
        action.payload.purchasedBy
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };

    case SET_TOTAL_ORDERS:
        return { ...state, totalOrders: state.totalOrders.concat(action.payload)}
    case TOGGLE_LOADING:
      return {
        ...state,
        isLoading: !isLoading
      }
  }

  return state;
};
