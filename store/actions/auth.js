import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';
import axios from 'axios';
import {authInstance} from '../../axios/instances';

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
      // const response = await fetch(
      //    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMCH-brUV4-ltdKG3MYL0u7whCLp-p7Dc',
      //    {
      //       method: 'POST',
      //       headers: {
      //          'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({
      //          email: email,
      //          password: password,
      //          returnSecureToken: true,
      //       }),
      //    },
      // );

      const response = await authInstance
         .post(
            '',
            JSON.stringify({
               email: email,
               password: password,
               returnSecureToken: true,
            }),
         )
         .then((response) => {
            console.log('hello');

            console.log(response, 'axios response ');

            console.log(response.data, 'axios response data');

            console.log(response.status, 'axios response status');

            console.log(response.config, 'axios response config');
         })
         .catch((err) => console.log(err))
         .finally(() => console.log('finished fetching'));

      console.log(response, 'here <====');

      // const response = null;
      // if (!response.ok) {
      //    const errorResData = await response.json();
      //    const errorId = errorResData.error.message;
      //    let message = 'Something went wrong!';
      //    if (errorId === 'EMAIL_NOT_FOUND') {
      //       message = 'This email could not be found!';
      //    } else if (errorId === 'INVALID_PASSWORD') {
      //       message = 'This password is not valid!';
      //    }
      //    throw new Error(message);
      // }
      // const resData = await response.json();
      // dispatch(
      //    authenticate(
      //       resData.localId,
      //       resData.idToken,
      //       parseInt(resData.expiresIn) * 1000,
      //    ),
      // );

      // const expirationDate = new Date(
      //    new Date().getTime() + parseInt(resData.expiresIn) * 1000,
      // );

      // saveDataToStorage(resData.idToken, resData.localId, expirationDate);
   };
};

export const signOut = () => {
   clearLogoutTimer();
   try {
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
   } catch (err) {
      console.log(err.message);
      throw new Error(err);
   }
};
