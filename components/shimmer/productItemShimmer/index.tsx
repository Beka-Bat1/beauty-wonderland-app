import React from 'react';
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   TouchableNativeFeedback,
   Platform,
   Image,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Card from '../../UI/Card';
import Shimmer from '../../UI/Shimmer';

const ProductItemShimmer = (props) => {
   /* TouchableOpacity works well on IOS and andriod <= 21 only */
   let TouchableCmp: any =
      Platform.OS === 'android' && Platform.Version >= 21
         ? TouchableNativeFeedback
         : TouchableOpacity;

   return (
      <Card style={styles.product}>
         <Shimmer height={300} width={20} />
         <View style={styles.touchable}>
            <Shimmer height={14} width="100%" />
            <TouchableWithoutFeedback>
               <View>
                  <View style={styles.imageContainer}>
                     <Shimmer width="100%" height="60%" />
                     <Shimmer width="100%" height="100%" />
                  </View>
                  <View style={styles.details}>
                     <Shimmer width="100%" height="17%" />
                     <Text style={styles.title}>
                        {' '}
                        <Shimmer width="100%" height="17%" />
                     </Text>
                     <Text style={styles.price}>
                        {' '}
                        <Shimmer width="100%" height="17%" />
                     </Text>
                  </View>
                  <View style={styles.actions}></View>
               </View>
            </TouchableWithoutFeedback>
         </View>
      </Card>
   );
};

export default ProductItemShimmer;

const styles = StyleSheet.create({
   product: {
      height: 300,
      margin: 20,
   },
   touchable: {
      borderRadius: 10,
      overflow: 'hidden',
   },
   imageContainer: {
      width: '100%',
      height: '60%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden',
   },
   image: {
      width: '100%',
      height: '100%',
   },
   details: {
      alignItems: 'center',
      height: '17%',
      padding: 10,
   },
   title: {
      fontSize: 18,
      marginVertical: 2,
   },
   price: {
      fontSize: 14,
      color: '#888',
   },
   actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '23%',
      paddingHorizontal: 20,
   },
});
