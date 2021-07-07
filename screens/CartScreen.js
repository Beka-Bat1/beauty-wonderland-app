import React, {useState, useEffect, useCallback} from 'react';
import {
   View,
   Text,
   FlatList,
   Button,
   StyleSheet,
   ActivityIndicator,
   Alert
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Colors from '../constants/Colors';
import CartItem from '../components/shop/CartItem';
import Card from '../components/UI/Card';
import * as cartActions from '../store/actions/cart';
import {addOrder} from '../store/actions/orders';
import { clearCart } from '../store/actions/cart'
import PrimaryAppButton from '../components/UI/buttons/PrimaryAppButton';

const CartScreen = (props) => {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false);

   const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

   const cartItems = useSelector((state) => {
      const transformedCartItems = [];
      for (const key in state.cart.items) {
         transformedCartItems.push({
            productId: key,
            productTitle: state.cart.items[key].productTitle,
            productPrice: state.cart.items[key].productPrice,
            quantity: state.cart.items[key].quantity,
            sum: state.cart.items[key].sum,
         });
      }
      return transformedCartItems.sort((a, b) =>
         a.productId > b.productId ? 1 : -1,
      );
   });

   const removeFromCartHandler = (productId) => {
      dispatch(cartActions.removeFromCart(productId));
   };

   const sendOrderHandler = useCallback(async () => {
      if(cartTotalAmount <= 0){
         Alert.alert('maybe shop some products before ...')
         return
      }
      setIsLoading(true);
      try {
         await dispatch(addOrder(cartItems, cartTotalAmount));
         await dispatch(clearCart());
      } catch (err) {
         console.log(err);
      }
      setIsLoading(false);
   });

   return (
      <View style={styles.screen}>
         {isLoading ? (
            <ActivityIndicator size={80} color={Colors.girlish} />
         ) : (
            <>
               <Card style={styles.summary}>
                  <Text style={styles.summaryText}>
                     Total:{' '}
                     <Text style={styles.amount}>
                        ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
                     </Text>
                  </Text>
                  {isLoading ? (
                     <ActivityIndicator size="small" color="black" />
                  ) : (
                     <PrimaryAppButton
                        title={'Order Now'}
                        disabled={cartItems.length === 0}
                        onPress={sendOrderHandler}
                     />
                  )}
               </Card>

               <FlatList
                  data={cartItems}
                  keyExtractor={(item) => item.productId}
                  renderItem={(itemData) => (
                     <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                           removeFromCartHandler(itemData.item.productId);
                        }}
                     />
                  )}
               />
            </>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   screen: {
      margin: 20,
   },
   summary: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
      padding: 10,
   },
   summaryText: {
      fontSize: 18,
   },
   amount: {
      color: 'white',
   },
});

export default CartScreen;
