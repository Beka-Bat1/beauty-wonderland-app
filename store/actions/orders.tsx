import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const SET_TOTAL_ORDERS = 'SET_TOTAL_ORDERS';

import {firebase} from '../../firebase/config';

export const fetchOrders = () => {
   return async (dispatch, getState) => {
      const userId = getState().auth.userId;

      // try {
      //    const response = await fetch(
      //       `https://beauty-wonderland-e913c-default-rtdb.firebaseio.com/orders/${userId}.json`,
      //    );
      //    if (!response.ok) {
      //       throw new Error('Something went wrong!');
      //    }
      //    const resData = await response.json();
      //    const loadedOrders = [];

      //    for (const key in resData) {
      //       loadedOrders.push(
      //          new Order(
      //             key,
      //             resData[key].cartItems,
      //             resData[key].totalAmount,
      //             new Date(resData[key].date),
      //          ),
      //       );
      //    }
      //    dispatch({type: SET_ORDERS, payload: loadedOrders});
      // } catch (err) {
      //    console.log(err.message);
      // }

      firebase
         .database()
         .ref(`/orders/${userId}`)
         .get()
         .then((snapshot) => {
            console.log(
               snapshot,
               'get snpashot data of user orders with snapshot.val or something',
            );

            const loadedOrders = [];

            let resData = snapshot.val();

            for (const key in resData) {
               loadedOrders.push(
                  new Order(
                     key,
                     resData[key].cartItems,
                     resData[key].totalAmount,
                     new Date(resData[key].date),
                  ),
               );
            }
            dispatch({type: SET_ORDERS, payload: loadedOrders});
         })
         .catch((err) => console.error(err));
   };
};

export const fetchTotalOrders = () => {
   return async (dispatch) => {
      // TO ASK try catch VS then catch

      // try {
      // const response = await fetch(
      //    `https://beauty-wonderland-e913c-default-rtdb.firebaseio.com/orders.json`,
      //    {
      //       method: 'GET',
      //    },
      // );

      // if (!response.ok) {
      //    throw new Error('Something went wrong ... ');
      // }

      // const resData = await response.json();
      // const loadedOrders = [];

      // for (const userId in resData) {
      //    const userOrders = resData[userId];
      //    for (const orderKey in userOrders) {
      //       const order = userOrders[orderKey];
      //       loadedOrders.push(
      //          new Order(
      //             orderKey,
      //             order.cartItems,
      //             order.totalAmount,
      //             new Date(order.date),
      //             order.purchasedBy,
      //             order.orderId,
      //          ),
      //       );
      //    }
      // }
      // } catch (err) {
      //    console.log(err.message);
      // }

      const loadedOrders = [];

      await firebase
         .database()
         .ref('/orders')
         .get()
         .then((snapshot) => {
            console.log(snapshot.val(), 'snapshot of totalorders');

            let resData = snapshot.val();

            for (const userId in resData) {
               const userOrders = resData[userId];
               for (const orderKey in userOrders) {
                  const order = userOrders[orderKey];
                  loadedOrders.push(
                     new Order(
                        orderKey,
                        order.cartItems,
                        order.totalAmount,
                        new Date(order.date),
                        order.purchasedBy,
                        order.orderId,
                     ),
                  );
               }
            }
         });

      dispatch({type: SET_TOTAL_ORDERS, payload: loadedOrders});
   };
};

export const addOrder = (cartItems, totalAmount) => {
   return async (dispatch, getState) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      const date = new Date();
      const orderId = '_' + Math.random().toString(36).substr(2, 9);
      let firebaseKey: string;

      // const response = await fetch(
      //    `https://beauty-wonderland-e913c-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      //    {
      //       method: 'POST',
      //       headers: {
      //          'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({
      //          cartItems,
      //          totalAmount,
      //          date: date.toISOString().slice(0, 10),
      //          purchasedBy: userId,
      //          orderId: orderId,
      //       }),
      //    },
      // );

      // console.log(response, 'firebase order handler response');

      // if (!response.ok) {
      //    throw new Error('Something went wrong!' + response);
      // }

      // const resData = await response.json();

      firebase
         .database()
         .ref(`/orders/${userId}/${orderId}`)
         .set({
            cartItems,
            totalAmount,
            date: date.toISOString().slice(0, 10),
            purchasedBy: userId,
            orderId: orderId,
         });

      dispatch({
         type: ADD_ORDER,
         payload: {
            id: orderId,
            items: cartItems,
            amount: totalAmount,
            date: date,
            purchasedBy: userId,
            orderId: orderId,
         },
      });
      debugger;
   };
};
