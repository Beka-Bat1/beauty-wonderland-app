import qs from 'qs';
import {getAxios} from '../config/interceptors/api';
import {
   AUTH_USER_CREDENTIALS_KEY,
   AUTH_USER_DATA_KEY,
   AUTH_USER_TOKEN_KEY,
} from '../constants/storage';
import {saveToSecureStorage, saveToStorage} from '../store/utils';

export const authenticate = async (authData, currToken) => {
   const response = await getAxios(currToken).get(
      `auth/?${qs.stringify(authData)}`,
   );

   const {data} = response;

   if (data.code === '200') {
      const {token, ...user} = data.entity;
      await saveToSecureStorage(AUTH_USER_CREDENTIALS_KEY, {
         password: user.password,
         username: user.username,
      });
      await saveToStorage(AUTH_USER_TOKEN_KEY, token);
   }

   return {success: data.code === '200', content: data.entity};
};

export const register = async (authData) => {
   const registerParams = {
      nome: authData.firstname,
      cognome: authData.lastname,
      email: authData.email,
      password: authData.password,
      tipo: 0,
      nl: authData.receiveNewsletters,
      privacy: authData.acceptTerms,
   };
   const response = await getAxios().post('auth/register', null, {
      params: registerParams,
   });

   const {data} = response;

   if (data.code === '200') {
      const {token, ...user} = data.entity;
      await saveToSecureStorage(AUTH_USER_CREDENTIALS_KEY, {
         password: authData.password,
         username: user.username,
      });
      await saveToSecureStorage(
         AUTH_CONFIGURATION_KEY,
         authData.localAuthConfig,
      );
      await saveToStorage(AUTH_USER_TOKEN_KEY, token);
      await saveToStorage(AUTH_USER_DATA_KEY, {
         firstName: authData.firstname,
      });
   }

   return {success: data.code === '200', content: data.entity};
};
