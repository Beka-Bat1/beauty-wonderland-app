import {compose, combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import productsReducer from './reducers/products';
import ordersReducer from './reducers/orders';
import cartReducer from './reducers/cart';
import authReducer from './reducers/auth';

export interface RootState {
   toFixed(arg0: number);
   products: Object;
   cart: Object;
   orders: Object;
   auth: Object;
}

const rootReducer = combineReducers<RootState>({
   products: productsReducer,
   cart: cartReducer,
   orders: ordersReducer,
   auth: authReducer,
});



const middleware = [thunk];


const composeEnhancers =
   window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(...middleware)),
);

export default store;
