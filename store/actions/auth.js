import AsyncStorage from '@react-native-async-storage/async-storage';
export const SIGNUP = 'SIGNUP';
export const SIGNOUT = 'SIGNOUT';
export const AUTHENTICATE = 'AUTHENTICATE';

let timer;

export const authenticate = (userId, token, expiryTime) => {
   return (dispatch) => {
      dispatch({type: AUTHENTICATE, payload: {userId: userId, token: token}});
      dispatch(setLogoutTimer(expiryTime));
   };
};

export const signUp = (email, password) => {
   return async (dispatch) => {
      const response = await fetch(
         'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMCH-brUV4-ltdKG3MYL0u7whCLp-p7Dc',
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               email: email,
               password: password,
               returnSecureToken: true,
            }),
         },
      );

      if (!response.ok) {
         const errorResData = await response.json();
         const errorId = errorResData.error.message;
         let message = 'Something went wrong!';
         if (errorId === 'EMAIL_EXISTS') {
            message = 'This email exists already!';
         }
         throw new Error(message);
      }

      const resData = await response.json();
      console.log(resData);
      dispatch(
         authenticate(
            resData.localId,
            resData.idToken,
            parseInt(resData.expiresIn) * 1000,
         ),
      );
      const expirationDate = new Date(
         new Date().getTime() + parseInt(resData.expiresIn) * 1000,
      );
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
   };
};

export const signIn = (email, password) => {
   return async (dispatch) => {
      const response = await fetch(
         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMCH-brUV4-ltdKG3MYL0u7whCLp-p7Dc',
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               email: email,
               password: password,
               returnSecureToken: true,
            }),
         },
      );

      if (!response.ok) {
         const errorResData = await response.json();
         const errorId = errorResData.error.message;
         let message = 'Something went wrong!';
         if (errorId === 'EMAIL_NOT_FOUND') {
            message = 'This email could not be found!';
         } else if (errorId === 'INVALID_PASSWORD') {
            message = 'This password is not valid!';
         }
         throw new Error(message);
      }
      const resData = await response.json();
      dispatch(
         authenticate(
            resData.localId,
            resData.idToken,
            parseInt(resData.expiresIn) * 1000,
         ),
      );

      const expirationDate = new Date(
         new Date().getTime() + parseInt(resData.expiresIn) * 1000,
      );

      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
   };
};

export const signOut = () => {
   clearLogoutTimer();
   try {
      console.log('remove Item');
      AsyncStorage.removeItem('userData');
   } catch (err) {
      console.log(err.message);
   }
   return {type: SIGNOUT};
};

const clearLogoutTimer = () => {
   if (timer) {
      clearTimeout(timer);
   }
};

const setLogoutTimer = (expirationTime) => {
   return (dispatch) => {
      timer = setTimeout(() => {
         dispatch(signOut());
      }, expirationTime);
   };
};

const saveDataToStorage = async (token, userId, expirationDate) => {
   try {
      const response = await AsyncStorage.setItem(
         'userData',
         JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString(),
         }),
      );
      console.log(response, 'async setItem storage response');
   } catch (err) {
      console.log(err.message);
      throw new Error(err);
   }
};
