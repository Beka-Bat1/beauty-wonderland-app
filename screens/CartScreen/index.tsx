import React, {useState, useEffect, useCallback} from 'react';
import {
   View,
   Text,
   FlatList,
   Button,
   StyleSheet,
   ActivityIndicator,
   Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import * as cartActions from '../../store/actions/cart';
import {clearCart, removeFromCart} from '../../store/actions/cart';
import {addOrder} from '../../store/actions/orders';
import PrimaryAppButton from '../../components/UI/buttons/PrimaryAppButton';
import getStyleObj from './styles';
import {RootState} from '../../store/store';

const CartScreen = (props) => {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false);
   const styles = getStyleObj({});
   const cartTotalAmount = useSelector(
      (state: RootState) => state.cart.totalAmount,
   );
   const items = useSelector((state: RootState) => state.cart.items);

   const cartItems = useSelector((state) => {
      const transformedCartItems = [];
      for (const key in items) {
         transformedCartItems.push({
            productId: key,
            productTitle: items[key].productTitle,
            productPrice: items[key].productPrice,
            quantity: items[key].quantity,
            sum: items[key].sum,
         });
      }
      return transformedCartItems.sort((a, b) =>
         a.productId > b.productId ? 1 : -1,
      );
   });

   const removeFromCartHandler = (productId) => {
      dispatch(removeFromCart(productId));
   };

   const sendOrderHandler = useCallback(async () => {
      if (cartTotalAmount <= 0) {
         Alert.alert('maybe shop some products before ordering ...');
         alert('maybe shop some products before  ordering...');
         console.warn('maybe shop some products before ordering ...');
         return;
      }
      setIsLoading(true);
      try {
         dispatch(addOrder(cartItems, cartTotalAmount));
         dispatch(clearCart());
      } catch (err) {
         console.log(err);
      }
      setIsLoading(false);
   }, []);

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

export default CartScreen;
