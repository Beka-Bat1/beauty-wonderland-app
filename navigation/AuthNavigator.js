import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import SignInScreen from '../screens/user/SignInScreen';
import SignUpScreen from '../screens/user/SignUpScreen';

const Stack = createStackNavigator();
const AuthNavigator = () => {
   return (
      <Stack.Navigator
         screenOptions={{headerShown: false}}
         initialRouteName="SignIn">
         <Stack.Screen name="SignIn" component={SignInScreen} />
         <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
   );
};

export default AuthNavigator;
