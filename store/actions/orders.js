export const ADD_ORDER = 'ADD_ORDER';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';

export const addOrder = (cartItems, totalAmount, onSuccess = () => {}, onError = () => {} ) => {
  setTimeout(() => {
          onSuccess()
    }, 2000);

    
  return {
    type: ADD_ORDER,
    orderData: { items: cartItems, amount: totalAmount }
  };
    
};
