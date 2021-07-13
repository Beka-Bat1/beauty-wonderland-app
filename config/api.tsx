import axios from 'axios';
import Constants from 'expo-constants';

const {apiRoot, token: authToken} = Constants.manifest.extra;

export const getAxios = (token = null) => {
   const options = {
      baseURL: apiRoot,
      headers: {
         'Content-Type': 'application/json',
         'User-Token': token,
      },
   };

   if (authToken) {
      options.headers?.Authorization = `Basic ${authToken}`;
   }

   let instance = axios.create(options);

   instance.interceptors.request.use(
      (request) => {
         return request;
      },
      (error) => {
         console.log('[api]', error);
         return Promise.reject(error);
      },
   );

   instance.interceptors.response.use((response) => {
      return response;
   });

   return instance;
};
