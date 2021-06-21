import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../../../constants/Colors";

const SecondaryAppButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children || props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SecondaryAppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.black,
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderColor: Colors.black,
    borderWidth: 2,
    borderStyle: "solid",
    margin: 4
  },
  buttonText: {
    color: Colors.white,
    fontSize: 15,
  },

});
