import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Alert,
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
    Alert.alert(`you've selected item: ${item}`);
    navigation.push("ProductDetailScreen", { item: item });
  };

  const addToCartHandler = (item) => {
    dispatch(cartActions.addToCart(item));
  };

  console.log(navigation);

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
              selectItemHandler(itemData.item);
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
