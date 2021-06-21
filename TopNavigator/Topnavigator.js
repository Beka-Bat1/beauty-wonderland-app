import { Ionicons } from "@expo-vector/icons";

import React from "react";
import { Button, SafeAreaView } from "react-native";

export default ({ navigation }) => {
  return (
    <SafeAreaView>
      <Button title="Toggle Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button
        title="To Actions"
        onPress={() => {
          navigation.navigate("Tabs", {
            screen: "Actions",
            params: { userId: 123 },
          });
        }}
      />
    </SafeAreaView>
  );
};
