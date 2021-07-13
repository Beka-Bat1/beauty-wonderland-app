import React from 'react';
import {
   TouchableOpacity,
   TouchableNativeFeedback,
   View,
   Text,
} from 'react-native';
import {
   createDrawerNavigator,
   DrawerContentScrollView,
   DrawerItemList,
   DrawerItem,
} from '@react-navigation/drawer';

import { Entypo } from '@expo/vector-icons';

import ShopScreen from '../screens/ShopScreen';
import Cart from '../screens/CartScreen';
import Orders from '../screens/OrdersScreen';

import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();
const LeftDrawer = () => {

   return (
      <Drawer.Navigator
         drawerStyle={{ paddingVertical: '15%' }}
         drawerContent={(props) => <CustomDrawerContent {...props} />}
         drawerContentOptions={{
            drawerIcon: (size, color, focused) => (
               <Entypo name="chevron-thin-right" size={size} color={color} />
            ),
         }}>
         <Drawer.Screen
            name="Home"
            component={ShopScreen}
            options={{
               title: 'მთავარი',
               drawerIcon: (focused, color, size) => (
                  <Entypo
                     name="chevron-thin-right"
                     size={size}
                     color={color}
                     style={{ position: 'absolute', right: 15 }}
                  />
               ),
            }}
         />

         <Drawer.Screen
            name="Brands"
            component={ShopScreen}
            initialParams={{ params: 'brands' }}
            options={{
               drawerLabel: 'ბრენდები',
               drawerIcon: (focused, size, color) => (
                  <Entypo
                     name="chevron-thin-right"
                     size={size}
                     color={color}
                     style={{ position: 'absolute', right: 15 }}
                  />
               ),
            }}
         />

         <Drawer.Screen
            name="Face"
            component={ShopScreen}
            initialParams={{ params: 'face' }}
            options={{
               drawerLabel: 'სახის მოვლის საშუალებები',
               drawerIcon: (focused, size, color) => (
                  <Entypo
                     name="chevron-thin-right"
                     size={size}
                     color={color}
                     style={{ position: 'absolute', right: 15 }}
                  />
               ),
            }}
         />

         <Drawer.Screen
            name="Cosmetics"
            initialParams={{ params: 'cosmetics' }}
            component={ShopScreen}
            options={{
               drawerLabel: 'კოსმეტიკა',

               drawerIcon: (focused, size, color) => (
                  <Entypo
                     name="chevron-thin-right"
                     size={size}
                     color={color}
                     style={{ position: 'absolute', right: 15 }}
                  />
               ),
            }}
         />

         <Drawer.Screen
            name="Body"
            initialParams={{ params: 'body' }}
            component={ShopScreen}
            options={{
               drawerLabel: 'ტანის მოვლის საშუალებები',
               drawerIcon: (focused, size, color) => (
                  <Entypo
                     name="chevron-thin-right"
                     size={size}
                     color={color}
                     style={{ position: 'absolute', right: 15 }}
                  />
               ),
            }}
         />

         <Drawer.Screen
            name="Hear"
            initialParams={{ params: 'hear' }}
            component={ShopScreen}
            options={{
               drawerLabel: 'თმის მოვლის საშუალებები',
               drawerIcon: (focused, size, color) => (
                  <Entypo
                     name="chevron-thin-right"
                     size={size}
                     color={color}
                     style={{ position: 'absolute', right: 15 }}
                  />
               ),
            }}
         />

         <Drawer.Screen
            name="Accessories"
            initialParams={{ params: 'accessories' }}
            component={ShopScreen}
            options={{
               drawerLabel: 'აქსესუარები',
               drawerIcon: (focused, size, color) => (
                  <Entypo
                     name="chevron-thin-right"
                     size={size}
                     color={color}
                     style={{ position: 'absolute', right: 15 }}
                  />
               ),
            }}
         />
      </Drawer.Navigator>
   );
};

export default LeftDrawer;
