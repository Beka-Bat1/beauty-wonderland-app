import React, {useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authActions from '../store/actions/auth';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export default () => {
   const dispatch = useDispatch();
   const navigation = useNavigation();

   useEffect(() => {
      const trySignup = async () => {
         console.log('before asyncStorage ');

         const userData = await AsyncStorage.getItem('userData');

         console.log(userData, 'after asyncStorage ');

         if (!userData) {
            navigation.navigate('AuthNavigator');
            return;
         }
         const transformedDAta = JSON.parse(userData);
         const {token, userId, expiryDate} = transformedData;
         const expirationDate = new Date(expiryDate);

         if (expirationDate <= new Date() || !token || !userId) {
            navigation.navigate('Auth');
            return;
         }
         navigation.navigate('LeftDrawer');
         dispatch(authActions.authenticate(userId, token));
      };

      trySignup();
   }, [dispatch]);

   return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <ActivityIndicator size="large" color="#f4a261" />
      </View>
   );
};
