import React from 'react';
import {creaShopScreenackNavigator} from '@react-navigation/stack';

import {
   createDrawerNavigator,
   DrawerContentScrollView,
   DrawerItemList,
   DrawerItem,
} from '@react-navigation/drawer';

import {AntDesign} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';

import ShopScreen from '../screens/ShopScreen';
import Cart from '../screens/CartScreen';
import Orders from '../screens/OrdersScreen';

const CustomDrawerContent = ({navigation, ...props}) => {
   return (
      <DrawerContentScrollView {...props}>
         <DrawerItem
            label=""
            style={{position: 'absolute', right: '-20%', top: '-15%'}}
            onPress={() => navigation.closeDrawer()}
            icon={({size, color}) => (
               <AntDesign name="close" size={size} color={color} />
            )}
            {...props}
         />

         <DrawerItemList {...props} />
      </DrawerContentScrollView>
   );
};

const Drawer = createDrawerNavigator();
const LeftDrawer = () => (
   <Drawer.Navigator
      mode="modal"
      options={{headerShown: false}}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{paddingVertical: '15%'}}
      drawerContentOptions={{
         drawerIcon: (size, color, focused) => (
            <Entypo name="chevron-thin-right" size={size} color={color} />
         ),
      }}>
      <Drawer.Screen
         name="Home"
         component={ShopScreen}
         initialParams={{params: 'Home'}}
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
         component={ShopScreen}
         initialParams={{params: 'Cosmetics'}}
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
         component={ShopScreen}
         initialParams={{params: 'Body'}}
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
         component={ShopScreen}
         initialParams={{params: 'Hear'}}
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
         component={ShopScreen}
         initialParams={{params: 'Accessories'}}
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
