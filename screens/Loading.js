import React, {useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authActions from '../store/actions/auth';
import {useDispatch} from 'react-redux';

export default () => {
   const dispatch = useDispatch();

   useEffect(() => {
      const trySignup = async () => {
         const userData = await AsyncStorage.getItem('userData');
         if (!userData) {
            props.navigation.navigate('AuthNavigator');
            return;
         }
         const transformedDAta = JSON.parse(userData);
         const {token, userId, expiryDate} = transformedData;
         const expirationDate = new Date(expiryDate);

         if (expirationDate <= new Date() || !token || !userId) {
            props.navigation.navigate('Auth');
            return;
         }
         props.navigation.navigate('LeftDrawer');
         dispatch(authActions.authenticate(userId, token));
      };
   }, [dispatch]);

   return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <ActivityIndicator size="large" color="#f4a261" />
      </View>
   );
};
