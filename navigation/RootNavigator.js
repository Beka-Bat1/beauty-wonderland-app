import React, {useState, useEffect, useRef} from 'react';

import {
   DrawerActions,
   useNavigation,
   StackActions,
} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {Platform} from 'react-native';
import {useDispatch} from 'react-redux';

import AuthNavigator from './AuthNavigator';
import LeftDrawer from './LeftDrawer';
import Modal from '../screens/Modal';
import Loading from '../screens/Loading';

import HeaderRight from './HeaderIcons/HeaderRight';
import HeaderLeft from './HeaderIcons/HeaderLeft';

import ShopScreen from '../screens/ShopScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

import Colors from '../constants/Colors';

const RootStack = createStackNavigator();
export default () => {
   return (
      <RootStack.Navigator
         mode="modal"
         initialRouteName="LoadingScreen"
         screenOptions={({navigation, route}) => ({
            headerStyle: {
               backgroundColor: Platform.OS === 'android' ? Colors.black : '',
            },
            headerTintColor:
               Platform.OS === 'android' ? Colors.white : Colors.black,

            headerRight: (props) => (
               <HeaderRight
                  {...props}
                  onOpenCart={() => navigation.push('CartScreen')}
                  color={Colors.white}
               />
            ),
            headerTitle: 'Shopy Shop',
         })}>
         <RootStack.Screen
            name="LoadingScreen"
            component={Loading}
            mode="modal"
            options={{headerShown: false}}
         />

         <RootStack.Screen
            name="AuthNavigator"
            component={AuthNavigator}
            options={{headerShown: false}}
         />

         <RootStack.Screen
            name="LeftDrawer"
            component={LeftDrawer}
            options={({navigation}) => ({
               headerLeft: (props) => (
                  <HeaderLeft
                     {...props}
                     onOpenMenu={() =>
                        navigation.dispatch(DrawerActions.toggleDrawer())
                     }
                  />
               ),
            })}
         />

         <RootStack.Screen
            name="Modal"
            component={Modal}
            options={{animationEnabled: true}}
         />

         <RootStack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
            options={({navigation, route}) => ({
               headerRight: (props) => (
                  <HeaderRight
                     {...props}
                     onOpenCart={() => navigation.navigate('CartScreen')}
                  />
               ),
               headerTitle: 'Shopy Shop',
               headerTitleStyle: {alignSelf: 'center'},
            })}
         />

         <RootStack.Screen
            name="OrdersScreen"
            component={OrdersScreen}
            options={({navigation, route}) => ({
               headerTitle: 'Orders',
               headerTitleStyle: {alignSelf: 'center'},
            })}
         />

         <RootStack.Screen
            name="CartScreen"
            component={CartScreen}
            options={(props) => ({
               headerTitle: 'Cart',
               headerTitleStyle: {alignSelf: 'center'},
               headerRight: null,
            })}
         />

         <RootStack.Screen
            name="UserProducts"
            component={UserProductsScreen}
            options={({navigation, route}) => ({
               headerRight: (props) => (
                  <HeaderRight
                     {...props}
                     onOpenCart={() => navigation.navigate('CartScreen')}
                  />
               ),
               headerTitle: 'Shopy Shop',
               headerTitleStyle: {alignSelf: 'center'},
            })}
         />

         <RootStack.Screen
            name="EditProduct"
            component={EditProductScreen}
            options={{
               headerTitleStyle: {alignSelf: 'center'},
            }}
         />
      </RootStack.Navigator>
   );
};
