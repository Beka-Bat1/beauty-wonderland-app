import React from 'react';
import {StyleSheet, Text, View, ScrollView, Image, Alert} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as Colors from '../../constants/Colors';
import {addToCart} from '../../store/actions/cart';
import PrimaryAppButton from '../../components/UI/buttons/PrimaryAppButton';
import getStyleObj from './styles';

import {RootState} from '../../store/store';

const ProductDetailScreen = (props) => {
   const productId = props.route.params.productId;
   const styles = getStyleObj({});
   const selectedProduct = useSelector((state: RootState) => {
      return state?.products.availableProducts.find(
         (prod) => prod.id === productId,
      );
   });
   const dispatch = useDispatch();

   const showAlert = (text) =>
      Alert.alert('Success', text, null, {cancelable: true});

   const selectItemHandler = (selectedProduct) => {
      showAlert(`${selectedProduct.title} has been added to your cart `);
      dispatch(addToCart(selectedProduct));
   };

   return (
      <ScrollView>
         <Image
            style={styles.image}
            source={{
               uri:
                  selectedProduct?.imageUrl ||
                  'https://dummyimage.com/640x360/fff/aaa',
            }}
         />
         <View style={styles.actions}>
            <PrimaryAppButton
               title={'Add to Cart'}
               onPress={() => {
                  selectItemHandler(selectedProduct);
               }}
            />
         </View>
         <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
         <Text style={styles.description}>{selectedProduct.description}</Text>
      </ScrollView>
   );
};

export default ProductDetailScreen;
