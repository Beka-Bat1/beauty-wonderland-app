import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import CartItem from "../components/shop/CartItem";
import Card from "../components/UI/Card";
import * as cartActions from "../store/actions/cart";
import * as ordersActions from "../store/actions/orders";
import PrimaryAppButton from "../components/UI/buttons/PrimaryAppButton";

const CartScreen = (props) => {
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
      a.productId > b.productId ? 1 : -1
    );
  });
  const dispatch = useDispatch();

  const orderButtonhandler = (cartItems, cartTotalAmount) => {
    setIsLoading(true);
    dispatch(
      ordersActions.addOrder(cartItems, cartTotalAmount, () =>
        setIsLoading(false)
      )
    );
  };

  const removeFromCartHandler = (productId) => {
    dispatch(cartActions.removeFromCart(productId));
  };

  const sendOrderhandler = async () => {
    setIsLoading(true);
    await dispatch(orderButtonhandler(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <>
          <Card style={styles.summary}>
            <Text style={styles.summaryText}>
              Total:{" "}
              <Text style={styles.amount}>
                ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
              </Text>
            </Text>
            {isLoading ? (
              <ActivityIndicator size="small" color="black" />
            ) : (
              <PrimaryAppButton
                title={"Order Now"}
                disabled={cartItems.length === 0}
                onPress={sendOrderhandler}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "poppins",
    fontSize: 18,
  },
  amount: {
    color: 'white',
  },
});

export default CartScreen;
