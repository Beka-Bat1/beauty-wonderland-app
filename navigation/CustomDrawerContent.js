import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
   DrawerContentScrollView,
   DrawerItemList,
   DrawerItem,
} from '@react-navigation/drawer';
import {Drawer, Text, TouchableRipple} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {FontAwesome} from '@expo/vector-icons';
import {DrawerActions} from '@react-navigation/native';

import * as authActions from '../store/actions/auth';
import Orders from '../screens/OrdersScreen';

const CustomDrawerContent = ({navigation, ...props}) => {
   const isAdmin = useSelector((state) => state.auth.isAdmin);

   const dispatch = useDispatch();

   // let touchable = Platform.OS === 'android' && Platform.version >= 21 ? <TouchableNativeFeedback /> : <TouchableOpacity />

   return (
      <DrawerContentScrollView {...props}>
         <View style={styles.drawerContent}>
            <DrawerItemList {...props} />
            <Drawer.Section />

            <Drawer.Section style={{marginLeft: 35}}>
               <TouchableRipple
                  onPress={() => {
                     navigation.push('OrdersScreen');
                  }}>
                  <View style={styles.preference}>
                     <Text>შენი შეკვეთები</Text>
                  </View>
               </TouchableRipple>

               {isAdmin && (
                  <TouchableRipple
                     onPress={() => navigation.push('EditProduct')}>
                     <View style={styles.preference}>
                        <Text>ადმინ პანელი</Text>
                     </View>
                  </TouchableRipple>
               )}
            </Drawer.Section>

            <DrawerItem
               label="Sign Out"
               onPress={() => {
                  dispatch(authActions.signOut());
                  // navigation.navigate('AuthNavigator');
               }}
               icon={({size, color}) => (
                  <FontAwesome name="sign-out" size={24} color="black" />
               )}
               {...props}
            />
         </View>
      </DrawerContentScrollView>
   );
};

export default CustomDrawerContent;

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
