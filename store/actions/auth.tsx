import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';
import axios from 'axios';
import {authInstance} from '../../axios/instances';
import {firebase} from '../../firebase/config';
import {Alert} from 'react-native';
import {Group} from 'react-native';

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
      // const response = await fetch(
      //    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMCH-brUV4-ltdKG3MYL0u7whCLp-p7Dc',
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

      // if (!response.ok) {
      //    const errorResData = await response.json();
      //    const errorId = errorResData.error.message;
      //    let message = 'Something went wrong!';
      //    if (errorId === 'EMAIL_EXISTS') {
      //       message = 'This email exists already!';
      //    }
      //    throw new Error(message);
      // }

      // const resData = await response.json();

      firebase
         .auth()
         .createUserWithEmailAndPassword(email, password)
         .then((response) => {
            let userId = response.user.uid;
            let authToken = response.user.refreshToken;
            let expSeconds = response.user?.u.f;
            dispatch(
               authenticate(userId, authToken, parseInt(expSeconds) * 1000),
            );
            const expirationDate = new Date(
               new Date().getTime() + parseInt(expSeconds) * 1000,
            );
            saveDataToStorage(authToken, userId, expirationDate);
         })
         .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
               alert('The password is too weak.');
            } else {
               alert(errorMessage);
            }
            console.log(error);
         });
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

      firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then((response) => {
            let userId = response.user.uid;
            let authToken = response.user.refreshToken;
            let expSeconds = response.user?.u.f;
            dispatch(
               authenticate(userId, authToken, parseInt(expSeconds) * 1000),
            );

            const expirationDate = new Date(
               new Date().getTime() + parseInt(expSeconds) * 1000,
            );

            saveDataToStorage(authToken, userId, expirationDate);
         })
         .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
               Alert.alert('Wrong password.');
               console.warn('Wrong password');
            } else {
               Alert.alert(errorMessage);
               console.error(errorMessage);
            }
            console.error(error);
         });
   };
};

export const signOut = () => {
   clearLogoutTimer();
   try {
      AsyncStorage.removeItem('userData');
      firebase
         .auth()
         .signOut()
         .then((snapshot) => console.log(snapshot))
         .catch((err) => console.error(err));
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
