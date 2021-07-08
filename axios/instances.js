import qs from 'qs';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authInstance = axios.create({
   baseURL:
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMCH-brUV4-ltdKG3MYL0u7whCLp-p7Dc',
   timeout: 10000,
   method: 'POST',
   headers: {
      'Content-Type': 'application/json',
   },
   timeout: 5000,
});

// authInstance.interceptors.request.use(
//    async (config) => {
//       const userData = await AsyncStorage.getItem('userData');
//       const transformedData = JSON.parse(userData);
//       const {token, userId, expiryDate} = transformedData;
//       console.log(transformedData, 'transformedData');
//    },
//    (error) => {
//       return Promise.reject(error);
//    },
// );
