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
const ShopStackNavigation = () => (
  <TopNavigator.Navigator>

    <TopNavigator.Screen
      name="ShopScreen"
      component={ShopScreen}
      headerMode="screen"
      options={({ navigation, route }) => ({
        headerLeft: (props) => (
          <HeaderLeft {...props} onOpenMenu={() => navigation.toggleDrawer()} />
        ),
        headerRight: (props) => (
          <HeaderRight
            {...props}
            onOpenCart={() => navigation.navigate("CartScreen")}
          />
        ),
        headerTitle: "Shopy Shop",
        headerTitleStyle: { alignSelf: "center" }
     
      })}
    />

    <TopNavigator.Screen
      name="ProductDetailScreen"
      component={ProductDetailScreen}
        options={({ navigation, route }) => ({

        headerRight: (props) => (
          <HeaderRight
            {...props}
            onOpenCart={() => navigation.navigate("CartScreen")}
          />
        ),
        headerTitle: "Shopy Shop",
        headerTitleStyle: { alignSelf: "center" },
      })}
    />

    <TopNavigator.Screen
      name="CartScreen"
      component={CartScreen}
      options={{
        headerTitle: "Cart",
      headerTitleStyle: { alignSelf: 'center'}
      }}
    />
  </TopNavigator.Navigator>
);

export default ShopStackNavigation;

