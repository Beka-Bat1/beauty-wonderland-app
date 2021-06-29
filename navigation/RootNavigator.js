import React, {useState, useEffect} from 'react';

import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {Platform} from 'react-native';

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

import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'

import Colors from '../constants/Colors'

const RootStack = createStackNavigator();
export default () => {
   const isAuth = useSelector((rootReducer) => rootReducer.auth.isAuth);
   
   return (
      <NavigationContainer >
         <RootStack.Navigator
            mode="modal"
            screenOptions={({navigation, route}) => ({
               headerStyle: {
                  backgroundColor: Platform.OS === 'android' ? Colors.gray1 : '',
               },
               headerTintColor: Platform.OS === 'android' ? 'white' : 'black',
               
               headerRight: (props) => (
                  <HeaderRight
                     {...props}
                     onOpenCart={() => navigation.push('CartScreen')}
                  />
               ),
               headerTitle: 'Shopy Shop',
            })}
            initialRouteName="AuthNavigator"
            >
            
            {!isAuth && (
               <RootStack.Screen
                  name="AuthNavigator"
                  component={AuthNavigator}
                  options={{ headerShown: false }}
               />
            )}
            
               <RootStack.Screen name="LeftDrawer" component={LeftDrawer} options={({navigation}) => ({
                  headerLeft: (props) => (
                  <HeaderLeft
                     {...props}
                     
                     onOpenMenu={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                  />
               )
               })} />


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
                  headerLeft: (props) => (
                     <HeaderLeft
                        {...props}
                        onOpenMenu={() => navigation.toggleDrawer()}
                     />
                  ),
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

         </RootStack.Navigator>
      </NavigationContainer>
   );
};
