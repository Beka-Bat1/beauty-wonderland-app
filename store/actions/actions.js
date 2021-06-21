import * as actionTypes from "../actionTypes";

export const addNewProduct = (title, description, imageUrl, price) => {
  const newProduct = new Product(
    new Date().toString(),
    "u1",
    action.productData.title,
    action.productData.imageUrl,
    action.productData.description,
    action.productData.price
  );
  return {
    type: actionTypes.ADD_ITEM,
    payload: newProduct
  };
};

export const fetchItemData = (onSuccess = () => {}, onError = () => {}) => {
  return async (dispatch) => {
    try {
      const url = "http://makeup-api.herokuapp.com/api/v1/products";

      const response = await fetch(url);

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.message);
      }

      const resData = await response.json();
      dispatch({
        type: actionTypes.SAVE_ITEM_DATA,
        payload: resData,
      });
      onSuccess();
    } catch (err) {
      dispatch({
        type: actiontypes.SET_ERROR,
        payload: err,
      });

      onError();
    }
  };
};
