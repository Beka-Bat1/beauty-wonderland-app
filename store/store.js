import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import productsReducer from "./reducers/products";
import ordersReducer from "./reducers/orders";
import cartReducer from "./reducers/cart";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
