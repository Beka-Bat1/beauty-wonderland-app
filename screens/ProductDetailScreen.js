import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, Alert } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import * as Colors from "../constants/Colors";
import { addToCart } from "../store/actions/cart";
import PrimaryAppButton from "../components/UI/buttons/PrimaryAppButton";

const ProductDetailScreen = (props) => {
  const productId =
    props.route.params.item; /* get product id from navigation params*/

  const selectedProduct = useSelector((state) => {
    return state.products.availableProducts.find(
      (prod) => prod.id === productId
    );
  });
  const dispatch = useDispatch();

    const showAlert = (text) => Alert.alert( "Success", text, null, {cancelable: true});

  const selectItemHandler = (selectedProduct) => {
    showAlert(`${selectedProduct.title} has been added to your cart `)
    dispatch(addToCart(selectedProduct));
  };

  

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <PrimaryAppButton
          title={"Add to Cart"}
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

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans",
  },
  description: {
    fontFamily: "poppins",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});
