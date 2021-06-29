import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import { useSelector } from 'react-redux'

import Colors from '../../constants/Colors'

const HeaderRight = ({...props}) => {
   const openCart = () => props.onOpenCart();
   const totalAmount = useSelector(state => state.cart.totalAmount)
   console.log(props, totalAmount, "totalAmount")



   return (
   <TouchableOpacity onPress={openCart} style={styles.iconRight}>
      <View style={styles.wrapper} >
      <Text style={styles.text}>{totalAmount}</Text>
      </View>
         <Ionicons
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={28}
            color="black"
         />
      </TouchableOpacity>

   
   );
};

const styles = StyleSheet.create({
   iconRight: {
      position: 'absolute',
      right: 16,
      top: 15,
      color: '#fff',
   },
   wrapper: {
      position: 'absolute',
      height: 30, 
      width: 30,
      borderRadius: 15,
      backgroundColor: Colors.gray,
      right: 15,
      bottom: 15,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200
   },
   text: {
      color: '#fff',
      fontWeight: 'bold'
   }
});

export default HeaderRight;
