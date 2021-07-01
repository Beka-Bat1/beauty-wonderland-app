import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Provider} from 'react-redux';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {useFonts, Poppins_400Regular} from '@expo-google-fonts/poppins';
import ShopScreen from './screens/ShopScreen';

import store from './store/store';
import NavigationContainer from './navigation/Index';

export default function App() {
   const [fontsLoaded] = useFonts({Poppins_400Regular});
   const [error, setError] = useState('');

   if (!fontsLoaded) {
      <AppLoading
         onFinish={() => Alert.alert('Finished')}
         onError={(err) => Alert.alert(err)}
      />;
   }

   return (
      <Provider store={store}>
         <NavigationContainer />
      </Provider>
   );
}
