import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import CartItem from "./CartItem";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";
import SecondaryAppButton from '../UI/buttons/SecondaryAppButton';

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>

        {props.userId && <Text style={styles.totalAmount}>User ID: {props.userId}</Text> }

      </View>
      <SecondaryAppButton
        title={showDetails ? "HideDetails" : "Show Details"}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />

      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map(cartItem => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});
