import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ ...props }) => {
  const openMenu = () => props.onOpenMenu();
  const openCart = () => props.onOpenCart();

  return (
    <View style={styles.header}>
      {/* icon for the menu */}
      <TouchableOpacity onPress={props.onOpenMenu} style={styles.iconLeft}>
        <Ionicons name="md-menu" size={28} color="white" />
      </TouchableOpacity>
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>Shop</Text>
      </View>
      <TouchableOpacity onPress={openCart} style={styles.iconRight}>
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 0,
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-around",
    backgroundColor: "#000",
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
    color: "#fff",
  },
  iconLeft: {
    position: "absolute",
    left: 16,
    top: 15,
  },

  iconRight: {
    position: "absolute",
    right: 10,
    top: 15,
    color: "#fff",
  },
});

export default Header;
