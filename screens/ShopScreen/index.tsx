import React, {useState, useCallback} from 'react';
import {
   useFocusEffect,
   useNavigation,
   useRoute,
} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Text, View, FlatList, Alert, ActivityIndicator} from 'react-native';

import ProductItem from '../../components/shop/ProductItem';
import PrimaryAppButton from '../../components/UI/buttons/PrimaryAppButton';
import SecondaryAppButton from '../../components/UI/buttons/SecondaryAppButton';
import {addToCart} from '../../store/actions/cart';
import {fetchProducts} from '../../store/actions/products';
import getStyleObj from './styles';
import {RootState} from '../../store/store';

//// todo search and sort
import {LinearGradient} from 'expo-linear-gradient';
import Shimmer from '../../components/UI/Shimmer';
import ProductItemShimmer from '../../components/shimmer/productItemShimmer';

const ShopScreen = () => {
   const [isRefreshing, setIsRefreshing] = useState(false);
   const [error, setError] = useState('');
   const [filteredProducts, setFilteredProducts] = useState([]);
   const styles = getStyleObj({});
   const {navigate} = useNavigation();
   const dispatch = useDispatch();
   const params: Object = useRoute().params;

   let availableProducts = useSelector(
      (state: RootState) => state.products.availableProducts,
   );
   let dataToRender = params?.filterName ? filteredProducts : availableProducts;

   useFocusEffect(
      useCallback(() => {
         //  scrreen focused
         setTimeout(() => {
            loadProducts();
         }, 5000);
      }, [params?.filterName]),
   );

   const filterProductHandler = () => {
      setIsRefreshing(true);
      let tmp = availableProducts.filter((product) => {
         return product.tag == params.filterName?.params;
      });
      setFilteredProducts(tmp);
   };

   const loadProducts = useCallback(async () => {
      setError(null);
      setIsRefreshing(true);
      try {
         await dispatch(fetchProducts());
      } catch (err) {
         console.warn('error comes from here', err);
         setError(err.message);
      }
      if (params?.filterName) {
         filterProductHandler();
      }
      setIsRefreshing(false);
   }, [dispatch, setIsRefreshing, setError]);

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
         <View style={styles.container}>
            <Text>An error occurred!</Text>
            <PrimaryAppButton title="Try again" onPress={loadProducts} />
         </View>
      );
   }

   if (isRefreshing) {
      return (
         <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ProductItemShimmer />
         </View>
      );
   }

   if (!isRefreshing && !dataToRender) {
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
         data={dataToRender}
         keyExtractor={(item) => item.id}
         renderItem={(itemData) => {
            return (
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
                        selectItemHandler(
                           itemData.item.id,
                           itemData.item.title,
                        );
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
            );
         }}
      />
   );
};

export default ShopScreen;
