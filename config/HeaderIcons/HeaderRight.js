import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HeaderRight = ({ ...props }) => {
  const openCart = () => props.onOpenCart();

  return (
    <TouchableOpacity onPress={openCart} style={styles.iconRight}>
      <Ionicons
        name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
        size={28}
        color="black"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconRight: {
    position: "absolute",
    right: 16,
    top: 15,
    color: "#fff",
  },
});

export default HeaderRight;
