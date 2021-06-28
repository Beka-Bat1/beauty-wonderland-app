import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { Platform } from "react-native";

import AuthNavigator from "./AuthNavigator";
import LeftDrawer from "./LeftDrawer";
import Modal from "../screens/Modal";
import Loading from "../screens/Loading";

import ShopScreen from "../screens/ShopScreen";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

const RootStack = createStackNavigator();
export default () => {
  const isAuth = useSelector((rootReducer) => rootReducer.auth.isAuth);
  const isLoading = false;
  console.log(isAuth, "isAuth");

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? "black" : "",
          },
          headerTintColor: Platform.OS === "android" ? "white" : "black",
          title: "",
        }}
        mode="modal"
        initialRouteName="LoadingScreen"
      >
        {isLoading && (
          <RootStack.Screen name="LoadingScreen" component={Loading} />
        )}
        {!isAuth && (
          <RootStack.Screen name="AuthNavigator" component={AuthNavigator} />
        )}
        {isAuth && (
          <RootStack.Screen name="LeftDrawer" component={LeftDrawer} />
        )}

        <RootStack.Screen
          name="Modal"
          component={Modal}
          options={{ animationEnabled: true }}
        />

        <RootStack.Screen
          name="ShopScreen"
          component={ShopScreen}
          headerMode="screen"
          options={({ navigation, route }) => ({
            headerLeft: (props) => (
              <HeaderLeft
                {...props}
                onOpenMenu={() => navigation.toggleDrawer()}
              />
            ),
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

        <RootStack.Screen
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

        <RootStack.Screen
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

        <RootStack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            headerTitle: "Cart",
            headerTitleStyle: { alignSelf: "center" },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
