import {
   ADD_ORDER,
   TOGGLE_LOADING,
   SET_TOTAL_ORDERS,
   SET_ORDERS,
} from '../actions/orders';
import Order from '../../models/order';

const initialState = {
   orders: [],
   isLoading: false,
   totalOrders: [],
};

export default (state = initialState, action) => {
   switch (action.type) {
      case ADD_ORDER:
         const newOrder = new Order(
            action.payload.id,
            action.payload.items,
            action.payload.amount,
            action.payload.date,
            action.payload.purchasedBy,
            action.payload.orderId,
         );
         return {
            ...state,
            orders: state.orders.concat(newOrder),
         };
      case SET_TOTAL_ORDERS:
         return {
            ...state,
            totalOrders: action.payload
         };
      case SET_ORDERS:
         return {
            ...state,
            orders: action.payload,
         };
      case TOGGLE_LOADING:
         return {
            ...state,
            isLoading: !isLoading,
         };
   }

   return state;
};
