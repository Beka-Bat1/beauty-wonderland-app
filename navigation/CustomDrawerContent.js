import React from 'react';
import {creaShopScreenackNavigator} from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native'
import {
   createDrawerNavigator,
   DrawerContentScrollView,
   DrawerItemList,
   DrawerItem,
} from '@react-navigation/drawer';
import {
  Drawer,
  Text,
  TouchableRipple,
} from 'react-native-paper';


import { useSelector } from 'react-redux'

import {AntDesign} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';

import ShopScreen from '../screens/ShopScreen';
import Cart from '../screens/CartScreen';
import Orders from '../screens/OrdersScreen';



const CustomDrawerContent = ({navigation, ...props}) => {
   const isAdmin = useSelector(state => state.auth.isAdmin);

   // let touchable = Platform.OS === 'android' && Platform.version >= 21 ? <TouchableNativeFeedback /> : <TouchableOpacity />

   return (
      <DrawerContentScrollView {...props}>
       <View
        style={ styles.drawerContent}>
         <DrawerItemList {...props} />

         <Drawer.Section title="User">
          <TouchableRipple onPress={() => {navigation.push("OrdersScreen")}} >
            <View style={styles.preference}>
              <Text>Orders</Text>
            </View>
          </TouchableRipple>

          { isAdmin && <TouchableRipple onPress={() => navigation.navigate("UserProducts")}>
            <View style={styles.preference}>
              <Text>Admin Panel</Text>
            </View>
          </TouchableRipple>
          
          }


         
        </Drawer.Section>

        <DrawerItem
          label="Sign Out"
            
            onPress={() => navigation.closeDrawer()}
            icon={({size, color}) => (
               <AntDesign name="close" size={size} color={color} />
            )}
            {...props}
         />

        </View>
      </DrawerContentScrollView>
   );
};

export default CustomDrawerContent

            
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
