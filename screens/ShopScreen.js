import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Alert
} from "react-native";

import ProductItem from "../components/shop/ProductItem";
import PrimaryAppButton from "../components/UI/buttons/PrimaryAppButton";
import SecondaryAppButton from "../components/UI/buttons/SecondaryAppButton";
import { addToCart } from "../store/actions/cart";

import NavigatorButton from "../settings";


const ShopScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (item) => {
    navigation.push("ProductDetailScreen", { item: item, title: item.title });
  };

  const addToCartHandler = (item) => {
    showAlert(`${item.title} has been added to your cart `)
    dispatch(addToCart(item));
  };

  const showAlert = (text) => Alert.alert( "Success", text, null, {cancelable: true});
  
  return (
    <SafeAreaView>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              selectItemHandler(itemData.item.id);
            }}
          >
            <PrimaryAppButton
              title={"View Details"}
              onPress={() => {
                selectItemHandler(itemData.item.id);
              }}
            />

            <SecondaryAppButton
              title={"Add to Cart"}
              onPress={() => {
                addToCartHandler(itemData.item);
              }}
            />
          </ProductItem>
        )}
      />
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "open-sans",
  },
});
