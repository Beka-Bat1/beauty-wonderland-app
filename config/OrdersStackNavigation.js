import React, { useState } from "react";
import { Platform, Button, View, Text, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import ShopScreen from "../screens/ShopScreen";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

import HeaderLeft from "./HeaderIcons/HeaderLeft";
import HeaderRight from "./HeaderIcons/HeaderRight";

const TopNavigator = createStackNavigator();
const OrdersStackNavigation = () => (
  <TopNavigator.Navigator>
    <TopNavigator.Screen
      name="OrdersScreen"
      component={OrdersScreen}
      options={({ navigation, route }) => ({
        headerLeft: (props) => (
          <HeaderLeft
            {...props}
            onOpenMenu={() => navigation.toggleDrawer()}
          />
        ),
        headerTitle: "Orders",
        headerTitleStyle: { alignSelf: "center" },
    })}
    />
  </TopNavigator.Navigator>
);

export default OrdersStackNavigation;


   /* Custom Header  */
      // options={({ navigation, route }) => {
      //   return {
      //     headerTitle: (props) => (
      //       <Header
      //         title="shop"
      //         onOpenMenu={() => navigation.toggleDrawer()}
      //         onOpenCart={() => navigation.navigate("CartScreen")}
      //         {...props}
      //       />
      //     ),
      //   };
      // }}