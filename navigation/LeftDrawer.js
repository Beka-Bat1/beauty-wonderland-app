import React from 'react';
import {creaShopScreenackNavigator} from '@react-navigation/stack';
import { TouchableOpacity, TouchableNativeFeedback, View, Text } from 'react-native'
import {
   createDrawerNavigator,
   DrawerContentScrollView,
   DrawerItemList,
   DrawerItem,
} from '@react-navigation/drawer';

import {Entypo} from '@expo/vector-icons';

import ShopScreen from '../screens/ShopScreen';
import Cart from '../screens/CartScreen';
import Orders from '../screens/OrdersScreen';

import CustomDrawerContent from './CustomDrawerContent'


const Drawer = createDrawerNavigator();
const LeftDrawer = () => (
   <Drawer.Navigator
      mode="modal"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{paddingVertical: '15%'}}
      drawerContentOptions={{
         drawerIcon: (size, color, focused) => (
            <Entypo name="chevron-thin-right" size={size} color={color} />
         ),
      }}
      screenOptions={({navigation}) => ({
         
      })}>

      <Drawer.Screen
         name="Home"
         component={ShopScreen}
         options={{
            drawerLabel: 'მთავარი',
            drawerIcon: (focused, color, size) => (
               <Entypo
                  name="chevron-thin-right"
                  size={size}
                  color={color}
                  style={{position: 'absolute', right: 15}}
               />
            ),
         }}
      />

      <Drawer.Screen
         name="Brands"
         component={ShopScreen}
         initialParams={{params: 'Brands'}}
         options={{
            drawerLabel: 'ბრენდები',
            drawerIcon: (focused, size, color) => (
               <Entypo
                  name="chevron-thin-right"
                  size={size}
                  color={color}
                  style={{position: 'absolute', right: 15}}
               />
            ),
         }}
      />

      <Drawer.Screen
         name="Face"
         component={ShopScreen}
         initialParams={{params: 'Face'}}
         options={{
            drawerLabel: 'სახის მოვლა',
            drawerIcon: (focused, size, color) => (
               <Entypo
                  name="chevron-thin-right"
                  size={size}
                  color={color}
                  style={{position: 'absolute', right: 15}}
               />
            ),
         }}
      />

      <Drawer.Screen
         name="Cosmetics"
         initialParams={{params: 'Cosmetics'}}
         component={ShopScreen}
         options={{
            drawerLabel: 'კოსმეტიკა',

            drawerIcon: (focused, size, color) => (
               <Entypo
                  name="chevron-thin-right"
                  size={size}
                  color={color}
                  style={{position: 'absolute', right: 15}}
               />
            ),
         }}
      />

      <Drawer.Screen
         name="Body"
         initialParams={{params: 'Body'}}
         component={ShopScreen}
         options={{
            drawerLabel: 'აქსესუარები',
            drawerIcon: (focused, size, color) => (
               <Entypo
                  name="chevron-thin-right"
                  size={size}
                  color={color}
                  style={{position: 'absolute', right: 15}}
               />
            ),
         }}
      />

      <Drawer.Screen
         name="Hear"
         initialParams={{params: 'Hear'}}
         component={ShopScreen}
         options={{
            drawerLabel: 'თმის მოვლა',
            drawerIcon: (focused, size, color) => (
               <Entypo
                  name="chevron-thin-right"
                  size={size}
                  color={color}
                  style={{position: 'absolute', right: 15}}
               />
            ),
         }}
      />

      <Drawer.Screen
         name="Accessories"
         initialParams={{params: 'Accessories'}}
         component={ShopScreen}
         options={{
            drawerLabel: 'აქსესუარები',
            drawerIcon: (focused, size, color) => (
               <Entypo
                  name="chevron-thin-right"
                  size={size}
                  color={color}
                  style={{position: 'absolute', right: 15}}
               />
            ),
         }}
      />


   </Drawer.Navigator>
);

export default LeftDrawer;
