import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../../../constants/Colors";

const PrimaryAppButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children || props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryAppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: "solid",
    margin: 4
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
  },

});
