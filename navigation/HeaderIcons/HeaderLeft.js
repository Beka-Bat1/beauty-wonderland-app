import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HeaderLeft = ({ ...props }) => {
  const openMenu = () => props.onOpenMenu();

  return (
    <TouchableOpacity onPress={openMenu} style={styles.iconLeft}>
      <Ionicons name="md-menu" size={28} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconLeft: {
    position: "absolute",
    left: 16,
    top: 15,
  },
});

export default HeaderLeft;
