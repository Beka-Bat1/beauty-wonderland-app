import Product from '../../models/product';

import {firebase} from '../../firebase/config';
// import {database} from '../../firebase/config';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
   console.log('fetching products .... ==============');

   return async (dispatch, getState) => {
      // read code TODO
      const userId = getState().auth.userId;

      // try {
      //    const response = await fetch(
      //       'https://beauty-wonderland-e913c-default-rtdb.firebaseio.com/products.json',
      //    );

      //    if (!response.ok) {
      //       throw new Error('Something went wrong!');
      //    }

      //    const resData = await response.json();

      const loadedProducts = [];
      await firebase
         .database()
         .ref('/products')
         .get()
         .then((snapshot) => {
            if (snapshot.exists()) {
               console.log(snapshot.val());
               console.log(
                  'we need products data with keys here from snapshot.val() or otherwise',
               );

               let resData = snapshot.val();

               for (const key in resData) {
                  loadedProducts.push(
                     new Product(
                        key,
                        resData[key].ownerId,
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price,
                        resData[key].tag,
                     ),
                  );
               }
            } else {
               console.log('No data available');
            }
         })
         .catch((err) => console.error(err));
      dispatch({
         type: SET_PRODUCTS,
         payload: {
            availableProducts: loadedProducts,
            userProducts: loadedProducts.filter(
               (prod) => prod.ownerId === userId,
            ),
         },
      });
   };
};

export const deleteProduct = (productId) => {
   return async (dispatch, getState) => {
      const token = getState().auth.token;

      // const response = await fetch(
      //    `https://beauty-wonderland-e913c-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      //    {
      //       method: 'DELETE',
      //    },
      // );

      // if (!response.ok) {
      //    throw new Error('Something went wrong!');
      // }

      firebase.database().ref(`/products/${productId}`).remove();

      dispatch({type: DELETE_PRODUCT, pid: productId});
   };
};

export const createProduct = (title, description, imageUrl, price, tag) => {
   return async (dispatch, getState) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;

      // const response = await fetch(
      //    `https://beauty-wonderland-e913c-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      //    {
      //       method: 'POST',
      //       headers: {
      //          'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({
      //          title,
      //          description,
      //          imageUrl,
      //          price,
      //          tag,
      //          ownerId: userId,
      //       }),
      //    },
      // );

      // const resData = await response.json();

      console.group(
         {
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
            tag: tag,
         },
         'creating product ...',
      );

      const productId = '_' + Math.random().toString(36).substr(2, 9);

      firebase
         .database()
         .ref(`/products/${productId}`)
         .set({
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
            tag: tag,
            ownerId: userId,
         })
         .then((snapshot) => {
            console.log(snapshot.val(), 'response of create new product');
            dispatch({
               type: CREATE_PRODUCT,
               productData: {
                  id: snapshot.val().key, // product id
                  title,
                  description,
                  imageUrl,
                  price,
                  ownerId: userId,
                  tag,
               },
            });
         })
         .catch((err) => console.error(err));
   };
};

export const updateProduct = (prodId, title, description, imageUrl, tag) => {
   return async (dispatch, getState) => {
      const token = getState().auth.token;

      // const response = await fetch(
      //    `https://beauty-wonderland-e913c-default-rtdb.firebaseio.com/products/${prodId}.json?auth=${token}`,
      //    {
      //       method: 'PATCH',
      //       headers: {
      //          'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({
      //          title,
      //          description,
      //          imageUrl,
      //          tag,
      //       }),
      //    },
      // );

      // if (!response.ok) {
      //    throw new Error('Something went wrong!');
      // }

      const dataToUpdate = {
         prodId: prodId,
         title: title,
         description: description,
         imageUrl: imageUrl,
         tag: tag,
      };
      const updates = {};
      updates[`/products/${prodId}`] = dataToUpdate;
      firebase
         .database()
         .ref(`/products/${prodId}`)
         .update(updates)
         .then((response) =>
            console.log(response, 'realtime database product update'),
         )
         .catch((err) => console.error(err));

      dispatch({
         type: UPDATE_PRODUCT,
         payload: {
            pid: prodId,
            productData: {
               title,
               description,
               imageUrl,
               tag,
            },
         },
      });
   };
};
