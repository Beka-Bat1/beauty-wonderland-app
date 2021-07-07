import React, {useState, useEffect, useCallback} from 'react';
import {
   useFocusEffect,
   useNavigation,
   useRoute,
} from '@react-navigation/native';

import {useSelector, useDispatch} from 'react-redux';
import {
   StyleSheet,
   Text,
   View,
   FlatList,
   SafeAreaView,
   Alert,
   ActivityIndicator,
   Button,
} from 'react-native';

import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import ProductItem from '../components/shop/ProductItem';
import PrimaryAppButton from '../components/UI/buttons/PrimaryAppButton';
import SecondaryAppButton from '../components/UI/buttons/SecondaryAppButton';
import {addToCart} from '../store/actions/cart';
import {fetchProducts} from '../store/actions/products';

const ShopScreen = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [isRefreshing, setIsRefreshing] = useState(false);
   const [error, setError] = useState('');
   const {navigate} = useNavigation();
   const dispatch = useDispatch();
   const route = useRoute();

   let products = useSelector((state) => state.products.availableProducts);
   let userId = useSelector((state) => state.auth);
   const filterName = route?.params;

   useFocusEffect(
      useCallback(() => {
         //  scrreen focused
         loadProducts();
      }, []),
   );

   useEffect(() => {
      products = products.filter((product) => product.tag === filterName);
      console.log(products, 'refresh' )
   }, [filterName]);

   const loadProducts = useCallback(async () => {
      setError(null);
      setIsRefreshing(true);
      try {
         await dispatch(fetchProducts());
      } catch (err) {
         setError(err.message);
      }
      setIsRefreshing(false);
   }, [dispatch, setIsLoading, setError]);

   const selectItemHandler = (id, title) => {
      navigate('ProductDetailScreen', {
         productId: id,
         productTitle: title,
      });
   };

   const addToCartHandler = (item) => {
      showAlert(`${item.title} has been added to your cart `);
      dispatch(addToCart(item));
   };

   const showAlert = (text) =>
      Alert.alert('Success', text, null, {cancelable: true});

   if (error) {
      console.log(error);
      Alert.alert(error);
      return (
         <View style={styles.centered}>
            <Text>An error occurred!</Text>
            <PrimaryAppButton title="Try again" onPress={loadProducts} />
         </View>
      );
   }

   if (isLoading) {
      return (
         <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" colors="black" />
         </View>
      );
   }

   if (!isLoading && !products) {
      return (
         <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text> No Products ... </Text>
         </View>
      );
   }

   return (
      <FlatList
         onRefresh={loadProducts}
         refreshing={isRefreshing}
         data={products}
         keyExtractor={(item) => item.id}
         renderItem={(itemData) => (
            <ProductItem
               image={itemData.item.imageUrl}
               title={itemData.item.title}
               price={itemData.item.price}
               onSelect={() => {
                  selectItemHandler(itemData.item.id, itemData.item.title);
               }}>
               <SecondaryAppButton
                  title="View Details"
                  onPress={() => {
                     selectItemHandler(itemData.item.id, itemData.item.title);
                  }}
               />
               <PrimaryAppButton
                  title="To Cart"
                  onPress={() => {
                     showAlert(
                        `${itemData.item.title} has been added to your cart `,
                     );
                     dispatch(addToCart(itemData.item));
                  }}
               />
            </ProductItem>
         )}
      />
   );
};

export default ShopScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
