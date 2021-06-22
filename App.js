import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Flatlist, Alert } from "react-native";
// import { registerRootComponent } from "expo";
import store from "./store/store";
import { Provider } from "react-redux";

import ShopScreen from "./screens/ShopScreen";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import RootStack from './config/RootStack';

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "poppins": "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => Alert.alert(err)}
      />
    );
  }


  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
}

// registerRootComponent(App);
