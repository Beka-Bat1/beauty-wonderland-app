import React, {useEffect, useState, useCallback} from 'react';
import {
   StyleSheet,
   Text,
   View,
   ScrollView,
   ActivityIndicator,
   FlatList,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import * as orderActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';
import OrderItem from '../../components/shop/OrderItem';

const TotalOrdersScreen = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');
   const totalOrders = useSelector((state) => state?.orders.totalOrders);
   const dispatch = useDispatch();

   useFocusEffect(
      useCallback(() => {
         setIsLoading(true);
         dispatch(orderActions.fetchTotalOrders());
         setIsLoading(false);
      }, [totalOrders, dispatch]),
   );

   /// TODO filter, search, order by

   if (isLoading) {
      return <ActivityIndicator size="large" color={Colors.girlish} />;
   }

   if (error) {
      return <Text>error</Text>;
   }

   if (totalOrders.length === 0) {
      return (
         <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No orders found.</Text>
         </View>
      );
   }

   return (
      <FlatList
         refreshing={isLoading}
         data={totalOrders}
         keyExtractor={(item) => item.id}
         renderItem={(itemData) => (
            <OrderItem
               amount={itemData.item.totalAmount}
               date={itemData.item.readableDate}
               items={itemData.item.items}
               userId={itemData.item.purchasedBy}
            />
         )}
      />
   );
};

export default TotalOrdersScreen;

