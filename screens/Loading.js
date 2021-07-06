import React, {useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authActions from '../store/actions/auth';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export default () => {
   const dispatch = useDispatch();
   const {navigate} = useNavigation();

   useEffect(() => {
      const trySignup = async () => {
         try {
            const userData = await AsyncStorage.getItem('userData');

            if (!userData) {
               Alert.alert('No user Data, login or signup');
               navigate('AuthNavigator');
               return;
            }

            const transformedData = JSON.parse(userData);
            const {token, userId, expiryDate} = transformedData;
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
               Alert.alert('Timed out please Login');
               navigate('AuthNavigator');
               return;
            }

            const expirationTime =
               expirationDate.getTime() - new Date().getTime();
            dispatch(authActions.authenticate(userId, token, expirationTime));
            navigate('Modal');
         } catch (err) {
            console.log(err.message);
         }
      };

      trySignup();
   }, [dispatch]);

   return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <ActivityIndicator size="large" color="#f4a261" />
      </View>
   );
};
